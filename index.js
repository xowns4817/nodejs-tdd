const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const userRouter = require('./api/user/index');
const env = process.env.NODE_ENV || 'test';

if(env !== 'test') { // test 환경이 아닐때만 서버로그를 찍음
    app.use(morgan('dev'));
}
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/users', userRouter);

app.listen(3000, function( ){
    console.log('server on !');
});

 module.exports = app;