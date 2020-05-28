import { Application } from 'express'
import Routes from '../../http/routes/loader'

export default function routes(app: Application): Application {
  app.use('/', Routes)
  return app
}
