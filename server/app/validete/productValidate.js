const { body, validationResult } = require('express-validator');

exports.validate = (req, res, next) => {
    const validations = [
        body('nameproduct').trim().notEmpty().withMessage('Tên sản phẩm không được bỏ trống'),
        body('img').trim().notEmpty().withMessage('Ảnh sản phẩm không được bỏ trống'),
        body('price')
        .trim()
        .notEmpty().withMessage('Giá sản phẩm không được bỏ trống')
        .custom(value => {
            // Kiểm tra xem giá trị là số nguyên dương
            if (!isInt(value, { min: 0 })) {
                throw new Error('Giá sản phẩm phải là số nguyên dương');
            }
            return true;
        }),
        body('describe').trim().notEmpty().withMessage('Mô tả sản phẩm không được bỏ trống'),
    ];

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.json({ status: "errorValidate", errors: errors.array() });
    }
    next();
};
