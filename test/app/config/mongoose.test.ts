import * as chai from 'chai'
import getConfig, { settings } from '../../../src/app/config/mongoose'

const expect = chai.expect

describe('Config: mongoose', () => {
  it('Should pass if returns an mongoose object', (done) => {
    const config = getConfig()
    expect(config).to.be.an('object').that.has.all.keys('useNewUrlParser', 'useUnifiedTopology')
    done()
  })
  it('Should pass if returns an mongoose settings', (done) => {
    expect(settings).to.be.an('object').that.has.all.keys('debug', 'useCreateIndex')
    done()
  })
})
