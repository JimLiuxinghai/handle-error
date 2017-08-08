import { query } from './db';
const insert = async (data) => {
	let sql = [`
	    insert into error
	    (
	        time,
	        url,
	        filename,
	        fnname,
	        line,
	        errmsg,
	        ua,
	        user,
	        project,
	        stack,
	        type
	    )
	    values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
	`];
	let config = [data.time, data.url, data.filename, data.fnname, data.line, data.errmsg, data.ua, data.user, data.project, data.stack, data.type];
	sql = sql.join(' ');
	return query(sql, config);
}
module.exports = {
	insert: insert
}