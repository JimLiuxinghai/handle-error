/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ (function(module, exports, __webpack_require__) {

	/**
	 *
	 * @description 入口文件
	 *
	 */
	__webpack_require__(/*! json-js/json2.js */ 1)
	
	var util = __webpack_require__(/*! ./util */ 2)
	var defaultSettings = __webpack_require__(/*! ./config */ 3)
	var store = __webpack_require__(/*! ./store */ 4)
	var Userdata = __webpack_require__(/*! ./userdata */ 5)
	var Net = __webpack_require__(/*! ./net */ 6)
	var Dispatcher = __webpack_require__(/*! ./dispatcher */ 7)
	var Tracker = __webpack_require__(/*! ./tracker */ 8)
	var LegacyDispatcher = __webpack_require__(/*! ./legacyDispatcher */ 12)
	var Action = __webpack_require__(/*! ./action */ 13)
	var win = __webpack_require__(/*! ./window */ 14)
	
	function main(config) {
	  var tracker = new ShadowTracker(config)
	  var started = false
	  var obj = {
	    start: function() {
	      if (started) {
	        util.cw('tracker has started')
	        return
	      }
	      if (config.enabled) {
	        tracker.init()
	        started = true
	      }
	    },
	    config: config,
	    /**
	     * 一个简单的设置和获取userdata的方法
	     * userdata()是获取所有的userdata
	     * userdata(key) 获取某个key对应的data
	     * userdata(key, val) 设置某个key对应的data
	     *
	     */
	    userdata: function() {
	      var argLength = arguments.length
	      if (argLength == 0) {
	        return tracker.userdata.get()
	      }
	      else if (argLength == 1) {
	        var arg = arguments[0]
	        if (util.isString(arg)) {
	          return tracker.userdata.get(arg)
	        }
	      }
	      else {
	        tracker.userdata.set(arguments[0], arguments[1])
	      }
	    }
	  }
	
	  if (config.autoStart) {
	    obj.start()
	  }
	
	  return obj
	}
	
	function ShadowTracker(cfg) {
	  this.config = cfg
	  this.userdata = new Userdata(cfg.userdata)
	
	  this.actionMonitor = new Action(this.config, store)
	  // 初始化不同的上报机制，主要是解决低版本浏览器不支持ajax跨域提交的问题
	  this.dispatcher = util.isIE67() ? new LegacyDispatcher(this.config) : new Dispatcher(this.config)
	  this.tracker = new Tracker(this.config, store, this.dispatcher, this.userdata, this.actionMonitor)
	  console.log('**********')
	  console.log(this.tracker)
	}
	
	ShadowTracker.prototype = {
	  init: function() {
	    win.monitor(this.tracker)
	    new Net(this.config, store, this.tracker)
	  },
	
	  /**
	   * 立刻执行一个函数，并自动捕获函数中出现的异常。
	   * @param  {Function} func 需要执行的函数
	   * @param  {Object} self 函数中的this需要指定的对象
	   * @param  {Params} params 不定个数的参数，作为要指定函数的实参传递进去，如果func是一个匿名函数或者无参函数，则不需要
	   * @return {Mix} func的返回值
	   */
	  capture: function(func, self, params) { //eslint-disable-line
	    util.cw('not realized :(')
	    return
	  },
	
	  /**
	   * 包装一个函数或者对象，主动捕获所有函数或者对象方法的异常
	   * @param  {[type]} func [description]
	   * @return {[type]}      [description]
	   */
	  watch: function(func) {
	    util.cw('not realized :(')
	    return
	  }
	}
	
	// 需要先提供一个全局变量window.flexTracker = {}, 对象内容是配置信息
	// window.flexTracker = {
	//   token: 'token123-456-789',
	//   net: true,
	//   userdata: {
	//     platform: 'desktop',
	//     release: 12
	//   },
	//   compress: false
	// }
	if (util.isPlainObject(window.flexTracker)) {
	  var userConfig = window.flexTracker
	  console.log(userConfig, '&&&&&&&')
	  if (!userConfig.token) {
	    util.cw('token is must needed')
	  }
	  else {
	    var config = Object.assign(defaultSettings, userConfig)
	    window.flexTracker = main(config)
	  }
	  console.log(window.flexTracker)
	}


/***/ }),
/* 1 */
/*!*******************************************!*\
  !*** ./~/_json-js@1.1.2@json-js/json2.js ***!
  \*******************************************/
