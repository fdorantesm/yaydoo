import { Application } from 'express'

export default interface WithApp {
  getApplication(): Application
}
