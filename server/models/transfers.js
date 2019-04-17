/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('transfers', {
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
    icustay_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    dbsource: {
      type: DataTypes.STRING,
      allowNull: true
    },
    eventtype: {
      type: DataTypes.STRING,
      allowNull: true
    },
    prev_careunit: {
      type: DataTypes.STRING,
      allowNull: true
    },
    curr_careunit: {
      type: DataTypes.STRING,
      allowNull: true
    },
    prev_wardid: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    curr_wardid: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    intime: {
      type: DataTypes.DATE,
      allowNull: true
    },
    outtime: {
      type: DataTypes.DATE,
      allowNull: true
    },
    los: {
      type: DataTypes.DOUBLE,
      allowNull: true
    }
  }, {
    tableName: 'transfers'
  });
};
