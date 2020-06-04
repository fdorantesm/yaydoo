import * as chai from 'chai'
import * as fs from 'fs'
import * as path from 'path'

const expect = chai.expect

describe('Routes', () => {
  it('Should pass if app has all routes', (done) => {
    const routeMap = fs.readFileSync(path.join(process.env.INIT_CWD, '/routeMap.json')).toString()
    const routes = JSON.parse(routeMap)
    // eslint-disable-next-line prettier/prettier
    expect(routes).to.be.an('object').that.has.all.keys('/auth/facebook', '/auth/me', '/user/posts')
    done()
  })
})
