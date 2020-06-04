import * as chai from 'chai'
import database from '../../../src/app/config/database'

const expect = chai.expect

describe('Config: database', () => {
  it('Should pass if return a valid object', (done) => {
    Promise.resolve()
      .then(() => {
        expect(database).to.be.an('object')
      })
      .then(() => {
        Object.keys(database).map((name) => {
          // eslint-disable-next-line prettier/prettier
          expect(database[name]).to.be.an('object').that.has.all.keys('auth', 'host', 'base', 'port', 'repl')
        })
      })
      .then(done)
      .catch(done)
  })
})
