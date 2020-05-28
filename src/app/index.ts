import Framework, { Application } from './core/framework'
import api from './core/middlewares/api'

const framework: Framework = Framework.getInstance()
const app: Application = framework.getApplication()

export default api(app)
