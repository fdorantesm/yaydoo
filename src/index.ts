import './env'
import * as http from 'http'
import * as https from 'https'
import * as path from 'path'
import * as fs from 'fs'
import app from './app'

const APP_SSL_KEY = process.env.APP_SSL_KEY
const APP_SSL_CERT = process.env.APP_SSL_CERT
const APP_SSL_PASSPHRASE = process.env.APP_SSL_PASSPHRASE
const APP_PORT = process.env.APP_PORT
const APP_SSL_PORT = process.env.APP_SSL_PORT
const SRC_PATH = process.env.SRC_PATH

const isAppSSL = APP_SSL_KEY && APP_SSL_CERT && APP_SSL_PORT

const server = {
  http: http.createServer(app),
  https: null,
}

server.http.listen(APP_PORT)
server.http.on('error', onError)
server.http.on('listening', onListening)

if (isAppSSL) {
  const key = fs.readFileSync(path.join(SRC_PATH, APP_SSL_KEY))
  const cert = fs.readFileSync(path.join(SRC_PATH, APP_SSL_CERT))
  const secure = {
    key: key,
    cert: cert,
    passphrase: APP_SSL_PASSPHRASE,
  }
  server.https = https.createServer(secure, app)
  server.https.listen(APP_SSL_PORT)
  server.https.on('error', onError)
  server.https.on('listening', onListening)
}
/**
 * HTTP Error Callback
 * @param {Error} error
 */
function onError(error) {
  if (error.syscall !== 'listen') {
    throw error
  }
  const bind = typeof error.port === 'string' ? 'Pipe ' + error.port : 'Port ' + error.port
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges')
      process.exit(1)
      break
    case 'EADDRINUSE':
      console.error(bind + ' is already in use')
      process.exit(1)
      break
    default:
      throw error
  }
}

/**
 * Listen handle callback
 */
function onListening() {
  const protocol = this.cert ? 'https' : 'http'
  const addr = (this.cert ? server.https : server.http).address()
  const bind = typeof addr === 'string' ? 'pipe ' + addr : ':' + addr.port
  console.log('\uD83D\uDE80 Server ready on ' + protocol + '://localhost' + bind)
}
