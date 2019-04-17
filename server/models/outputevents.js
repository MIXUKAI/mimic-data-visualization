/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('outputevents', {
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
    charttime: {
      type: DataTypes.DATE,
      allowNull: true
    },
    itemid: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    value: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    valueuom: {
      type: DataTypes.STRING,
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
    stopped: {
      type: DataTypes.STRING,
      allowNull: true
    },
    newbottle: {
      type: DataTypes.CHAR,
      allowNull: true
    },
    iserror: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    tableName: 'outputevents'
  });
};
