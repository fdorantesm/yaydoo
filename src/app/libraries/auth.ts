import * as jwt from 'jsonwebtoken'
import * as fs from 'fs'
import * as path from 'path'
import LoginToken from '../../app/interfaces/LoginToken'
import TokenPayload from '../../app/interfaces/TokenPayload'

const APP_SECURE_KEY = process.env.APP_SECURE_KEY
const APP_SECURE_EXPIRATION = process.env.APP_SECURE_EXPIRATION
const ROOT_PATH = process.env.ROOT_PATH

let signature: Buffer | string
const options = {
  expiresIn: APP_SECURE_EXPIRATION || '1d',
}

try {
  signature = fs.readFileSync(path.join(ROOT_PATH, APP_SECURE_KEY))
} catch (err) {
  signature = APP_SECURE_KEY || 'default'
}

export default class Auth {
  static async verify(token: string): Promise<TokenPayload> {
    if (token) {
      const payload = await jwt.verify(token, signature)
      return payload
    }
    throw Error('auth.invalidToken')
  }

  static async sign(sub: string): Promise<LoginToken> {
    const data = { sub }
    const token = await jwt.sign(data, signature, options)
    const payload = await jwt.verify(token, signature)
    return {
      accessToken: `Bearer ${token}`,
      expiresAt: payload.exp,
    }
  }
}
