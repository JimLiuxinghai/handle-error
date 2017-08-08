import Router from 'koa-router'
import common from './common'
import first from './first'
const router = Router()

// routes表示的是路由的嵌套处理
router.use(common.routes(), common.allowedMethods())
router.use('/first', first.routes(), first.allowedMethods())

export default router