/***/ (function(module, exports) {

	/*
	    json2.js
	    2015-05-03
	
	    Public Domain.
	
	    NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.
	
	    See http://www.JSON.org/js.html
	
	
	    This code should be minified before deployment.
	    See http://javascript.crockford.com/jsmin.html
	
	    USE YOUR OWN COPY. IT IS EXTREMELY UNWISE TO LOAD CODE FROM SERVERS YOU DO
	    NOT CONTROL.
	
	
	    This file creates a global JSON object containing two methods: stringify
	    and parse. This file is provides the ES5 JSON capability to ES3 systems.
	    If a project might run on IE8 or earlier, then this file should be included.
	    This file does nothing on ES5 systems.
	
	        JSON.stringify(value, replacer, space)
	            value       any JavaScript value, usually an object or array.
	
	            replacer    an optional parameter that determines how object
	                        values are stringified for objects. It can be a
	                        function or an array of strings.
	
	            space       an optional parameter that specifies the indentation
	                        of nested structures. If it is omitted, the text will
	                        be packed without extra whitespace. If it is a number,
	                        it will specify the number of spaces to indent at each
	                        level. If it is a string (such as '\t' or '&nbsp;'),
	                        it contains the characters used to indent at each level.
	
	            This method produces a JSON text from a JavaScript value.
	
	            When an object value is found, if the object contains a toJSON
	            method, its toJSON method will be called and the result will be
	            stringified. A toJSON method does not serialize: it returns the
	            value represented by the name/value pair that should be serialized,
	            or undefined if nothing should be serialized. The toJSON method
	            will be passed the key associated with the value, and this will be
	            bound to the value
	
	            For example, this would serialize Dates as ISO strings.
	
	                Date.prototype.toJSON = function (key) {
	                    function f(n) {
	                        // Format integers to have at least two digits.
	                        return n < 10 
	                            ? '0' + n 
	                            : n;
	                    }
	
	                    return this.getUTCFullYear()   + '-' +
	                         f(this.getUTCMonth() + 1) + '-' +
	                         f(this.getUTCDate())      + 'T' +
	                         f(this.getUTCHours())     + ':' +
	                         f(this.getUTCMinutes())   + ':' +
	                         f(this.getUTCSeconds())   + 'Z';
	                };
	
	            You can provide an optional replacer method. It will be passed the
	            key and value of each member, with this bound to the containing
	            object. The value that is returned from your method will be
	            serialized. If your method returns undefined, then the member will
	            be excluded from the serialization.
	
	            If the replacer parameter is an array of strings, then it will be
	            used to select the members to be serialized. It filters the results
	            such that only members with keys listed in the replacer array are
	            stringified.
	
	            Values that do not have JSON representations, such as undefined or
	            functions, will not be serialized. Such values in objects will be
	            dropped; in arrays they will be replaced with null. You can use
	            a replacer function to replace those with JSON values.
	            JSON.stringify(undefined) returns undefined.
	
	            The optional space parameter produces a stringification of the
	            value that is filled with line breaks and indentation to make it
	            easier to read.
	
	            If the space parameter is a non-empty string, then that string will
	            be used for indentation. If the space parameter is a number, then
	            the indentation will be that many spaces.
	
	            Example:
	
	            text = JSON.stringify(['e', {pluribus: 'unum'}]);
	            // text is '["e",{"pluribus":"unum"}]'
	
	
	            text = JSON.stringify(['e', {pluribus: 'unum'}], null, '\t');
	            // text is '[\n\t"e",\n\t{\n\t\t"pluribus": "unum"\n\t}\n]'
	
	            text = JSON.stringify([new Date()], function (key, value) {
	                return this[key] instanceof Date 
	                    ? 'Date(' + this[key] + ')' 
	                    : value;
	            });
	            // text is '["Date(---current time---)"]'
	
	
	        JSON.parse(text, reviver)
	            This method parses a JSON text to produce an object or array.
	            It can throw a SyntaxError exception.
	
	            The optional reviver parameter is a function that can filter and
	            transform the results. It receives each of the keys and values,
	            and its return value is used instead of the original value.
	            If it returns what it received, then the structure is not modified.
	            If it returns undefined then the member is deleted.
	
	            Example:
	
	            // Parse the text. Values that look like ISO date strings will
	            // be converted to Date objects.
	
	            myData = JSON.parse(text, function (key, value) {
	                var a;
	                if (typeof value === 'string') {
	                    a =
	/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)Z$/.exec(value);
	                    if (a) {
	                        return new Date(Date.UTC(+a[1], +a[2] - 1, +a[3], +a[4],
	                            +a[5], +a[6]));
	                    }
	                }
	                return value;
	            });
	
	            myData = JSON.parse('["Date(09/09/2001)"]', function (key, value) {
	                var d;
	                if (typeof value === 'string' &&
	                        value.slice(0, 5) === 'Date(' &&
	                        value.slice(-1) === ')') {
	                    d = new Date(value.slice(5, -1));
	                    if (d) {
	                        return d;
	                    }
	                }
	                return value;
	            });
	
	
	    This is a reference implementation. You are free to copy, modify, or
	    redistribute.
	*/
	
	/*jslint 
	    eval, for, this 
	*/
	
	/*property
	    JSON, apply, call, charCodeAt, getUTCDate, getUTCFullYear, getUTCHours,
	    getUTCMinutes, getUTCMonth, getUTCSeconds, hasOwnProperty, join,
	    lastIndex, length, parse, prototype, push, replace, slice, stringify,
	    test, toJSON, toString, valueOf
	*/
	
	
	// Create a JSON object only if one does not already exist. We create the
	// methods in a closure to avoid creating global variables.
	
	if (typeof JSON !== 'object') {
	    JSON = {};
	}
	
	(function () {
	    'use strict';
	    
	    var rx_one = /^[\],:{}\s]*$/,
	        rx_two = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,
	        rx_three = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
	        rx_four = /(?:^|:|,)(?:\s*\[)+/g,
	        rx_escapable = /[\\\"\u0000-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
	        rx_dangerous = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
	
	    function f(n) {
	        // Format integers to have at least two digits.
	        return n < 10 
	            ? '0' + n 
	            : n;
	    }
	    
	    function this_value() {
	        return this.valueOf();
	    }
	
	    if (typeof Date.prototype.toJSON !== 'function') {
	
	        Date.prototype.toJSON = function () {
	
	            return isFinite(this.valueOf())
	                ? this.getUTCFullYear() + '-' +
	                        f(this.getUTCMonth() + 1) + '-' +
	                        f(this.getUTCDate()) + 'T' +
	                        f(this.getUTCHours()) + ':' +
	                        f(this.getUTCMinutes()) + ':' +
	                        f(this.getUTCSeconds()) + 'Z'
	                : null;
	        };
	
	        Boolean.prototype.toJSON = this_value;
	        Number.prototype.toJSON = this_value;
	        String.prototype.toJSON = this_value;
	    }
	
	    var gap,
	        indent,
	        meta,
	        rep;
	
	
	    function quote(string) {
	
	// If the string contains no control characters, no quote characters, and no
	// backslash characters, then we can safely slap some quotes around it.
	// Otherwise we must also replace the offending characters with safe escape
	// sequences.
	
	        rx_escapable.lastIndex = 0;
	        return rx_escapable.test(string) 
	            ? '"' + string.replace(rx_escapable, function (a) {
	                var c = meta[a];
	                return typeof c === 'string'
	                    ? c
	                    : '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
	            }) + '"' 
	            : '"' + string + '"';
	    }
	
	
	    function str(key, holder) {
	
	// Produce a string from holder[key].
	
	        var i,          // The loop counter.
	            k,          // The member key.
	            v,          // The member value.
	            length,
	            mind = gap,
	            partial,
	            value = holder[key];
	
	// If the value has a toJSON method, call it to obtain a replacement value.
	
	        if (value && typeof value === 'object' &&
	                typeof value.toJSON === 'function') {
	            value = value.toJSON(key);
	        }
	
	// If we were called with a replacer function, then call the replacer to
	// obtain a replacement value.
	
	        if (typeof rep === 'function') {
	            value = rep.call(holder, key, value);
	        }
	
	// What happens next depends on the value's type.
	
	        switch (typeof value) {
	        case 'string':
	            return quote(value);
	
	        case 'number':
	
	// JSON numbers must be finite. Encode non-finite numbers as null.
	
	            return isFinite(value) 
	                ? String(value) 
	                : 'null';
	
	        case 'boolean':
	        case 'null':
	
	// If the value is a boolean or null, convert it to a string. Note:
	// typeof null does not produce 'null'. The case is included here in
	// the remote chance that this gets fixed someday.
	
	            return String(value);
	
	// If the type is 'object', we might be dealing with an object or an array or
	// null.
	
	        case 'object':
	
	// Due to a specification blunder in ECMAScript, typeof null is 'object',
	// so watch out for that case.
	
	            if (!value) {
	                return 'null';
	            }
	
	// Make an array to hold the partial results of stringifying this object value.
	
	            gap += indent;
	            partial = [];
	
	// Is the value an array?
	
	            if (Object.prototype.toString.apply(value) === '[object Array]') {
	
	// The value is an array. Stringify every element. Use null as a placeholder
	// for non-JSON values.
	
	                length = value.length;
	                for (i = 0; i < length; i += 1) {
	                    partial[i] = str(i, value) || 'null';
	                }
	
	// Join all of the elements together, separated with commas, and wrap them in
	// brackets.
	
	                v = partial.length === 0
	                    ? '[]'
	                    : gap
	                        ? '[\n' + gap + partial.join(',\n' + gap) + '\n' + mind + ']'
	                        : '[' + partial.join(',') + ']';
	                gap = mind;
	                return v;
	            }
	
	// If the replacer is an array, use it to select the members to be stringified.
	
	            if (rep && typeof rep === 'object') {
	                length = rep.length;
	                for (i = 0; i < length; i += 1) {
	                    if (typeof rep[i] === 'string') {
	                        k = rep[i];
	                        v = str(k, value);
	                        if (v) {
	                            partial.push(quote(k) + (
	                                gap 
	                                    ? ': ' 
	                                    : ':'
	                            ) + v);
	                        }
	                    }
	                }
	            } else {
	
	// Otherwise, iterate through all of the keys in the object.
	
	                for (k in value) {
	                    if (Object.prototype.hasOwnProperty.call(value, k)) {
	                        v = str(k, value);
	                        if (v) {
	                            partial.push(quote(k) + (
	                                gap 
	                                    ? ': ' 
	                                    : ':'
	                            ) + v);
	                        }
	                    }
	                }
	            }
	
	// Join all of the member texts together, separated with commas,
	// and wrap them in braces.
	
	            v = partial.length === 0
	                ? '{}'
	                : gap
	                    ? '{\n' + gap + partial.join(',\n' + gap) + '\n' + mind + '}'
	                    : '{' + partial.join(',') + '}';
	            gap = mind;
	            return v;
	        }
	    }
	
	// If the JSON object does not yet have a stringify method, give it one.
	
	    if (typeof JSON.stringify !== 'function') {
	        meta = {    // table of character substitutions
	            '\b': '\\b',
	            '\t': '\\t',
	            '\n': '\\n',
	            '\f': '\\f',
	            '\r': '\\r',
	            '"': '\\"',
	            '\\': '\\\\'
	        };
	        JSON.stringify = function (value, replacer, space) {
	
	// The stringify method takes a value and an optional replacer, and an optional
	// space parameter, and returns a JSON text. The replacer can be a function
	// that can replace values, or an array of strings that will select the keys.
	// A default replacer method can be provided. Use of the space parameter can
	// produce text that is more easily readable.
	
	            var i;
	            gap = '';
	            indent = '';
	
	// If the space parameter is a number, make an indent string containing that
	// many spaces.
	
	            if (typeof space === 'number') {
	                for (i = 0; i < space; i += 1) {
	                    indent += ' ';
	                }
	
	// If the space parameter is a string, it will be used as the indent string.
	
	            } else if (typeof space === 'string') {
	                indent = space;
	            }
	
	// If there is a replacer, it must be a function or an array.
	// Otherwise, throw an error.
	
	            rep = replacer;
	            if (replacer && typeof replacer !== 'function' &&
	                    (typeof replacer !== 'object' ||
	                    typeof replacer.length !== 'number')) {
	                throw new Error('JSON.stringify');
	            }
	
	// Make a fake root object containing our value under the key of ''.
	// Return the result of stringifying the value.
	
	            return str('', {'': value});
	        };
	    }
	
	
	// If the JSON object does not yet have a parse method, give it one.
	
	    if (typeof JSON.parse !== 'function') {
	        JSON.parse = function (text, reviver) {
	
	// The parse method takes a text and an optional reviver function, and returns
	// a JavaScript value if the text is a valid JSON text.
	
	            var j;
	
	            function walk(holder, key) {
	
	// The walk method is used to recursively walk the resulting structure so
	// that modifications can be made.
	
	                var k, v, value = holder[key];
	                if (value && typeof value === 'object') {
	                    for (k in value) {
	                        if (Object.prototype.hasOwnProperty.call(value, k)) {
	                            v = walk(value, k);
	                            if (v !== undefined) {
	                                value[k] = v;
	                            } else {
	                                delete value[k];
	                            }
	                        }
	                    }
	                }
	                return reviver.call(holder, key, value);
	            }
	
	
	// Parsing happens in four stages. In the first stage, we replace certain
	// Unicode characters with escape sequences. JavaScript handles many characters
	// incorrectly, either silently deleting them, or treating them as line endings.
	
	            text = String(text);
	            rx_dangerous.lastIndex = 0;
	            if (rx_dangerous.test(text)) {
	                text = text.replace(rx_dangerous, function (a) {
	                    return '\\u' +
	                            ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
	                });
	            }
	
	// In the second stage, we run the text against regular expressions that look
	// for non-JSON patterns. We are especially concerned with '()' and 'new'
	// because they can cause invocation, and '=' because it can cause mutation.
	// But just to be safe, we want to reject all unexpected forms.
	
	// We split the second stage into 4 regexp operations in order to work around
	// crippling inefficiencies in IE's and Safari's regexp engines. First we
	// replace the JSON backslash pairs with '@' (a non-JSON character). Second, we
	// replace all simple value tokens with ']' characters. Third, we delete all
	// open brackets that follow a colon or comma or that begin the text. Finally,
	// we look to see that the remaining characters are only whitespace or ']' or
	// ',' or ':' or '{' or '}'. If that is so, then the text is safe for eval.
	
	            if (
	                rx_one.test(
	                    text
	                        .replace(rx_two, '@')
	                        .replace(rx_three, ']')
	                        .replace(rx_four, '')
	                )
	            ) {
	
	// In the third stage we use the eval function to compile the text into a
	// JavaScript structure. The '{' operator is subject to a syntactic ambiguity
	// in JavaScript: it can begin a block or an object literal. We wrap the text
	// in parens to eliminate the ambiguity.
	
	                j = eval('(' + text + ')');
	
	// In the optional fourth stage, we recursively walk the new structure, passing
	// each name/value pair to a reviver function for possible transformation.
	
	                return typeof reviver === 'function'
	                    ? walk({'': j}, '')
	                    : j;
	            }
	
	// If the text is not JSON parseable, then a SyntaxError is thrown.
	
	            throw new SyntaxError('JSON.parse');
	        };
	    }
	}());


/***/ }),
/* 2 */
/*!*********************!*\
  !*** ./src/util.js ***!
  \*********************/
/***/ (function(module, exports) {

	// 基本的辅助函数
	var obj = {}
	var types = ['Array', 'Boolean', 'Date', 'Number', 'Object', 'RegExp', 'String', 'Error', 'Window', 'HTMLDocument']
	// 增加判断几种类型的方法
	for (var i = 0, c; c = types[i]; ++i) {
	  obj['is' + c] = (function(type) {
	    return function(obj) {
	      return Object.prototype.toString.call(obj) == '[object ' + type + ']'
	    }
	  })(c)
	}
	
	/**
	 * 判断是否简单对象类型对象直接量和new Object初始化的对象
	 * @param  {Object}  o 要判断的对象
	 * @return {Boolean}
	 */
	function isPlainObject(o) {
	  var ctor, prot
	
	  if (obj.isObject(o) === false) {
	    return false
	  }
	
	  // 是否函数
	  ctor = o.constructor
	  if (typeof ctor !== 'function') {
	    return false
	  }
	  // 原型是否对象
	  prot = ctor.prototype
	  if (obj.isObject(prot) === false) {
	    return false
	  }
	
	  if (prot.hasOwnProperty('isPrototypeOf') === false) {
	    return false
	  }
	
	  return true
	}
	
	// 增加简单的bind和extend
	function bind(method, self) { //eslint-disable-line
	  var slice = Array.prototype.slice
	  var args = slice.call(arguments, 2)
	  return function() {
	    var innerArgs = slice.call(arguments)
	    return method.apply(self, args.concat(innerArgs))
	  }
	}
	
	/**
	 * 判断是否ie6-8 http://www.cnblogs.com/rubylouvre/archive/2010/01/28/1658006.html
	 * @return {Boolean}
	 */
	function isOldIE() {
	  return !+[1,] // eslint-disable-line
	}
	
	/**
	 * 判断是否ie浏览器
	 * @return {Boolean}
	 */
	function isIE() {
	  return 'ActiveXObject' in window
	}
	
	/**
	 * 判断是否ie67
	 * @return {Boolean}
	 */
	function isIE67() {
	  var ua = navigator.userAgent
	  var isIE6 = ua.search(/MSIE 6/i) != -1
	  var isIE7 = ua.search(/MSIE 7/i) != -1
	  return isIE6 || isIE7
	}
	
	
	/**
	 * 左侧补零
	 * @param  {Integer} num 需要补零的数值
	 * @param  {Integer} n   补充的位数
	 * @return {String}      补零后的字符串
	 */
	function pad(num, n) {
	  var len = String(num).length
	  while (len < n) {
	    num = '0' + num
	    len++
	  }
	  return num
	}
	
	/**
	 * console.warn的简化版，如果浏览器不支持console，那么无需输出
	 * @param {String} message 要输出的警告信息
	 */
	function cw(message) {
	  console && console.warn(message)
	}
	
	/**
	 * 返回全局的对象值，有值的话返回。
	 * @param  {[String]} namespace 名字空间
	 * @return {[Mix]}
	 */
	function globalObjValue(namespace) {
	  try {
	    return eval(namespace)
	  }
	  catch (e) {
	    return null
	  }
	}
	
	function addEvent(element, type, listener, capture) {
	  if (window.addEventListener) {
	    element.addEventListener(type, listener, capture || false)
	  }
	  else if (window.attachEvent) {
	    element.attachEvent('on' + type, listener)
	  }
	  // 如果还要处理dom1 event类型，需要缓存用户原来设置的事件
	}
	
	function removeEvent(element, type, listener, capture) {
	  if (window.removeEventListener) {
	    element.removeEventListener(type, listener, capture || false)
	  }
	  else if (window.detachEvent) {
	    element.detachEvent('on' + type, listener)
	  }
	}
	
	/**
	 * 返回带时区的iso8601格式的utc时间
	 * @return {[String]}
	 */
	function getISODateNow() {
	  var now = new Date()
	  var timezone = -now.getTimezoneOffset() // 这个单位是分钟，值是反的
	  var tzStr = timezone >= 0 ? '+' : '-'
	  tzStr += pad((timezone / 60), 2) + ':' + pad((timezone % 60), 2)
	
	  var dateWithTimezone = new Date(now - 0 + timezone * 60 * 1000)
	  return dateWithTimezone.getUTCFullYear()
	    + '-' + pad( dateWithTimezone.getUTCMonth() + 1, 2)
	    + '-' + pad( dateWithTimezone.getUTCDate(), 2)
	    + 'T' + pad( dateWithTimezone.getUTCHours(), 2)
	    + ':' + pad( dateWithTimezone.getUTCMinutes(), 2)
	    + ':' + pad( dateWithTimezone.getUTCSeconds(), 2)
	    + tzStr
	}
	
	/**
	 * Array.prototype.indexOf，不支持元素是复杂类型的情况，只是通过===来判断
	 * @param arr 数组
	 * @param val 检测值
	 * @returns {number} 所在下标，没有返回-1
	 */
	function indexOf(arr, val) {
	  if (isOldIE()) {
	    for (var i = 0; i < arr.length; ++i) {
	      if (arr[i] === val) {
	        return i
	      }
	    }
	    return -1
	  }
	  else {
	    return Array.prototype.indexOf.call(arr, val)
	  }
	}
	
	
	/**
	 * 返回一个伪随机guid 参看http://www.jb51.net/article/40678.htm，跑了几个不同的实现，采取效率高一些的实现
	 * @return {String}
	 */
	function guid() {
	  return (S4() + S4() + '-' + S4() + '-' + S4() + '-' + S4() + '-' + S4() + S4() + S4())
	}
	function S4() {
	  return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
	}
	
	/**
	 * 把一个对象的key-value转化成querystring的形式
	 * @param 要转换的对象
	 * @returns {string} 转换后的字符串，会在末尾添加'&'
	 */
	function object2Query(obj) {
	  var data = []
	  for (var p in obj) {
	    if (obj.hasOwnProperty(p)) {
	      data.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]))
	    }
	  }
	  return data.join('&') + '&'
	}
	// Object.assign polyfill加入 https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
	if (typeof Object.assign != 'function') {
	  Object.assign = function(target) {
	    'use strict'
	    if (target == null) {
	      throw new TypeError('Cannot convert undefined or null to object')
	    }
	
	    target = Object(target)
	    for (var index = 1; index < arguments.length; index++) {
	      var source = arguments[index]
	      if (source != null) {
	        for (var key in source) {
	          if (Object.prototype.hasOwnProperty.call(source, key)) {
	            target[key] = source[key]
	          }
	        }
	      }
	    }
	    return target
	  }
	}
	
	var output = Object.assign(obj, {
	  isPlainObject: isPlainObject,
	  bind: bind,
	  isOldIE: isOldIE,
	  isIE: isIE,
	  isIE67: isIE67,
	  pad: pad,
	  cw: cw,
	  guid: guid,
	  addEvent: addEvent,
	  removeEvent: removeEvent,
	  indexOf: indexOf,
	  isoDate: getISODateNow,
	  object2Query: object2Query,
	  globalObjValue: globalObjValue
	})
	
	module.exports = output


