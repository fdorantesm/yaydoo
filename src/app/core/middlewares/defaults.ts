import { Application } from 'express'
import * as bodyParser from 'body-parser'
import * as compression from 'compression'
import * as cors from 'cors'
import * as fs from 'fs'
import * as morgan from 'morgan'
import * as boom from 'express-boom'
import * as path from 'path'
import * as rfs from 'rotating-file-stream'

const SRC_PATH = process.env.SRC_PATH
const APP_LOGS = process.env.APP_LOGS

export default function defaults(app: Application): Application {
  app.use(morgan('dev'))
  app.use(cors({ origin: '*' }))
  const logDirectory = path.join(SRC_PATH, APP_LOGS)
  fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory)
  app.use(
    morgan('combined', {
      stream: rfs.createStream('access.log', {
        interval: '6h',
        path: logDirectory,
      }),
    }),
  )

  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: false }))

  app.use(boom())

  // app.use(models)

  // app.use(Auth.handshake)

  app.use(compression())

  return app
}
