import { Document } from 'mongoose'
import { ObjectId } from 'mongodb'

export default interface IUserData extends Document {
  id?: ObjectId
  fullname: string
  gender: string
  facebookId: string
  dob: Date
  userId: ObjectId
}
