import { Router } from 'express/lib/router'

export default interface Routable {
  getRouter(): Router
}
