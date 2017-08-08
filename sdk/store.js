function callByArgs( func, args, global ) {
    return func.apply( global, args );
}
let store = {
	getKey: (errObi) => {
		 let isValid = ( errorObj ) => {
            return errorObj[ name ];
        };
        return [ 'msg', 'colNum', 'rowNum' ].filter( isValid ).map( isValid ).join( '@' );
	},
	//获取localStorage内容体
    setInfo: function ( key, errorObj, validTime, max ) {
        let source = storage.getItem( key );
        if ( errorObj ) {
            let name = storage.getKey( errorObj );
            source = this.limitError( source, max );
            source[ name ] = {
                expiresTime: storage.getEpires( validTime ),
                value: errorObj.msg,
            };
        }
        return utils.stringify( source );
    },
	//检查是否有效
    deleteExpiresItem: ( data ) => {
        let oData = data ? utils.parse( data ) : {};

        let date = +new Date();
        for ( let key in oData ) {
            if ( oData[ key ].expiresTime <= date ) {
                delete oData[ key ];
            }
        }
        return oData;
    },
	//设置失效时间
    getEpires: ( validTime ) => {
        return +new Date() + ( 1000 * 60 * 60 * 24 * validTime );
    },
    //获取storage
    getItem: (key) => {
    	store.deleteExpiresItem(localStorage.getItem(key));
    },
    //删除storage
    clear:  (key) => {
    	return key ? localStorage.removeItem( key ) : localStorage.clear();
    },
	setItem: (...args) => {
		 localStorage.setItem( args[ 0 ], callByArgs( storage.setInfo, args, storage ) );
	}
}
let Localstroage = ( supperclass ) => class extends supperclass {
    constructor( options ) {
        super( options );
        this.setItem();
    }
    //得到元素值 获取元素值 若不存在则返回''
    getItem( key ) {
        return storage.getItem( key );
    }
    // 设置一条localstorage
    setItem( errorObj ) {
        let _config = this.config;
        storage.setItem( this.config.errorLSSign, errorObj, _config.validTime, _config.maxErrorCookieNo );
        return utils.stringify( errorObj );
    }

    //清除ls 不传参数全部清空  传参之清当前ls
    clear( key ) {
        storage.clear( key );
    }
};

export default Localstroage;