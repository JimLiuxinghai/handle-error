/*
* @ config 用户配置
*/
import utils from './utils.js';

class Config  {
	constructor(options) {
		this.config = {
			url: 'http://192.168.19.57/', //上报错误地址
			delay: 3000, //延迟上报时间
			mergeReport: true, //延迟时间内出现的错误合并上报
			except: [ /^Script error\.?/], // 忽略某个错误
			lostTime: 1,   //存储错误失效时间 /天,
			repeat: 5 //重复五次不上报
		}
		this.config = utils.assignObject( this.config, options );
	}
	get (name) {
		return this.config[name];
	}
	set (name, value) {
		this.config[ name ] = value;
		return this.config[ name ];
	}
}