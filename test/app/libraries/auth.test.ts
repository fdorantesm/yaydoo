import * as chai from 'chai'
import Auth from '../../../src/app/libraries/auth'

const expect = chai.expect

// eslint-disable-next-line prettier/prettier
const accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJmZG9yYW50ZXNtIiwiaWF0IjoxNTkwOTc1NjI1LCJleHAiOjE2MjI1MTE2MjV9.bKSDS50FFnapr2mEAfNEV9kC0-g7CxIWnkT_UTm32so'

describe('Auth Library', () => {
  it('Should pass if returns an accessToken', (done) => {
    Auth.sign('1')
      .then((token) => {
        expect(token).to.be.an('object').that.has.all.keys('accessToken', 'expiresAt')
        expect(token.accessToken).to.be.a('string')
        expect(token.expiresAt).to.be.a('number')
        done()
      })
      .catch(done)
  })
  it('Should pass if returns a valid token payload', (done) => {
    Auth.verify(accessToken)
      .then((payload) => {
        expect(payload).to.be.an('object').that.has.all.keys('sub', 'exp', 'iat')
        done()
      })
      .catch(done)
  })
})
