/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('chartevents', {
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
    icustay_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    itemid: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    charttime: {
      type: DataTypes.DATE,
      allowNull: true
    },
    storetime: {
      type: DataTypes.DATE,
      allowNull: true
    },
    cgid: {
      type: DataTypes.INTEGER,
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
    warning: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    error: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    resultstatus: {
      type: DataTypes.STRING,
      allowNull: true
    },
    stopped: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'chartevents'
  });
};
