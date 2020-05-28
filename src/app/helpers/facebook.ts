import IFacebookRequestParams from '../interfaces/IFacebookRequestParams'
import IFacebookPost from '../interfaces/iFacebookPost'
import * as request from 'request-promise'

const graph = 'https://graph.facebook.com'

export async function getPosts(payload: IFacebookRequestParams): Promise<IFacebookPost[]> {
  try {
    // eslint-disable-next-line prettier/prettier
    const body = await request(`${graph}/${payload.userID}/posts?access_token=${payload.accessToken}`)
    const { data: posts } = JSON.parse(body)
    return posts
  } catch (err) {
    throw err
  }
}
