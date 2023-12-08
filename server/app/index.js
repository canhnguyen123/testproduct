const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const product = require('./router/productRouter');
const user = require('./router/userRouter');
const app = express();
app.use(cors());
app.use(express.json());

app.use('/product', product);
app.use('/user', user);
app.listen(4000, () => {
  console.log('Server đang lắng nghe tại cổng 4000');
});
