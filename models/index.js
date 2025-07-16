const Sequelize = require("sequelize");
const sequelize = require("../config/db");

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// ✅ Important
db.User = require("./user.model")(sequelize, Sequelize);
db.Category = require("./category.model")(sequelize, Sequelize);
db.Product = require("./product.model")(sequelize, Sequelize);

// Associations
db.Category.hasMany(db.Product, { onDelete: "CASCADE" });
db.Product.belongsTo(db.Category);
module.exports = db;
