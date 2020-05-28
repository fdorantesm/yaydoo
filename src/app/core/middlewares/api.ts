import { Application } from 'express'
import defaults from './defaults'
import routes from './routes'
import bootstrap from './bootstrap'

export default function api(app: Application): Application {
  bootstrap(app)
  defaults(app)
  routes(app)
  return app
}
