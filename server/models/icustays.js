/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('icustays', {
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
      allowNull: false,
      unique: true
    },
    dbsource: {
      type: DataTypes.STRING,
      allowNull: false
    },
    first_careunit: {
      type: DataTypes.STRING,
      allowNull: false
    },
    last_careunit: {
      type: DataTypes.STRING,
      allowNull: false
    },
    first_wardid: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    last_wardid: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    intime: {
      type: DataTypes.DATE,
      allowNull: false
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
    tableName: 'icustays'
  });
};
