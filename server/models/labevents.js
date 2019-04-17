/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('labevents', {
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
      allowNull: true
    },
    itemid: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    charttime: {
      type: DataTypes.DATE,
      allowNull: true
    },
    value: {
      type: DataTypes.STRING,
      allowNull: true
    },
    valuenum: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    valueuom: {
      type: DataTypes.STRING,
      allowNull: true
    },
    flag: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'labevents'
  });
};
