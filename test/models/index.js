const Sequelize = require('sequelize');
const sequelize = require('../utils/db');
const User = require('./user');
const Internship = require('./internship');
const Procedure = require('./procedure');
const File = require('./file');

module.exports = { sequelize, User, Internship, Procedure, File };
