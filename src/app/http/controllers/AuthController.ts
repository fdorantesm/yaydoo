import { Request, Response } from 'express'
import Auth from '../../libraries/auth'
import * as request from 'request-promise'
import User from '../../db/models/User'
import UserData from '../../db/models/UserData'
import UserService from '../../services/UserService'
import FullUser from '../../interfaces/FullUser'
import { humanToYYMMDD } from '../../helpers/date'
import { makeUserSlug } from '../../helpers/user'

export default class AuthController {
  static async login(req: Request, res: Response): Promise<void> {
    res.send('/login')
  }
  static async me(req: Request, res: Response): Promise<void> {
    const { sub: userId } = await Auth.verify(req['token'])
    const user = await User.findById(userId).populate(['userData'])
    res.send({ data: user })
  }
  static async facebook(req: Request, res: Response): Promise<void> {
    console.log(req.body.authResponse.accessToken)
    let result = null
    let user = null
    let profile = null
    try {
      // eslint-disable-next-line prettier/prettier
      const body = await request(`https://graph.facebook.com/${req.body.authResponse.userID}?access_token=${req.body.authResponse.accessToken}&fields=email,gender,birthday,first_name,last_name,posts,likes`)
      const data = JSON.parse(body)
      console.log(data)
      const fullname = `${data.first_name} ${data.last_name}`
      const facebookId = data.id
      if (data.id === req.body.authResponse.userID) {
        profile = await UserData.findOne({ facebookId }).select(['facebookId', 'userId'])
        if (!profile) {
          const userFields: FullUser = {
            username: await makeUserSlug(fullname),
            email: data.email,
            userData: {
              fullname,
              dob: data.birthday ? new Date(humanToYYMMDD(data.birthday)) : null,
              gender: data.gender,
              facebookId: facebookId,
            },
          }
          user = await UserService.create(userFields)
        } else {
          user = await User.findById(profile.userId).select(['id'])
        }
        const token = await Auth.sign(user.id)
        result = { token }
        res.send(result)
      } else {
        throw Error('InvalidFacebookToken')
      }
    } catch (err) {
      res.send(err)
    }
  }
}
