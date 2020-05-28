import * as slug from 'slug'
import User from '../db/models/User'

export async function makeUserSlug(source: string, attemp = 1): Promise<string> {
  const identifier = attemp === 1 ? '' : attemp
  const username = `${slug(source.replace(' ', ''))}${identifier}`
  const rows = await User.countDocuments({ username })
  if (rows > 0) {
    return makeUserSlug(slug(source.replace(' ', '')), attemp + 1)
  } else {
    return slug(source.replace(' ', '')) + identifier.toString()
  }
}
