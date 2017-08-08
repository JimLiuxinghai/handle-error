import axios from 'axios';
const utils = {
	assignObject: function ( obj1, obj2 ) {
	    for ( let name in obj2 ) {
	        if ( obj2.hasOwnProperty( name ) ) {
	            obj1[ name ] = obj2[ name ];
	        }
	    }
	    return obj1;
	},
	postMsg: function(url, config = {}) {
		return axios.post(url, config);
	},
	parse: function ( str ) {
        return window.JSON && window.JSON.parse ? JSON.parse( str ) : new Function( 'return ' + str )();
    },
    getSystemParams: function () {
        let scr = window.screen;
        return {
            userAgent: utils.getUserAgent(),
            currentUrl: window.location.href,
            timestamp: +new Date() + Math.random(),
            projectType: utils.getPlatType(),
            flashVer: utils.flashVer(),
            title: document.title,
            screenSize: scr.width + "x" + scr.height,
            referer: location.hostname ? location.hostname : '',
            host: window.location.protocol + '//' + window.location.hostname
        };
    },
    //空回调
    noop: function () {}
}

export default utils;