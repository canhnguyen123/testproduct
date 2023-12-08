const jwt = require('jsonwebtoken');
const checkToken = (req, res, next) => {
    const token = req.headers.authorization || req.query.token;
        if (!token) {
        console.log('Unauthorized: Token is missing');
        return res.json({ status: 'fail', mess: 'Không có quyền truy cập' });    }

    try {
        const decoded = jwt.verify(token, 'canh123az');
        req.user_id = decoded.user_id;
        next();
    } catch (error) {
        console.log('Unauthorized: Invalid token', error);
        return res.json({ status: 'fail', mess: 'Không có quyền truy cập' });
    }
};

module.exports = checkToken;
