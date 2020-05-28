import * as express from 'express'
import { Request, Response, NextFunction, Application } from 'express'
import WithApp from '@interfaces/WithApp'

export default class Framework implements WithApp {
  private static INSTANCE: Framework
  private application: express.Application

  private constructor(application: express.Application) {
    this.application = application
  }

  public static getInstance(): Framework {
    if (!Framework.INSTANCE) {
      Framework.INSTANCE = new Framework(express())
    }
    return Framework.INSTANCE
  }

  public getApplication(): express.Application {
    return this.application
  }
}

export { Request, Response, NextFunction, Application }
