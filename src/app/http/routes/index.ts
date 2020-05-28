import Router from '../../libraries/router'
import HomeController from '../controllers/HomeController'

const appRouter = Router.getInstance()
const router = appRouter.getRouter()

router.get('/', HomeController.index)

export default router
