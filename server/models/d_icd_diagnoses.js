/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('d_icd_diagnoses', {
    row_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    icd9_code: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    short_title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    long_title: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: 'd_icd_diagnoses'
  });
};