/***/ }),
/* 3 */
/*!***********************!*\
  !*** ./src/config.js ***!
  \***********************/
/***/ (function(module, exports) {

	/**
	 *
	 * @description 配置信息模块
	 *
	 */
	
	/**
	 * 内部配置信息
	 * @type {Object}
	 */
	var settings = {
	  version: '0.2.0',  // 版本号有助于后端处理不同版本的数据格式，不同版本之前可能会出现数据类型的差异
	  maxStackDepth: 10, // 错误堆栈最大深度
	  reportPath: 'www.example.com/catch', // 这是服务器提交的地址，根据自己的情况设置
	  maxReportCount: 200, // 最大错误数量，超过这个数就不发送了
	  maxErrorToleranceAge: 1000 // 最大错误允许间隔（单位：ms），小于这个间隔的同类错误将被抛弃
	}
	
	/**
	 * 默认的配置信息
	 * @type {Object}
	 */
	var defaults = {
	  enabled: true,      // 是否可用，关闭以后不再捕获和发送错误信息
	  action: true,       // 是否监控并发送用户操作信息
	  hook: true,         // 是否增加hook，把setTimeout/setInterval/requestAnimationFrame和add/removeEventListener给wrap一层
	  net: true,          // 是否hook ajax请求
	  dependence: true,   // 是否发送页面上的依赖库信息，默认会有几个内置流行库的检测，剩余的通过遍历window对象获取
	  compress: true,     // 是否压缩提交的数据，使用https://github.com/pieroxy/lz-string 整体性价比兼容性都比较靠谱
	  autoStart: true,    // 自动开始，不想自动开始的话就设置成false，然后手动start
	  report: {
	    delay: 5000       // 报告发送的延迟时间(单位ms)，如果一个时间段内有很多报告产生，那么就放到一起发送
	  },
	  ignoreErrors: [],   // 可忽略的错误
	  ignoreUrls:[],      // 可忽略的url，那些产生错误的url
	  settings: settings
	}
	
	module.exports = defaults


/***/ }),
/* 4 */
/*!**********************!*\
  !*** ./src/store.js ***!
  \**********************/
