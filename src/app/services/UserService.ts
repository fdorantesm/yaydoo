import User from '../db/models/User'
import UserData from '../db/models/UserData'
import FullUser from '../interfaces/FullUser'
import IUser from '../db/interfaces/IUser'
import IUserData from '../db/interfaces/IUserData'

export default class UserService {
  static async create(data: FullUser): Promise<{ user: IUser; userData: IUserData }> {
    const user = new User({
      email: data.email,
      username: data.username,
    })
    const userData = new UserData({
      fullname: data.userData.fullname,
      gender: data.userData.gender,
      facebookId: data.userData.facebookId,
    })
    user.userData = userData.id
    userData.userId = user.id
    const [userResult, userDataResult] = await Promise.all([user.save(), userData.save()])
    return {
      user: userResult,
      userData: userDataResult,
    }
  }
}
