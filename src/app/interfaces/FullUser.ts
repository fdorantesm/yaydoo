import { ObjectId } from 'mongodb'

export default interface FullUser {
  id?: ObjectId
  username: string
  email: string
  userData: {
    fullname: string
    gender?: string
    facebookId: string
    dob?: Date
  }
  lastConnection?: Date
}
