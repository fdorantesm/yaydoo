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
              table.push([
                method.toUpperCase(),
                !prefix ? '/' : trimEnd(prefix.concat(r.route.path), '/'),
              ])
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
})()

// glob.sync(__dirname + '/*.ts').forEach(async (file) => {
//   if (file.split('/').pop() !== __filename.split('/').pop()) {
//
//   }
//   // eslint-disable-next-line max-len
//   //   fs.writeFileSync(
//   //     path.join(ROOT_PATH, '.env.routes'),
//   //     table.toString().replace(/\x1b\[[0-9;]*m/g, ''),
//   //   )
// })

export default router
