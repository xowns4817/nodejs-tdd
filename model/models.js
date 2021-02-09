const Sequelize = require('sequelize');
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './db.sqlite',
    logging: false // default는 console.log와 binding됨
});

const User = sequelize.define('User', {
    name: {
        type: Sequelize.STRING,
        unique: true
    }
});

module.exports = {Sequelize, sequelize, User};