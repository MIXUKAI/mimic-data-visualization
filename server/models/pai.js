/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('pai', {
    subject_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    religion: {
      type: DataTypes.STRING,
      allowNull: true
    },
    marital_status: {
      type: DataTypes.STRING,
      allowNull: true
    },
    insurance: {
      type: DataTypes.STRING,
      allowNull: false
    },
    language: {
      type: DataTypes.STRING,
      allowNull: true
    },
    ethnicity: {
      type: DataTypes.STRING,
      allowNull: false
    },
    admittime: {
      type: DataTypes.DATE,
      allowNull: false
    },
    hos_los: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    first_careunit: {
      type: DataTypes.STRING,
      allowNull: false
    },
    last_careunit: {
      type: DataTypes.STRING,
      allowNull: false
    },
    icu_los: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  }, {
    tableName: 'pai'
  });
};
