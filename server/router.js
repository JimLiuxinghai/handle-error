const router = require('koa-router')();
router.get('/', async function (ctx, next) {
	try {
		await ctx.render('index');
	} catch (err) {
		//console.log(err)
		await next()
	}
    
})
module.exports = router;
