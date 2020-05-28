import Router from '../../libraries/router'
import AuthController from '../controllers/AuthController'

const appRouter = Router.getInstance()
const router = appRouter.getRouter()

import AuthMiddleware from '../middlewares/auth'
// import validator from 'middlewares/validator';

// router.post('/login', validator, AuthController.login);
// router.post('/facebook', AuthController.facebook);
// router.post('/google', AuthController.google);
// router.post('/register', validator, AuthController.register);

router.get('/login', AuthController.login)
router.get('/me', AuthMiddleware.handshake, AuthController.me)
router.post('/facebook', AuthController.facebook)

export default router
