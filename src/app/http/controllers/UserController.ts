import { Request, Response } from 'express'
// import User from '../../db/models/User'
import { getPosts } from '../../helpers/facebook'
import IFacebookPost from '../../interfaces/iFacebookPost'
import IFacebookRequestParams from '../../interfaces/IFacebookRequestParams'

export default class UserController {
  static async getPosts(req: Request, res: Response): Promise<void> {
    try {
      const payload: IFacebookRequestParams = {
        userID: req.query.userID.toString(),
        accessToken: req.query.accessToken.toString(),
      }
      const posts: IFacebookPost[] = await getPosts(payload)
      res.send(posts)
    } catch (err) {
      res.status(400).send({
        message: 'Invalid Facebook token',
      })
    }
  }
}
