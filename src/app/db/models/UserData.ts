import mongoose from '../../libraries/mongoose'
import IUserData from '../interfaces/IUserData'

const UserDataSchema = new mongoose.Schema(
  {
    fullname: String,
    email: String,
    gender: String,
    facebookId: String,
    dob: Date,
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  },
)

const UserData = mongoose.default.model<IUserData>('UserData', UserDataSchema)

export default UserData