/***/ (function(module, exports, __webpack_require__) {

	/**
	 *
	 * @description 存取一些临时数据的仓库
	 *
	 */
	
	var util = __webpack_require__(/*! ./util */ 2)
	var data = []
	
	var store = {
	  capacity: 20,
	
	  /**
	   * 添加数据入库
	   * @param {Mix} value 任何类型的数据
	   * @param {String} type  任何类型的字符串，用来在all()函数里面做筛选
	   */
	  add: function(value, type) {
	    var guid = util.guid()
	    data.push({
	      id: guid,
	      type: type,
	      value: value
	    })
	    this.truncate()
	    return guid
	  },
	
	  /**
	   * 根据guid返回对应的数据，找不到返回null
	   * @param  {String} guid
	   * @return {Mix}
	   */
	  get: function(guid) {
	    for (var i = 0; i < data.length; ++i) {
	      var item = data[i]
	      if (item.id === guid) {
	        return {key: item.id, value: item.value}
	      }
	    }
	    return null
	  },
	  /**
	   * 清空数据，这时获取all()得到的是一个空数组
	   * @param {String} type 清空的类型
	   */
	  clear: function(type) {
	    var argLength = arguments.length
	    switch (argLength) {
	      case 0:
	        data.length = []
	        break
	      case 1:
	        var i = 0, item
	        while (item = data[i++]) {
	          if (item.type == type) {
	            data.splice(item, 1)
	          }
	        }
	        break
	    }
	  },
	  /**
	   * 保持库内数组的长度，超出的数据会被删除
	   */
	  truncate: function() {
	    if (data.length <= this.capacity) {
	      return
	    }
	    data.splice(this.capacity)
	  },
	  /**
	   * 根据指定的guid删除数据
	   * @param  {String} guid
	   * @return {Boolean} 删除成功返回true，失败返回false
	   */
	  remove: function(guid) {
	    var len = data.length
	    for (var i = 0; i < len; ++i) {
	      var item = data[i]
	      if (item.id === guid) {
	        data.splice(i, 1)
	        return true
	      }
	    }
	    return false
	  },
	  /**
	   * 根据type返回对应的数据类型，不存在的类型返回空数组，不提供type的话，返回所有数据
	   * @params  {String} type
	   * @params  {Boolean} isSimple 如果是简单类型，直接返回包含value值的数组
	   * @return {Mix}
	   */
	  all: function(type, isSimple) {
	    var result = []
	    isSimple = isSimple || false
	    var len = data.length
	    for (var i = 0; i < len; ++i) {
	      var item = data[i]
	      if (!type || item.type === type) {
	        if (isSimple) {
	          result.push(item.value)
	        }
	        else {
	          result.push({
	            key:item.id,
	            value:item.value
	          })
	        }
	      }
	    }
	    return result
	  }
	}
	
	module.exports = store


/***/ }),
/* 5 */
/*!*************************!*\
  !*** ./src/userdata.js ***!
  \*************************/
/***/ (function(module, exports, __webpack_require__) {

	/**
	 *
	 * @description 保存用户自定义数据类型
	 *
	 */
	
	var util = __webpack_require__(/*! ./util */ 2)
	
	function userdata(data) {
	  this.data = data || {}
	}
	
	userdata.prototype = {
	  /**
	   * 设置配置信息
	   * @param  {Mix} params 参数有2种情况，不满足条件的都会被discard
	   *
	   * 1.  {Object} params 直接将参数对象合并到配置中
	   *
	   * 2.  {String} p1 要设置的key
	   *     {Mix}    p2 对应的数值
	   */
	  set: function() {
	    var argLength = arguments.length
	
	    switch (argLength) {
	      case 1:
	        if (util.isObject(arguments[0])) {
	          Object.assign(this.data, arguments[0])
	        }
	        break
	      case 2:
	        this.data[arguments[0]] = arguments[1]
	        break
	    }
	  },
	
	  /**
	   * 根据key返回value值
	   * @param  {String} key
	   * @return {Mix}    与key对应的配置信息，没有的话返回null
	   */
	  get: function(key) {
	    if (arguments.length == 0) {
	      return this.data
	    }
	    return this.data[key] || null
	  },
	
	  /**
	   * 删除key对应的数据
	   * @param  {String} key
	   */
	  remove: function(key) {
	    delete this.data[key]
	  },
	
	  /**
	   * 清空所有数据
	   */
	  clear: function() {
	    this.data = {}
	  }
	}
	
	module.exports = userdata


/***/ }),
/* 6 */
/*!********************!*\
  !*** ./src/net.js ***!
  \********************/
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * 捕获ajax请求中的参数
	 */
	
	var util = __webpack_require__(/*! ./util */ 2)
	
	var Net = function(config, store, tracker) {
	  this.config = config
	  this.store = store
	  this.tracker = tracker
	  if (this.config.net) {
	    this.init()
	  }
	}
	
	Net.prototype = {
	  init: function() {
	    if (window.XMLHttpRequest) {
	      this.hook(window.XMLHttpRequest)
	    }
	    if (window.XDomainRequest) {
	      this.hook(window.XDomainRequest)
	    }
	  },
	  hook: function(klass) {
	    var open = klass.prototype.open
	    var send = klass.prototype.send
	    var self = this
	    // 重写open和send，获取需要的参数
	    klass.prototype.open = function(method, url) {
	      this._track = { //直接绑到xhr上
	        method: method.toLowerCase(),
	        url: url
	      }
	      return open.apply(this, arguments)
	    }
	
	    klass.prototype.send = function() {
	      this._track.id = self.store.add({
	        start: util.isoDate(),
	        method: this._track.method,
	        url: this._track.url
	      }, 'net')
	
	      self.registerComplete(this) // this = xhr
	      return send.apply(this, arguments)
	    }
	  },
	  registerComplete: function(xhr) {
	    var self = this
	
	    if (xhr.addEventListener) {
	      xhr.addEventListener('readystatechange', function() {
	        if (xhr.readyState == 4) {
	          self.checkComplete(xhr)
	        }
	      }, true)
	    }
	    else {
	      setTimeout(function() {
	        var onload = xhr.onload
	        xhr.onload = function () {
	          self.checkComplete(xhr)
	          return onload.apply(xhr, arguments)
	        }
	
	        var onerror = xhr.onerror
	        xhr.onerror = function () {
	          self.checkComplete(xhr)
	          return onerror.apply(xhr, arguments)
	        }
	      }, 0)
	    }
	  },
	  checkComplete: function(xhr) {
	    if (xhr._track) {
	      var track = this.store.get(xhr._track.id)
	      if (track) {
	        var info = track.value
	        info.finish = util.isoDate()
	        // http://stackoverflow.com/questions/10046972/msie-returns-status-code-of-1223-for-ajax-request
	        info.statusCode = (xhr.status == 1223 ? 204 : xhr.status)
	        info.statusText = (xhr.status == 1223 ? 'No Content' : xhr.statusText)
	
	        if (xhr.status >= 400 && xhr.status != 1223) { // 如果发现的xhr的错误，就上报，但是这条数据不出现在日志中，只作为错误上报
	          this.store.remove(xhr._track.id)
	          this.tracker['catch'](info, 'xhr')
	        }
	      }
	    }
	  }
	}
	
	module.exports = Net


