const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('do_sales', {
    n_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    c_sales_name: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    c_supervisor_name: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    c_vehicle_model: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    c_vehicle_type: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    d_so_date: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    c_so_number: {
      type: DataTypes.STRING(150),
      allowNull: true
    },
    d_spk_date: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    d_billing_date: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    c_vin_number: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    c_katashiki_code: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    c_color_name: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    c_leasing_name: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    n_tenor: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    c_customer_name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    n_phone_number: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    c_city: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    c_district: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    c_address: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    c_nosin: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    n_dp: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    c_ktp: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    c_npwp: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    d_created_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.fn('now')
    },
    c_spk_number: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    c_province: {
      type: DataTypes.STRING(100),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'do_sales',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "do_sales_pkey",
        unique: true,
        fields: [
          { name: "n_id" },
        ]
      },
    ]
  });
};
