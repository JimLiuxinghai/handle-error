!(function(window) {
	var bigErr = {
		//统一处理错误格式
		_collectErr: function(error) {
			var hasErr = {};
			var errObj = {
			    userAgent: window.navigator.userAgent,
			    locale: window.navigator.language || window.navigator.userLanguage,
			    url: window.location.href,
			    title: document.title,
			    time: (new Date).getTime(),
			    message: error.message,
			    fileName: error.fileName,
			    lineNumber: error.lineNumber,
			    columnNumber: error.columnNumber,
			    stack: bigErr._processStackMsg(error.stack),
			    fnName: error.fnName,
			    type: error.type
			};
			setTimeout(function() {
		        bigErr._postErr(errObj);
		    }, 10)
		},
		_processStackMsg: function(stack) {
			var dealstack = stack
			    .replace(/\n/gi, '')            // 去掉换行，节省传输内容大小
			    .replace(/\bat\b/gi, '@')       // chrome中是at，ff中是@
			    .split('@')                     // 以@分割信息
			    .slice(0, 10)                    // 最大堆栈长度（Error.stackTraceLimit = 10），所以只取前10条
			    .map(v => v.replace(/^\s*|\s*$/g, ''))  //去除多余空格
			    .join('~')                      // 手动添加分隔符，便于后期展示
			    .replace(/\?[^:]+/gi, '');      // 去除js文件链接的多余参数(?x=1之类)
			return dealstack;
		},
		_findBug: function(error) {
			var errObj = _self.dealErr(error);
			bigErr.collectErr(errObj)
		},
		_postErr: function(obj) {
			bigErr._saveSession(obj.stack);
			if(obj.stack > 10) {
				return;
			}
		    var urlData = [];
		    for(var key in obj) {
		        urlData.push(key +'='+ encodeURIComponent(obj[key]));
		    }
		    var url = 'http://lxh.error.brandwisdom.cn/error.gif?'
		    var imgUrl = `${url}${urlData.join('&')}`;
		    var image = new Image();
		    image.src = imgUrl;
		},
		_dealErr: function(error, isPromise) {
			var err = {
				message: error.message,
				stack: error.stack,
				type: error.name,
				isPromise: isPromise
			}
			return err;
		},
		_saveSession: function(key) {
			sessionStorage[key] = sessionStorage[key] || 0;
			sessionStorage[key] = parseInt(sessionStorage[key]) + 1;
		}
	};
	
	window.addEventListener && window.addEventListener("unhandledrejection", function(e, p) {
		    var errObj = bigErr._dealErr(e.reason, true);
		    bigErr._collectErr(errObj)
	})
	window.addEventListener && window.addEventListener("error", function(errorMessage) {
		var errObj = {
			type: errorMessage.error.name,
			stack: errorMessage.error.stack,
			fileName: errorMessage.filename,
			message: errorMessage.message,
			columnNumber: errorMessage.colno,
			lineNumber: errorMessage.lineno
		}
		bigErr._collectErr(errObj)
	})
	var hasFunction = "function" == typeof define,
	R = "undefined" != typeof module && module.exports;
	hasFunction ? define(bigErr) : R && (module.exports = bigErr)
})(window);