/***/ }),
/* 7 */
/*!***************************!*\
  !*** ./src/dispatcher.js ***!
  \***************************/
/***/ (function(module, exports, __webpack_require__) {

	/**
	 *
	 * @description 错误信息发送
	 *
	 */
	
	var util = __webpack_require__(/*! ./util */ 2)
	
	// 加载先检测是否https和是否支持cors xmlhttprequest
	var https = window.location.protocol.indexOf('https') > -1 ? true : false
	
	var supportCors = function() {
	  if (util.isIE67()) {
	    return false
	  }
	  return 'withCredentials' in new XMLHttpRequest
	}()
	
	function dispatcher(config) {
	  this.config = config
	}
	
	dispatcher.prototype = {
	  /**
	   * 根据页面协议选择发送到http还是https
	   * @return {String} 要发送的地址
	   */
	  endPoint: function() {
	    return (https ? 'https://' : 'http://') + this.config.settings.reportPath + '?token=' + this.config.token + '&'
	  },
	  sendError: function(info) {
	    var endPoint = this.endPoint(this.config.token)
	    var xhr = getXHR(endPoint)
	    if (util.isString(info)) {
	      xhr.send(info)
	    }
	    else {
	      xhr.send(JSON.stringify(info))
	    }
	  }
	}
	
	function getXHR(url) { // todo ie6-7直接用form提交请求实现，并且减少提交的数据
	  var xmlHttp
	  if (supportCors) { // ie9+, chrome, ff
	    xmlHttp = new XMLHttpRequest()
	  }
	  else if (XDomainRequest) { // ie10-
	    xmlHttp = new XDomainRequest()
	  }
	  else { // ie8-
	    xmlHttp = null
	  }
	
	  xmlHttp.open('post', url, true)
	  // XMLDomainRequest不支持设置setRequestHeader方法
	  xmlHttp.setRequestHeader && xmlHttp.setRequestHeader('Content-Type', 'text/plain')
	  return xmlHttp
	}
	
	module.exports = dispatcher


/***/ }),
/* 8 */
/*!************************!*\
  !*** ./src/tracker.js ***!
  \************************/
/***/ (function(module, exports, __webpack_require__) {

	/**
	 *
	 * @description 处理异常模块
	 *
	 */
	
	var util = __webpack_require__(/*! ./util */ 2)
	var env = __webpack_require__(/*! ./environment */ 9)
	var dependenceMointer = __webpack_require__(/*! ./dependence */ 10)
	var lzString = __webpack_require__(/*! lz-string */ 11)
	
	/**
	 * 根据堆栈的长度，截断多余的堆栈信息
	 * @param  {String} stack  原始堆栈
	 * @param  {Integer} maxDepth 最大堆栈长度
	 * @return {String}        截断后的堆栈
	 */
	function subStack(stack, maxDepth) {
	  if (!stack) {
	    return null
	  }
	
	  var arr = stack.toString().split('\n')
	  var stackDepth = arr.length
	  if (stackDepth > maxDepth) {
	    return arr.slice(0, maxDepth).join('\n')
	  }
	  return stack
	}
	
	function getErrorKey(error) {
	  return [error.message, error.file || 'null', error.line || 'null', error.col || 'null'].join('---')
	}
	
	/**
	 * 异常信息处理器
	 * @param  {Object} cfg        配置信息
	 * @param  {Object} store      存储库
	 * @param  {Object} dispatcher 发送器
	 * @param  {Object} userdata   自定义数据
	 * @param  {Object} actionMonitor 行为捕捉器
	 */
	var tracker = function(cfg, store, dispatcher, userdata, actionMonitor) {
	  this.config = cfg
	  this.store = store
	  this.dispatcher = dispatcher
	  this.userdata = userdata
	  this.action = actionMonitor
	  this.reportCount = 0  // 已经发送的错误数量
	  this.lastError = null // 上一个出错信息，{key:{message}--{file}--{line}--{column},time:}
	}
	
	tracker.prototype = {
	  /**
	   * 捕获某个类型的异常，处理并发送请求
	   * @param  {Object} error 错误信息
	   * @param  {String} type  异常类型，有window,xhr,catch三种，分别对应window.onerror捕获,hook xhr捕获和主动try,catch捕获
	   */
	  'catch': function(error, type) {
	    type = type.toLowerCase()
	    var info = {
	      source: type,
	      environment: env.all(),
	      url: location.href,
	      time: util.isoDate(),
	      token: this.config.token
	    }
	
	    switch (type) {
	      case 'window':
	        error.stack = subStack(error.stack, this.config.settings.maxStackDepth)
	        info.error = error
	        break
	      case 'xhr':
	        info.error = error
	        break
	      case 'catch': // todo 手动触发
	        break
	    }
	
	    this.report(info)
	  },
	  /**
	   * 发送错误报告，对要发送的内容有相应的的筛选规则
	   * @param  {Object} info 报告主体
	   */
	  report: function(info) {
	    if (this.throttle()) {
	      return
	    }
	
	    var key = getErrorKey(info.error)
	    if (this.lastError && key == this.lastError.key) { // 对发送的错误做一定的筛选
	      var lastErrorReportTime = new Date(this.lastError.time) // todo 查看ie6-7下面是否支持iso格式的时间格式化
	      var timespan = new Date() - lastErrorReportTime
	      if (timespan <= this.config.settings.maxErrorToleranceAge) {
	        this.store.clear()
	        return
	      }
	    }
	
	    // 加载额外的信息,verison/userdata必带，operation看配置需求
	    info.userdata = this.userdata.get()
	    info.version = this.config.settings.version
	    var cfg = this.config
	    if (cfg.action) {
	      Object.assign(info, {operation: this.store.all('act', true)})
	    }
	    if (cfg.dependence) {
	      Object.assign(info, {dependence: dependenceMointer.all()})
	    }
	    if (cfg.net) {
	      Object.assign(info, {net: this.store.all('net', true)})
	    }
	    // dev模式下，总是不压缩
	    if (false) {
	      info = lzString.compress(JSON.stringify(info))
	    }
	    this.store.clear()
	
	    if (true) {
	      var oriInfo = JSON.stringify(info)
	      var start = new Date()
	      var compressInfo = lzString.compress(oriInfo)
	      var spend = new Date() - start
	      console.log(info, oriInfo.length, compressInfo.length, spend)
	    }
	
	    this.dispatcher.sendError(info)
	    this.lastError = {
	      key:key,
	      time:info.time
	    }
	  },
	  /**
	   * 确保别让错误一直发，有时候会遇到错误一直发生的情况，这种情况下就别发了
	   */
	  throttle: function() {
	    this.reportCount++
	    if (this.reportCount > this.config.settings.maxReportCount) {
	      return true
	    }
	    return false
	  }
	}
	
	module.exports = tracker


/***/ }),
/* 9 */
/*!****************************!*\
  !*** ./src/environment.js ***!
  \****************************/
/***/ (function(module, exports) {

	/**
	 *
	 * @description 记录基本的浏览器版本、停留时间等信息
	 *
	 */
	
	var landOn = new Date() // 尽量早初始化这个函数，确保停留时间准确
	var environment = {
	  all: function() {
	    return {
	      vw: (document.documentElement ? document.documentElement.clientWidth : document.body.clientWidth),
	      vh: (document.documentElement ? document.documentElement.clientHeight : document.body.clientHeight),
	      // ua: navigator.userAgent,
	      age: new Date() - landOn
	    }
	  }
	}
	
	module.exports = environment


/***/ }),
/* 10 */
/*!***************************!*\
  !*** ./src/dependence.js ***!
  \***************************/
