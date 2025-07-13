const Sequelize = require("sequelize");
const sequelize = require("../config/db");

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// ✅ Important
db.User = require("./user.model")(sequelize, Sequelize);

module.exports = db;
