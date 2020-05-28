import mongoose from '../../libraries/mongoose'
import IUser from '../interfaces/IUser'

const UserSchema = new mongoose.Schema(
  {
    username: String,
    email: String,
    userData: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'UserData',
    },
    lastConnection: Date,
  },
  {
    timestamps: true,
  },
)

const User = mongoose.default.model<IUser>('User', UserSchema)

export default User
