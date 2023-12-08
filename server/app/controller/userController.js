const { response } = require('express');
const userModel = require('../model/userModel');
const secretKey = 'canh123az'; // Thay thế 'your_secret_key' bằng khóa bí mật thực tế của bạn
const tokenExpiration = '1d'; // Ví dụ: token hết hạn trong 1 ngày
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.login = (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    userModel.checkEmail(username, (error, results) => {
        if (error) {
            console.error('Error checking email:', error);
            return res.status(500).json({ error: 'Database query error' });
        }

        if (results.length === 0) {
            return res.json({ status: 'fail', mess: 'Sai Tài khoản' });
        } else {
            const user_id = results[0].id;
            const storedHashedPassword = results[0].user_password;
            const token = jwt.sign({ user_id }, secretKey, { expiresIn: tokenExpiration });
            bcrypt.compare(password, storedHashedPassword, (err, result) => {
                if (err) {
                    return res.status(500).json({ error: 'Lỗi so sánh mật khẩu' });
                }

                if (result) {
                        const refreshToken = generateRefreshToken();
                        storeRefreshToken(refreshToken, user_id);
                        res.cookie('refreshToken', refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000 }); // Thời gian sống 30 ngày
                

                    return res.json({ status: 'success', mess: 'Đăng nhập thành công', user_id: user_id, token: token });
                } else {
                    return res.json({ status: 'fail', mess: 'Sai mật khẩu' });
                }
            });
        }
    });
};

function generateRefreshToken() {
    return 'refresh_token_example';
}

// Hàm lưu trữ refresh token an toàn ở phía máy chủ
function storeRefreshToken(refreshToken, user_id) {
    // Lưu trữ refreshToken ở đây
}


exports.register=(req,res)=>{
    const userName = req.body.username;
    const fullName = req.body.fullName;
    const password = req.body.password;
   
    userModel.checkEmail(userName, (error, results) => {
        if (error) {
            return res.status(500).json({ error: 'Database query error' });
        }

        if (results.length > 0) {
            return res.json({ status: 'fail', mess: 'Email này đã có mời nhập lại' });
        }
        bcrypt.hash(password, 10, (error, hashedPassword) => {
            if (error) {
                return res.status(500).json({ error: 'Error hashing password' });
            }

            const data = {
                user_username: userName,
                user_fullname: fullName,
                user_password: hashedPassword,
            };
            userModel.createUser(data, (error, results) => {
                if (error) {
                    return res.status(500).json({ error: 'Database query error' });
                }

                return res.json({ status: 'success', mess: 'Tạo tài khoản thành công' });
            });
        });
    });
}
