import Router from '../../libraries/router'
import AuthController from '../controllers/AuthController'

const appRouter = Router.getInstance()
const router = appRouter.getRouter()

import AuthMiddleware from '../middlewares/auth'

router.get('/me', AuthMiddleware.handshake, AuthController.me)
router.post('/facebook', AuthController.facebook)

export default router
