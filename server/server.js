import Koa from 'koa';
import http from 'http'
import convert from 'koa-convert'
import logger from 'koa-logger'
import views from 'koa-views'
import cors from 'koa-cors' //跨域
import bodyParser from 'koa-bodyparser' //请求体JSON解析
import onerror from 'koa-onerror' //错误处理
import resource from 'koa-static' //静态资源托管
import route from 'koa-router'
import path from 'path'
import webpack from 'webpack'
import index from './router.js'
import api from './api/index'
import config from './config/config'
import catchError from './middlewares/index'
const router = route();
const app = new Koa();

onerror(app)

app.use(convert(cors()))

app.use(convert(logger()))

app.use(bodyParser())

app.use(resource(path.join(__dirname, '../build')));

app.use(resource(path.join(__dirname, '../static')));
// app.use(json({ pretty: false, param: 'pretty' }))
app.use(async (ctx, next) => {
	const start = new Date()
	await next()
	const ms = new Date() - start
	console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})
app.use(views(path.join(__dirname, '../build/views/'), {
  map: {
    html: 'ejs'
  }
}));
router.use('/', index.routes(), index.allowedMethods());
router.use('/api', api.routes(), api.allowedMethods());
app.use(router.routes(), router.allowedMethods());

app.on('error', (error, ctx) => {
	console.log('奇怪的错误' + JSON.stringify(ctx.onerror))
	console.log('server error:' + error)
})

http.createServer(app.callback()).listen(config.port).on('listening', function () {
	console.log('正在监听端口' + config.port)
})

export default app;