/***/ (function(module, exports, __webpack_require__) {

	/**
	 *
	 * @description 增加依赖检测
	 *
	 */
	
	var util = __webpack_require__(/*! ./util */ 2)
	
	function popLibVersion() {
	  var arr = [], v
	  var kvp = [
	    ['jQuery', 'jQuery.fn.jquery'],
	    ['jQuery ui', 'jQuery.ui.version'],
	    ['lodash(underscore)', '_.VERSION'],
	    ['Backbone', 'Backbone.VERSION'],
	    ['knockout', 'ko.version'],
	    ['Angular', 'angular.version.full'],
	    ['React', 'React.version'],
	    ['Vue', 'Vue.version'],
	    ['Ember', 'Ember.VERSION'],
	    ['Moment', 'moment.version'],
	    ['SeaJS', 'seajs.version']
	  ]
	
	  for (var i = 0; i < kvp.length; ++i) {
	    var version = util.globalObjValue(kvp[i][1])
	    if (version != null) {
	      arr.push([kvp[i][0], version])
	    }
	  }
	  return arr
	}
	
	module.exports = {
	  all: function() {
	    var result = []
	    var filter = 'jQuery _ Backbone ko angular React Vue Ember moment seajs'
	    for (var p in window) {
	      if (filter.indexOf(p) === -1) {
	        var version = null
	        var item = window[p]
	        try {
	          if (item) {
	            version = item.version || item.Version || item.VERSION
	          }
	          if (version) {
	            result.push([p, version])
	          }
	        }
	        catch(e) {}
	      }
	    }
	    return result.concat(popLibVersion())
	  }
	}


/***/ }),
/* 11 */
/*!********************************************************!*\
  !*** ./~/_lz-string@1.4.4@lz-string/libs/lz-string.js ***!
  \********************************************************/
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;// Copyright (c) 2013 Pieroxy <pieroxy@pieroxy.net>
	// This work is free. You can redistribute it and/or modify it
	// under the terms of the WTFPL, Version 2
	// For more information see LICENSE.txt or http://www.wtfpl.net/
	//
	// For more information, the home page:
	// http://pieroxy.net/blog/pages/lz-string/testing.html
	//
	// LZ-based compression algorithm, version 1.4.4
	var LZString = (function() {
	
	// private property
	var f = String.fromCharCode;
	var keyStrBase64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
	var keyStrUriSafe = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+-$";
	var baseReverseDic = {};
	
	function getBaseValue(alphabet, character) {
	  if (!baseReverseDic[alphabet]) {
	    baseReverseDic[alphabet] = {};
	    for (var i=0 ; i<alphabet.length ; i++) {
	      baseReverseDic[alphabet][alphabet.charAt(i)] = i;
	    }
	  }
	  return baseReverseDic[alphabet][character];
	}
	
	var LZString = {
	  compressToBase64 : function (input) {
	    if (input == null) return "";
	    var res = LZString._compress(input, 6, function(a){return keyStrBase64.charAt(a);});
	    switch (res.length % 4) { // To produce valid Base64
	    default: // When could this happen ?
	    case 0 : return res;
	    case 1 : return res+"===";
	    case 2 : return res+"==";
	    case 3 : return res+"=";
	    }
	  },
	
	  decompressFromBase64 : function (input) {
	    if (input == null) return "";
	    if (input == "") return null;
	    return LZString._decompress(input.length, 32, function(index) { return getBaseValue(keyStrBase64, input.charAt(index)); });
	  },
	
	  compressToUTF16 : function (input) {
	    if (input == null) return "";
	    return LZString._compress(input, 15, function(a){return f(a+32);}) + " ";
	  },
	
	  decompressFromUTF16: function (compressed) {
	    if (compressed == null) return "";
	    if (compressed == "") return null;
	    return LZString._decompress(compressed.length, 16384, function(index) { return compressed.charCodeAt(index) - 32; });
	  },
	
	  //compress into uint8array (UCS-2 big endian format)
	  compressToUint8Array: function (uncompressed) {
	    var compressed = LZString.compress(uncompressed);
	    var buf=new Uint8Array(compressed.length*2); // 2 bytes per character
	
	    for (var i=0, TotalLen=compressed.length; i<TotalLen; i++) {
	      var current_value = compressed.charCodeAt(i);
	      buf[i*2] = current_value >>> 8;
	      buf[i*2+1] = current_value % 256;
	    }
	    return buf;
	  },
	
	  //decompress from uint8array (UCS-2 big endian format)
	  decompressFromUint8Array:function (compressed) {
	    if (compressed===null || compressed===undefined){
	        return LZString.decompress(compressed);
	    } else {
	        var buf=new Array(compressed.length/2); // 2 bytes per character
	        for (var i=0, TotalLen=buf.length; i<TotalLen; i++) {
	          buf[i]=compressed[i*2]*256+compressed[i*2+1];
	        }
	
	        var result = [];
	        buf.forEach(function (c) {
	          result.push(f(c));
	        });
	        return LZString.decompress(result.join(''));
	
	    }
	
	  },
	
	
	  //compress into a string that is already URI encoded
	  compressToEncodedURIComponent: function (input) {
	    if (input == null) return "";
	    return LZString._compress(input, 6, function(a){return keyStrUriSafe.charAt(a);});
	  },
	
	  //decompress from an output of compressToEncodedURIComponent
	  decompressFromEncodedURIComponent:function (input) {
	    if (input == null) return "";
	    if (input == "") return null;
	    input = input.replace(/ /g, "+");
	    return LZString._decompress(input.length, 32, function(index) { return getBaseValue(keyStrUriSafe, input.charAt(index)); });
	  },
	
	  compress: function (uncompressed) {
	    return LZString._compress(uncompressed, 16, function(a){return f(a);});
	  },
	  _compress: function (uncompressed, bitsPerChar, getCharFromInt) {
	    if (uncompressed == null) return "";
	    var i, value,
	        context_dictionary= {},
	        context_dictionaryToCreate= {},
	        context_c="",
	        context_wc="",
	        context_w="",
	        context_enlargeIn= 2, // Compensate for the first entry which should not count
	        context_dictSize= 3,
	        context_numBits= 2,
	        context_data=[],
	        context_data_val=0,
	        context_data_position=0,
	        ii;
	
	    for (ii = 0; ii < uncompressed.length; ii += 1) {
	      context_c = uncompressed.charAt(ii);
	      if (!Object.prototype.hasOwnProperty.call(context_dictionary,context_c)) {
	        context_dictionary[context_c] = context_dictSize++;
	        context_dictionaryToCreate[context_c] = true;
	      }
	
	      context_wc = context_w + context_c;
	      if (Object.prototype.hasOwnProperty.call(context_dictionary,context_wc)) {
	        context_w = context_wc;
	      } else {
	        if (Object.prototype.hasOwnProperty.call(context_dictionaryToCreate,context_w)) {
	          if (context_w.charCodeAt(0)<256) {
	            for (i=0 ; i<context_numBits ; i++) {
	              context_data_val = (context_data_val << 1);
	              if (context_data_position == bitsPerChar-1) {
	                context_data_position = 0;
	                context_data.push(getCharFromInt(context_data_val));
	                context_data_val = 0;
	              } else {
	                context_data_position++;
	              }
	            }
	            value = context_w.charCodeAt(0);
	            for (i=0 ; i<8 ; i++) {
	              context_data_val = (context_data_val << 1) | (value&1);
	              if (context_data_position == bitsPerChar-1) {
	                context_data_position = 0;
	                context_data.push(getCharFromInt(context_data_val));
	                context_data_val = 0;
	              } else {
	                context_data_position++;
	              }
	              value = value >> 1;
	            }
	          } else {
	            value = 1;
	            for (i=0 ; i<context_numBits ; i++) {
	              context_data_val = (context_data_val << 1) | value;
	              if (context_data_position ==bitsPerChar-1) {
	                context_data_position = 0;
	                context_data.push(getCharFromInt(context_data_val));
	                context_data_val = 0;
	              } else {
	                context_data_position++;
	              }
	              value = 0;
	            }
	            value = context_w.charCodeAt(0);
	            for (i=0 ; i<16 ; i++) {
	              context_data_val = (context_data_val << 1) | (value&1);
	              if (context_data_position == bitsPerChar-1) {
	                context_data_position = 0;
	                context_data.push(getCharFromInt(context_data_val));
	                context_data_val = 0;
	              } else {
	                context_data_position++;
	              }
	              value = value >> 1;
	            }
	          }
	          context_enlargeIn--;
	          if (context_enlargeIn == 0) {
	            context_enlargeIn = Math.pow(2, context_numBits);
	            context_numBits++;
	          }
	          delete context_dictionaryToCreate[context_w];
	        } else {
	          value = context_dictionary[context_w];
	          for (i=0 ; i<context_numBits ; i++) {
	            context_data_val = (context_data_val << 1) | (value&1);
	            if (context_data_position == bitsPerChar-1) {
	              context_data_position = 0;
	              context_data.push(getCharFromInt(context_data_val));
	              context_data_val = 0;
	            } else {
	              context_data_position++;
	            }
	            value = value >> 1;
	          }
	
	
	        }
	        context_enlargeIn--;
	        if (context_enlargeIn == 0) {
	          context_enlargeIn = Math.pow(2, context_numBits);
	          context_numBits++;
	        }
	        // Add wc to the dictionary.
	        context_dictionary[context_wc] = context_dictSize++;
	        context_w = String(context_c);
	      }
	    }
	
	    // Output the code for w.
	    if (context_w !== "") {
	      if (Object.prototype.hasOwnProperty.call(context_dictionaryToCreate,context_w)) {
	        if (context_w.charCodeAt(0)<256) {
	          for (i=0 ; i<context_numBits ; i++) {
	            context_data_val = (context_data_val << 1);
	            if (context_data_position == bitsPerChar-1) {
	              context_data_position = 0;
	              context_data.push(getCharFromInt(context_data_val));
	              context_data_val = 0;
	            } else {
	              context_data_position++;
	            }
	          }
	          value = context_w.charCodeAt(0);
	          for (i=0 ; i<8 ; i++) {
	            context_data_val = (context_data_val << 1) | (value&1);
	            if (context_data_position == bitsPerChar-1) {
	              context_data_position = 0;
	              context_data.push(getCharFromInt(context_data_val));
	              context_data_val = 0;
	            } else {
	              context_data_position++;
	            }
	            value = value >> 1;
	          }
	        } else {
	          value = 1;
	          for (i=0 ; i<context_numBits ; i++) {
	            context_data_val = (context_data_val << 1) | value;
	            if (context_data_position == bitsPerChar-1) {
	              context_data_position = 0;
	              context_data.push(getCharFromInt(context_data_val));
	              context_data_val = 0;
	            } else {
	              context_data_position++;
	            }
	            value = 0;
	          }
	          value = context_w.charCodeAt(0);
	          for (i=0 ; i<16 ; i++) {
	            context_data_val = (context_data_val << 1) | (value&1);
	            if (context_data_position == bitsPerChar-1) {
	              context_data_position = 0;
	              context_data.push(getCharFromInt(context_data_val));
	              context_data_val = 0;
	            } else {
	              context_data_position++;
	            }
	            value = value >> 1;
	          }
	        }
	        context_enlargeIn--;
	        if (context_enlargeIn == 0) {
	          context_enlargeIn = Math.pow(2, context_numBits);
	          context_numBits++;
	        }
	        delete context_dictionaryToCreate[context_w];
	      } else {
	        value = context_dictionary[context_w];
	        for (i=0 ; i<context_numBits ; i++) {
	          context_data_val = (context_data_val << 1) | (value&1);
	          if (context_data_position == bitsPerChar-1) {
	            context_data_position = 0;
	            context_data.push(getCharFromInt(context_data_val));
	            context_data_val = 0;
	          } else {
	            context_data_position++;
	          }
	          value = value >> 1;
	        }
	
	
	      }
	      context_enlargeIn--;
	      if (context_enlargeIn == 0) {
	        context_enlargeIn = Math.pow(2, context_numBits);
	        context_numBits++;
	      }
	    }
	
	    // Mark the end of the stream
	    value = 2;
	    for (i=0 ; i<context_numBits ; i++) {
	      context_data_val = (context_data_val << 1) | (value&1);
	      if (context_data_position == bitsPerChar-1) {
	        context_data_position = 0;
	        context_data.push(getCharFromInt(context_data_val));
	        context_data_val = 0;
	      } else {
	        context_data_position++;
	      }
	      value = value >> 1;
	    }
	
	    // Flush the last char
	    while (true) {
	      context_data_val = (context_data_val << 1);
	      if (context_data_position == bitsPerChar-1) {
	        context_data.push(getCharFromInt(context_data_val));
	        break;
	      }
	      else context_data_position++;
	    }
	    return context_data.join('');
	  },
	
	  decompress: function (compressed) {
	    if (compressed == null) return "";
	    if (compressed == "") return null;
	    return LZString._decompress(compressed.length, 32768, function(index) { return compressed.charCodeAt(index); });
	  },
	
	  _decompress: function (length, resetValue, getNextValue) {
	    var dictionary = [],
	        next,
	        enlargeIn = 4,
	        dictSize = 4,
	        numBits = 3,
	        entry = "",
	        result = [],
	        i,
	        w,
	        bits, resb, maxpower, power,
	        c,
	        data = {val:getNextValue(0), position:resetValue, index:1};
	
	    for (i = 0; i < 3; i += 1) {
	      dictionary[i] = i;
	    }
	
	    bits = 0;
	    maxpower = Math.pow(2,2);
	    power=1;
	    while (power!=maxpower) {
	      resb = data.val & data.position;
	      data.position >>= 1;
	      if (data.position == 0) {
	        data.position = resetValue;
	        data.val = getNextValue(data.index++);
	      }
	      bits |= (resb>0 ? 1 : 0) * power;
	      power <<= 1;
	    }
	
	    switch (next = bits) {
	      case 0:
	          bits = 0;
	          maxpower = Math.pow(2,8);
	          power=1;
	          while (power!=maxpower) {
	            resb = data.val & data.position;
	            data.position >>= 1;
	            if (data.position == 0) {
	              data.position = resetValue;
	              data.val = getNextValue(data.index++);
	            }
	            bits |= (resb>0 ? 1 : 0) * power;
	            power <<= 1;
	          }
	        c = f(bits);
	        break;
	      case 1:
	          bits = 0;
	          maxpower = Math.pow(2,16);
	          power=1;
	          while (power!=maxpower) {
	            resb = data.val & data.position;
	            data.position >>= 1;
	            if (data.position == 0) {
	              data.position = resetValue;
	              data.val = getNextValue(data.index++);
	            }
	            bits |= (resb>0 ? 1 : 0) * power;
	            power <<= 1;
	          }
	        c = f(bits);
	        break;
	      case 2:
	        return "";
	    }
	    dictionary[3] = c;
	    w = c;
	    result.push(c);
	    while (true) {
	      if (data.index > length) {
	        return "";
	      }
	
	      bits = 0;
	      maxpower = Math.pow(2,numBits);
	      power=1;
	      while (power!=maxpower) {
	        resb = data.val & data.position;
	        data.position >>= 1;
	        if (data.position == 0) {
	          data.position = resetValue;
	          data.val = getNextValue(data.index++);
	        }
	        bits |= (resb>0 ? 1 : 0) * power;
	        power <<= 1;
	      }
	
	      switch (c = bits) {
	        case 0:
	          bits = 0;
	          maxpower = Math.pow(2,8);
	          power=1;
	          while (power!=maxpower) {
	            resb = data.val & data.position;
	            data.position >>= 1;
	            if (data.position == 0) {
	              data.position = resetValue;
	              data.val = getNextValue(data.index++);
	            }
	            bits |= (resb>0 ? 1 : 0) * power;
	            power <<= 1;
	          }
	
	          dictionary[dictSize++] = f(bits);
	          c = dictSize-1;
	          enlargeIn--;
	          break;
	        case 1:
	          bits = 0;
	          maxpower = Math.pow(2,16);
	          power=1;
	          while (power!=maxpower) {
	            resb = data.val & data.position;
	            data.position >>= 1;
	            if (data.position == 0) {
	              data.position = resetValue;
	              data.val = getNextValue(data.index++);
	            }
	            bits |= (resb>0 ? 1 : 0) * power;
	            power <<= 1;
	          }
	          dictionary[dictSize++] = f(bits);
	          c = dictSize-1;
	          enlargeIn--;
	          break;
	        case 2:
	          return result.join('');
	      }
	
	      if (enlargeIn == 0) {
	        enlargeIn = Math.pow(2, numBits);
	        numBits++;
	      }
	
	      if (dictionary[c]) {
	        entry = dictionary[c];
	      } else {
	        if (c === dictSize) {
	          entry = w + w.charAt(0);
	        } else {
	          return null;
	        }
	      }
	      result.push(entry);
	
	      // Add w+entry[0] to the dictionary.
	      dictionary[dictSize++] = w + entry.charAt(0);
	      enlargeIn--;
	
	      w = entry;
	
	      if (enlargeIn == 0) {
	        enlargeIn = Math.pow(2, numBits);
	        numBits++;
	      }
	
	    }
	  }
	};
	  return LZString;
	})();
	
	if (true) {
	  !(__WEBPACK_AMD_DEFINE_RESULT__ = function () { return LZString; }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else if( typeof module !== 'undefined' && module != null ) {
	  module.exports = LZString
	}


/***/ }),
/* 12 */
/*!*********************************!*\
  !*** ./src/legacyDispatcher.js ***!
  \*********************************/
