const connection = require('../config/config');

exports.createUser = (user, callback) => {
    connection.query('INSERT INTO tbl_user SET ?', user, (error, results) => {
        if (error) {
            console.error('Lỗi truy vấn cơ sở dữ liệu: ' + error.stack);
            return callback(error, null);
        }

        return callback(null, results);
    });
};
exports.createUserAccount = (user, callback) => {
    // Thêm dữ liệu vào cơ sở dữ liệu
    connection.query('INSERT INTO tbl_user SET ?', user, (error, results) => {
        if (error) {
            console.error('Lỗi truy vấn cơ sở dữ liệu: ' + error.stack);
            return callback(error, null);
        }
        const insertedUserId = results.insertId;

        return callback(null, insertedUserId);
    });
};

exports.checkEmail = (userName, callback) => {
    connection.query('SELECT * FROM tbl_user WHERE user_username = ?', userName, (error, results) => {
        if (error) {
            console.error('Lỗi truy vấn cơ sở dữ liệu: ' + error.stack);
            return callback(error, null);
        }

        return callback(null, results);
    });
};
exports.checkAccount = (check_userId, callback) => {
    connection.query('SELECT * FROM tbl_user WHERE check_userId = ?', [check_userId], (error, results) => {
        if (error) {
            console.error('Lỗi truy vấn cơ sở dữ liệu: ' + error.stack);
            return callback(error, null);
        }

        return callback(null, results);
    });
};


// exports.checkPass = (userName, password, callback) => {
//     connection.query('SELECT * FROM tbl_user WHERE user_username = ? AND user_password = ?', [userName, password], (error, results) => {
//         if (error) {
//             console.error('Lỗi truy vấn cơ sở dữ liệu: ' + error.stack);
//             return callback(error, null);
//         }

//         return callback(null, results);
//     });
// };
exports.checkUserExistence = (callback, user_id) => {
    connection.query('SELECT COUNT(*) as userCount FROM tbl_user WHERE user_id = ?', [user_id], (error, results) => {
        if (error) {
            console.error('Lỗi truy vấn cơ sở dữ liệu: ' + error.stack);
            return callback(error, null);
        }

        const userCount = results[0].userCount;
        return callback(null, userCount > 0);
    });
};

exports.checkUserId = (callback, user_id) => {
    connection.query('SELECT COUNT(*) as userCount FROM tbl_user WHERE user_id = ?', [user_id], (error, results) => {
      if (error) {
        console.error('Lỗi truy vấn cơ sở dữ liệu: ' + error.stack);
        return callback(error, null);
      }
  
      const userCount = results[0].userCount;
      return callback(null, userCount > 0);
    });
};

