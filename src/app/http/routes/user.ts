import Router from '../../libraries/router'
import UserController from '../controllers/UserController'

const appRouter = Router.getInstance()
const router = appRouter.getRouter()

import AuthMiddleware from '../middlewares/auth'

router.get('/posts', AuthMiddleware.handshake, UserController.getPosts)

export default router
