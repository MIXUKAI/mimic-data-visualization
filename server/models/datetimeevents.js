/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('datetimeevents', {
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
      allowNull: false
    },
    charttime: {
      type: DataTypes.DATE,
      allowNull: false
    },
    storetime: {
      type: DataTypes.DATE,
      allowNull: false
    },
    cgid: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    value: {
      type: DataTypes.DATE,
      allowNull: true
    },
    valueuom: {
      type: DataTypes.STRING,
      allowNull: false
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
    tableName: 'datetimeevents'
  });
};
