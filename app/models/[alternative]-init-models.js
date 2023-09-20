const DataTypes = require("sequelize").DataTypes;
const _do_sales = require("./[alternative]_do_sales");
const dbConfig = require("../config/db.config")


function initModels(sequelize) {
  const do_sales = _do_sales(sequelize, DataTypes);


  return {
    do_sales,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
