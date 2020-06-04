import { humanToYYMMDD } from '../../../src/app/helpers/date'
import * as chai from 'chai'

const expect = chai.expect

describe('Helpers Date', () => {
  it('Should pass if  humanToYYMMDD output is a date in YYYY-MM-DD format', (done) => {
    const output: string = humanToYYMMDD('11/16/1990')
    expect(output.match(/([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/)).to.be.an('array')
    done()
  })
})
