import { Request, Response } from 'express'
import Auth from '../../libraries/auth'

export default class HomeController {
  static async index(req: Request, res: Response): Promise<void> {
    const token = await Auth.sign('fdorantesm')
    res.send({ token })
  }
}
