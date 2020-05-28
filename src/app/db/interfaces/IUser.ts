import { Document } from 'mongoose'
import { ObjectId } from 'mongodb'

export default interface IUser extends Document {
  id?: ObjectId
  username: string
  email: string
  userData: ObjectId
  lastConnection: Date
}
