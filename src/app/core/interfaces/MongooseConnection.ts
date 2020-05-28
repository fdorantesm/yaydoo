import { Connection } from 'mongoose'

export default interface MongooseConnections {
  default: Connection
}
