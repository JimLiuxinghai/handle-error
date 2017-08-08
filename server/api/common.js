import Router from 'koa-router'
import axios from 'axios'

const router = Router()

router.get('/common', async (ctx, next) => {
	 let response = {
	 	data: [1, 2, 3]
	 };
	 ctx.body = response.data
})

export default router