/***/ (function(module, exports, __webpack_require__) {

	/**
	 *
	 * @description 针对不支持ajax 跨域提交的dispatcher
	 *
	 */
	
	var util = __webpack_require__(/*! ./util */ 2)
	var dispatcher = __webpack_require__(/*! ./dispatcher */ 7)
	
	function object(o) {
	  var F = function () {}
	  F.prototype = o
	  return new F()
	}
	
	function LegacyDispacther(config) {
	  dispatcher.call(this, config)
	}
	LegacyDispacther.prototype = object(dispatcher.prototype)
	LegacyDispacther.prototype.constructor = LegacyDispacther
	
	
	var queue = []
	function autoSend(url, method) {
	  if (!!document.body) {
	    var item
	    while (item = queue.shift()) {
	      iframePost(url, method, item)
	    }
	  }
	  else {
	    setTimeout(util.bind(autoSend, null, url, method), 20)
	  }
	}
	
	function iframePost(url, method, data) {
	  var iframe = document.createElement('iframe')
	  iframe.name = 'framePost-' + util.guid()
	  iframe.style.display = 'none'
	  document.body.appendChild(iframe)
	  iframe.contentWindow.name = iframe.name
	
	  var form = document.createElement('form')
	  form.enctype = 'application/x-www-form-urlencoded'
	  form.action = url
	  form.method = method
	  form.target = iframe.name
	  var input = document.createElement('input')
	  input.name = 'info'
	  input.type = 'hidden'
	  if (util.isString(data)) {
	    input.value = data
	  }
	  else {
	    input.value = JSON.stringify(data)
	  }
	  form.appendChild(input)
	  document.body.appendChild(form)
	
	  iframe.attachEvent('onload', function() {
	    iframe.detachEvent('onload', arguments.callee)
	    document.body.removeChild(form)//todo 这里会有leak么？
	    form = null
	    document.body.removeChild(iframe)
	    iframe = null
	  })
	
	  form.submit()
	}
	
	LegacyDispacther.prototype.sendError = function(info) {
	  var endPoint = this.endPoint(this.config.token)
	  queue.push(info)
	  autoSend(endPoint, 'post')
	}
	
	module.exports = LegacyDispacther


/***/ }),
/* 13 */
/*!***********************!*\
  !*** ./src/action.js ***!
  \***********************/
