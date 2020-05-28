import * as mongoose from 'mongoose'
import getConfig, { settings } from '../config/mongoose'
import { uriString } from '../helpers/mongodb'
import db from '../config/database'
import MongooseConnection from '../core/interfaces/MongooseConnection'

const config = getConfig()
const connection: MongooseConnection = {
  default: mongoose.createConnection(uriString(db.default), config),
}
Object.keys(settings).map((key) => {
  mongoose.set(key, settings[key])
})

export default {
  ...connection,
  ...mongoose,
}
