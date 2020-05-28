import MongoConnection from '../interfaces/MongoConnection'

export function uriString(config: MongoConnection): string {
  return `mongodb://${config.auth}${config.host}${config.port}/${config.base}${
    config.repl ? `?replicaSet=${config.repl}` : ''
  }`
}
