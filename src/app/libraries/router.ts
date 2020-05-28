import Routable from '@interfaces/Routable'
import { Router } from 'express'

class AppRouter implements Routable {
  private static INSTANCE: AppRouter
  private router: Router

  private constructor(router: Router) {
    this.router = router
  }

  public static getInstance(): AppRouter {
    // if (!AppRouter.INSTANCE) {
    AppRouter.INSTANCE = new AppRouter(Router())
    // }
    return AppRouter.INSTANCE
  }

  public getRouter(): Router {
    return this.router
  }
}

export default AppRouter
