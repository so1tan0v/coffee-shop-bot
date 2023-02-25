const {Sequelize} = require('sequelize');
const {dbConnection} = require('../config/static');

module.exports = new Sequelize(
    dbConnection.db,
    dbConnection.dbUser,
    dbConnection.dbPassword,
    dbConnection.dbHostParam
)
