const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('favorite_filter', {
    n_id: {
      autoIncrement: true,
      autoIncrementIdentity: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    c_module_name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    c_filter_name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    j_filter_scheme: {
      type: DataTypes.JSONB,
      allowNull: true
    },
    d_created_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    d_updated_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    c_created_by: {
      type: DataTypes.STRING,
      allowNull: true
    },
    c_updated_by: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'favorite_filter',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "favorite_filter_pkey",
        unique: true,
        fields: [
          { name: "n_id" },
        ]
      },
    ]
  });
};
