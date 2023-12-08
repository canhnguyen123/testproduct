const connection = require('../config/config');
exports.add=(callback,data)=>{
    connection.query('INSERT INTO tbl_product SET  ?',[data], (error, results) => {
        if (error) {
            console.error('Lỗi truy vấn cơ sở dữ liệu: ' + error.stack);
            return callback(error, null);
        }

        return callback(null, results);
    })
}
exports.update=(callback,data,product_id)=>{
    connection.query('UPDATE tbl_product SET ? where product_id = ?',[data,product_id], (error, results) => {
        if (error) {
            console.error('Lỗi truy vấn cơ sở dữ liệu: ' + error.stack);
            return callback(error, null);
        }

        return callback(null, results);
    })
}
exports.delete=(callback,product_id)=>{
    connection.query('DELETE FROM tbl_product  where product_id = ?',[product_id], (error, results) => {
        if (error) {
            console.error('Lỗi truy vấn cơ sở dữ liệu: ' + error.stack);
            return callback(error, null);
        }

        return callback(null, results);
    })
}
exports.list=(callback)=>{
    connection.query('SELECT * FROM tbl_product ORDER BY product_id DESC ', (error, results) => {
        if (error) {
            console.error('Lỗi truy vấn cơ sở dữ liệu: ' + error.stack);
            return callback(error, null);
        }

        return callback(null, results);
    })
}