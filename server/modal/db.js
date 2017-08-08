import mysql from 'mysql'
import config from '../config/config'
const dbConfig = config.dbConfig

const pool = mysql.createPool({
  host     :  dbConfig.host,
  user     :  dbConfig.user,
  password :  dbConfig.password,
  database :  dbConfig.database
})

const query = function( sql, values ) {

  return new Promise(( resolve, reject ) => {
    pool.getConnection(function(err, connection) {
      if (err) {
        console.log( err )
        resolve( err )
      } else {
        connection.query(sql, values, ( err, rows) => {
          if ( err ) {
            console.log( err )
            reject( err )
          } else {
            console.log(sql)
            console.log(values)
            resolve( rows )
          }
          connection.release()
        })
      }
    })
  })

}


module.exports = {
  query
}