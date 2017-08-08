import utils from "./utils";

let Report = (supperclass) => class extends supperclass {
	constructor(options) {
		super( options );
        this.errorQueue = [];
        this.repeatList = {};
        this.url = this.config.url;
        [ 'warn', 'error' ].forEach( ( type, index ) => {
            this[ type ] = ( msg ) => {
                return this.handleMsg( msg, type, index );
            };
        });
	}
	//重复错误不收集
	repeat( error ) {
        let rowNum = error.rowNum || '';
        let colNum = error.colNum || '';
        let repeatName = error.msg + rowNum + colNum;
        this.repeatList[ repeatName ] = this.repeatList[ repeatName ] ? this.repeatList[ repeatName ] + 1 : 1;
        return this.repeatList[ repeatName ] > this.config.repeat;
    }
	//收集错误到错误池
	catchError (err) {
		if(this.repeat) {
			return false;
		}
		this.errorQueue.push(err);
	}
	//手动上报
	handleMs (msg, type, level) {
		let errorMsg = {
		    msg: msg,
		    level: level
		};
		errorMsg = utils.assignObject( utils.getSystemParams(), errorMsg );
		if ( this.catchError( errorMsg ) ) {
		    this.send();
		}
		return errorMsg;
	}
}