import Router from '../../libraries/router'
import * as path from 'path'
import * as glob from 'glob'
import * as CliTable from 'cli-table'
import * as trimEnd from 'lodash/trimEnd'
import * as last from 'lodash/last'
import * as fs from 'fs'

const appRouter = Router.getInstance()
const router = appRouter.getRouter()
const ROOT_PATH = process.env.ROOT_PATH

;(async () => {
  const routeMap = {}
  const table = new CliTable({
    head: ['Method', 'Path'],
    colWidths: [15, 50],
  })
  const routerFiles = glob
    .sync(__dirname + '/*.ts')
    .filter((file) => file.split('/').pop() !== __filename.split('/').pop())
    .filter((file) => file.endsWith('.js') || file.endsWith('.ts'))

  for (const routerFile of routerFiles) {
    try {
      const module = await import(routerFile)
      if (Object.prototype.hasOwnProperty.call(module, 'default')) {
        const routes = module.default
        const extension = last(routerFile.split('.'))
        const base = `/${path.basename(routerFile).replace(`.${extension}`, '')}`
        const prefix = base === '/index' ? null : base
        router.use(!prefix ? '/' : base, routes)
        routes.stack
          .filter((r) => r.route)
          .map((r) => {
            Object.keys(r.route.methods).map((method) => {
              const endpoint = !prefix ? '/' : trimEnd(prefix.concat(r.route.path), '/')
              routeMap[endpoint] = method.toUpperCase()
              table.push([method.toUpperCase(), endpoint])
            })
          })
      }
    } catch (err) {
      console.log(err)
      continue
    }
    fs.writeFileSync(
      path.join(ROOT_PATH, '.routesmap'),
      table.toString().replace(/\x1b\[[0-9;]*m/g, ''),
    )
  }
  fs.writeFileSync(path.join(ROOT_PATH, 'routeMap.json'), JSON.stringify(routeMap, null, 4))
})()

export default router
