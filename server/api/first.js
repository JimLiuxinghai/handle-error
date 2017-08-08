import Router from 'koa-router'
import axios from 'axios'

const router = Router()
const dataUrl = 'https://api.douban.com/v2'
router.get('/getList', async (ctx, next) => {
	try {
		let response = await axios(`${dataUrl}/movie/in_theaters`);
		ctx.body = response.data;
	}
	catch (err) {
		console.log(err)
	}
})
router.get('/detail/:id', async (ctx, next) => {
	try {
		console.log(ctx.params);
		let id = ctx.params.id;
		let response = await axios(`${dataUrl}/movie/subject/${id}`);
		ctx.body = response.data;
	}
	catch (err) {
		console.log(err)
	}
})
export default router