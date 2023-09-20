const dbConfig = require("../config/db.config.js");

const SalesActivity = require("./salesactivity.model.js");
const FavoriteFilter = require("./favoritefilter.model.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: 0,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// sales-activity  table
db.SalesActivity = SalesActivity(sequelize, Sequelize);
// sales-activity  table
db.FavoriteFilter = FavoriteFilter(sequelize, Sequelize);

////////////////////////////////////////////////////////////////

module.exports = db;
