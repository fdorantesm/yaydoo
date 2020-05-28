import * as dotenv from 'dotenv'
import * as path from 'path'
import * as fs from 'fs'

const NODE_ENV = process.env.NODE_ENV
const PWD = process.env.PWD

const $root = PWD
const $dist = path.join(__dirname, '../..').split('/').pop()

process.env.SRC_PATH = path.join($root, $dist === 'build' ? 'build' : 'src')
process.env.ROOT_PATH = $root
process.env.STORAGE_PATH = path.join(process.env.SRC_PATH, 'storage')
process.env.APP_PATH = path.join(process.env.SRC_PATH, 'app')

const envFile = getEnv(NODE_ENV)
const file = fs.existsSync(envFile) ? envFile : getEnv()

if (!fs.existsSync(file)) {
  fs.writeFileSync(file, '')
}

dotenv.config({
  path: file,
})

/**
 * Get env path
 * @param {String} environment
 * @return {String}
 */
function getEnv(environment = null) {
  const suffix = environment === null ? '' : `.${environment}`
  return path.join($root, `.env${suffix}`)
}

export default process.env
