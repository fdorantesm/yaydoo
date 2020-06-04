import * as chai from 'chai'
import { uriString } from '../../../src/app/helpers/mongodb'
import MongoConnection from '@app/interfaces/MongoConnection'

const expect = chai.expect

const config: MongoConnection = {
  auth: 'admin:secret@',
  host: 'localhost',
  base: 'yaydoo',
  port: ':27017',
  repl: false,
}

describe('Helpers mongodb', () => {
  it('Should pass if uriString function returns a valid mongodb uristring', (done) => {
    const uriConnection = uriString(config)
    // eslint-disable-next-line prettier/prettier
    expect(uriConnection.match(/^(mongodb:(?:\/{2})?)((\w+?):(\w+?)@|:?@?)(\w+?):(\d+)\/(\w+?)$/)).to.be.an('array')
    done()
  })
})
