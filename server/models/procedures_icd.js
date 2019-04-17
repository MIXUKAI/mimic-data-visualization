/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('procedures_icd', {
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
      allowNull: false
    },
    icd9_code: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: 'procedures_icd'
  });
};