/***/ (function(module, exports, __webpack_require__) {

	/**
	 *
	 * @description 记录页面上用户的操作信息
	 *
	 */
	var util = __webpack_require__(/*! ./util */ 2)
	
	function action(config, store) {
	  this.data = []
	  this.store = store
	  if (config.action) {
	    this.needRecordClickSelectors = ['a', 'button', 'input[button]', 'input[submit]', 'input[radio]', 'input[checkbox]']
	    this.needRecordChangeSelectors = ['input[text]', 'input[password]', 'textarea', 'select']
	    this.init()
	  }
	}
	
	action.prototype = {
	  init: function() {
	    var clickHandler = util.bind(this.eventHandler, this, 'click', this.needRecordClickSelectors)
	    var inputHandler = util.bind(this.eventHandler, this, 'input', this.needRecordChangeSelectors)
	    if (window.addEventListener) {
	      document.addEventListener('click', clickHandler, true) // 标准浏览器在捕获阶段触发
	      document.addEventListener('blur', inputHandler, true)
	    }
	    else if (window.attachEvent) {
	      document.attachEvent('onclick', clickHandler)
	      document.attachEvent('onfocusout', inputHandler) // document内部有元素发生blur就会触发
	    }
	  },
	  /**
	   * 页面点击或者时区焦点时触发，该函数绑定了动作
	   * @param  {String} action 'click' or 'input'
	   * @param {String} selectorFilter 要过滤的标签类型
	   * @param  {Event} evt    事件对象
	   */
	  eventHandler: function(action, selectorFilter, evt) {
	    var target = evt.target || evt.srcElement
	    if (target == document || target == window || target == document.documentElement || target == document.body) {
	      return
	    }
	    var tag = target.tagName.toLowerCase()
	    if (this.accept(target, selectorFilter)) {
	      this.record(target, tag, action)
	    }
	  },
	  /**
	   * 查看某个元素是否在要监控的元素类型列表中
	   * @param  {HTMLElement} element  要检测的元素
	   * @param  {String} selector      元素列表字符串
	   * @return {Boolean}              检测结果
	   */
	  accept: function(element, selector) {
	    var tag = element.tagName.toLowerCase()
	    if (tag === 'input' && element.type) {
	      tag += '[' + element.type + ']'
	    }
	    return util.indexOf(selector, tag) > -1
	  },
	
	  /**
	   * 返回一个元素对应的attributes
	   * @param  {HTMLElement} element 要获取元素的属性
	   * @return {Object}         key-value形式的对象
	   */
	  attributes: function(element) {
	    var result = {}
	    var attributes = element.attributes
	    // 在ie6-7下面，会获取到很多内置的attribute，使用specified属性来区分，在版本浏览器下，都会输出正确的属性，同时specified也是true。不保存非checkbox、radio的value属性的信息
	    var len = attributes.length
	    for (var i = 0; i < len; ++i) {
	      var item = attributes[i]
	      if (item.specified) {
	        if (item.name == 'value' && this.accept(element, ['textarea', 'input[text]', 'input[password]'])) {
	          continue
	        }
	        result[item.name] = item.value
	      }
	    }
	    return result
	  },
	
	  /**
	   * 根据不同的元素，记录不同的内容，input[password]不记录value，input[text]和textarea只记录文本长度，input[checkbox]、input[radio]需要记录value和checked属性，select记录选中的value和index
	   * @param  {HTMLElement} target
	   * @param  {String} lowercaseTagName 小写的标签tag
	   * @param  {String} action           动作标示，'click','input'
	   * @return {String}                  成功返回这个log的guid
	   */
	  record: function (element, lowercaseTagName, action) {
	    var attributes = this.attributes(element)
	    var log = {
	      tag: lowercaseTagName,
	      action: action,
	      time: util.isoDate(),
	      attribute: attributes,
	      extra: {}
	    }
	    if (lowercaseTagName === 'input') {
	      switch (element.type) {
	        case 'text':
	          log.extra.length = element.value.length
	          break
	        case 'checkbox':
	        case 'radio':
	          log.extra.checked = element.checked
	          break
	      }
	    }
	    else if (lowercaseTagName === 'textarea') {
	      log.extra.length = element.value.length
	    }
	    else if (lowercaseTagName === 'select') {
	      log.extra.selectedIndex = element.selectedIndex
	      log.extra.value = element.value
	    }
	    return this.store.add(log, 'act')
	  }
	}
	
	module.exports = action


/***/ }),
/* 14 */
/*!***********************!*\
  !*** ./src/window.js ***!
  \***********************/
/***/ (function(module, exports, __webpack_require__) {

	/**
	 *
	 * @description window.onerror上绑定异常监控
	 *
	 */
	var util = __webpack_require__(/*! ./util */ 2)
	/**
	 * 负责绑定window上的全局错误，对于无法处理的异常会自动捕获，但是要注意[跨域问题](http://blog.bugsnag.com/script-error)。
	 * @param  {Object} tracker 错误采集对象
	 */
	function errorBinder(tracker) {
	  // 不使用addEventListener，保证兼容性，但是要确保之前绑定的onerror事件可以正常运行。
	  var oldOnError = window.onerror
	  var slice = Array.prototype.slice
	  window.onerror = function(message, file, line, column, innerError) {
	    // 后4个参数，在跨域异常的时候，会有不同的数据。
	    // file       在ie系列下面永远有数据，chrome非cors没有数据，ff都有
	    // line       非cors都没有，但是ie通过window.event可以获取
	    // column     ie没有这个参数，其他同上
	    // innerRrror ie下没有，chrome只有.name .message .stack三个属性，ff下还包含.fileName .lineNumber .columnNumber额外三个属性，跨域策略同上
	    var args = slice.call(arguments)
	    if (oldOnError) {
	      oldOnError.apply(window, args)
	    }
	    // var stack = [];
	    // var f = arguments.callee.caller;
	    // while (f) {
	    //     stack.push(f.name);
	    //     f = f.caller;
	    // }
	    // console.log(message, "from", stack);
	    var error = flatError.apply(window, args)
	    // 如果这个错误只有'Script error.'，连file信息都没有，视为无用信息，抛弃
	    if (error.message.indexOf('Script error') > -1 && error.file === null) {
	      return false
	    }
	    tracker['catch'](error, 'window')
	    return false // 确保控制台可以显示错误
	  }
	}
	
	/**
	 * 抹平不同浏览器下面全局报错的属性值，尽可能多的提供错误信息
	 * @param  {[type]} message    错误信息
	 * @param  {[type]} file       错误发生的文件路径
	 * @param  {[type]} line       行号
	 * @param  {[type]} column     列号
	 * @param  {[type]} innerError 对应的错误
	 * @return {[type]}            抹平后的错误数据对象
	 */
	function flatError(message, file, line, column, innerError) {
	  // ie10-全部通过window.event获取 todo ie10+需要验证是否和ie10-一样
	  var stack = null
	  
	  if (util.isIE()) {
	    var evt = window.event
	    message = message || evt.errorMessage
	    file = file || evt.errorUrl
	    line = line || evt.errorLine
	    column = column || evt.errorCharacter
	  }
	  else {
	    file = file || (innerError && innerError.fileName) || null
	    line = line || (innerError && innerError.lineNumber) || null
	    column = column || (innerError && innerError.columnNumber) || null
	    stack = (innerError && innerError.stack) || null
	  }
	  console.log('&&&&&&&&&&^^^^^^^^^^^')
	  console.log({
	    message: message,
	    file: file,
	    line: line,
	    column: column,
	    stack: stack
	  })
	  return {
	    message: message,
	    file: file,
	    line: line,
	    column: column,
	    stack: stack
	  }
	}
	
	var output = {
	  monitor: errorBinder
	}
	
	module.exports = output


/***/ })
/******/ ]);