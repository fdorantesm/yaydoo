export default interface MongoConnection {
  auth: string
  host: string
  port: string
  base: string
  repl: string | boolean
}
