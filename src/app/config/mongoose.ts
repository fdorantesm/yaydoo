import { MongooseConfig, MongooseSettings } from '../../app/interfaces/MongooseConfig'

export default function getConfig(): MongooseConfig {
  return {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
}

export const settings: MongooseSettings = {
  debug: true,
  useCreateIndex: true,
}
