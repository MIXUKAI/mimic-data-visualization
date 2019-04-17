/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('diagnoses_icd', {
    row_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    subject_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    hadm_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    seq_num: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    icd9_code: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'diagnoses_icd'
  });
};
