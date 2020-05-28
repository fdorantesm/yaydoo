// import User from 'models/User'

import { Request, Response, NextFunction } from 'express'

export default class AuthMiddleware {
  static async handshake(req: Request, res: Response, next: NextFunction): Promise<void> {
    const authorization = req.headers['authorization'] || null
    if (authorization) {
      req['token'] = authorization.replace('Bearer ', '')
    }
    next()
  }

  //   static async authentication(req: Request, res: Response, next: NextFunction): Promise<void> {
  //     try {
  //       const authorized = await auth.verify(req.authorization)
  //       if (authorized) {
  //         // eslint-disable-next-line max-len
  //         req.user = await User.findById(authorized.sub).populate(['roles', 'profile'])
  //       }
  //     } catch (err) {
  //       console.log(err)
  //       req.acl = {
  //         role: 'guest',
  //       }
  //     } finally {
  //       next()
  //     }
  //   }

  /**
   * Grants access to next middleware if user is
   * authenticated
   * @void
   * @param {Request} req
   * @param {Response} res
   * @param {Function} next
   */
  //   static async authorization(req, res, next) {
  //     try {
  //       if (req.user) {
  //         next()
  //       } else {
  //         throw new Error()
  //       }
  //     } catch (err) {
  //       res.boom.unauthorized()
  //     }
  //   }
}
