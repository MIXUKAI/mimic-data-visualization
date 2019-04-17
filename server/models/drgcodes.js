/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('drgcodes', {
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
    drg_type: {
      type: DataTypes.STRING,
      allowNull: false
    },
    drg_code: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true
    },
    drg_severity: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    drg_mortality: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    tableName: 'drgcodes'
  });
};
