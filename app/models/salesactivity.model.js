const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('sales_activity', {
    No: {
      type: DataTypes.BIGINT,
      allowNull: true,
      primaryKey:true
    },
    'Nama Customer': {
      type: DataTypes.STRING,
      allowNull: true
    },
    'NIK': {
      type: DataTypes.STRING,
      allowNull: true
    },
    'NPWP': {
      type: DataTypes.STRING,
      allowNull: true
    },
    'Nomor Handphone': {
      type: DataTypes.STRING,
      allowNull: true
    },
    'Nomor Unik': {
      type: DataTypes.STRING,
      allowNull: true
    },
    Alamat: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    Provinsi: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    Kota: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    Kecamatan: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    'Nama Sales': {
      type: DataTypes.STRING,
      allowNull: true
    },
    'Nama SA': {
      type: DataTypes.STRING,
      allowNull: true
    },
    'Nama SPV': {
      type: DataTypes.STRING,
      allowNull: true
    },
    Merk: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    'Model Mobil': {
      type: DataTypes.STRING,
      allowNull: true
    },
    'Tipe Mobil': {
      type: DataTypes.STRING,
      allowNull: true
    },
    'Jenis Mobil': {
      type: DataTypes.TEXT,
      allowNull: true
    },
    Transmisi: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    Segmentasi: {
      type: DataTypes.STRING,
      allowNull: true
    },
    Kelas: {
      type: DataTypes.STRING,
      allowNull: true
    },
    'Vin Number': {
      type: DataTypes.STRING,
      allowNull: true
    },
    'Tahun Rakit': {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    'Tahun Produksi': {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    Kilometer: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    'WO Number': {
      type: DataTypes.STRING,
      allowNull: true
    },
    'Tanggal DO': {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    'Nomor DO': {
      type: DataTypes.STRING,
      allowNull: true
    },
    'Jenis Pembayaran': {
      type: DataTypes.TEXT,
      allowNull: true
    },
    'Nama Leasing': {
      type: DataTypes.STRING,
      allowNull: true
    },
    Tenor: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    'Status Kredit': {
      type: DataTypes.TEXT,
      allowNull: true
    },
    DP: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    'Tanggal PKB': {
      type: DataTypes.TEXT,
      allowNull: true
    },
    'Status Penetapan': {
      type: DataTypes.STRING,
      allowNull: true
    },
    'Nomor Polisi': {
      type: DataTypes.STRING,
      allowNull: true
    },
    'Tipe Customer': {
      type: DataTypes.TEXT,
      allowNull: true
    },
    'Kategori Customer': {
      type: DataTypes.TEXT,
      allowNull: true
    },
    Gender: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    'Age Range': {
      type: DataTypes.TEXT,
      allowNull: true
    },
    'Tanggal Lahir': {
      type: DataTypes.TEXT,
      allowNull: true
    },
    'Pekerjaan Customer': {
      type: DataTypes.TEXT,
      allowNull: true
    },
    'Sumber Info': {
      type: DataTypes.TEXT,
      allowNull: true
    },
    'Motif Beli Customer': {
      type: DataTypes.TEXT,
      allowNull: true
    },
    'Status Customer': {
      type: DataTypes.TEXT,
      allowNull: true
    },
    'Asal Data': {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'sales_activity',
    schema: 'public',
    timestamps: false
  });
};
