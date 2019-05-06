/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('pai_pespiratory_rate', {
    subject_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    hadm_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    icustay_id: {
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
    dischtime: {
      type: DataTypes.DATE,
      allowNull: false
    },
    intime: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    outtime: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    admission_type: {
      type: DataTypes.STRING,
      allowNull: false
    },
    admission_location: {
      type: DataTypes.STRING,
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
    itemid: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    value: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    valuenum: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    valueuom: {
      type: DataTypes.STRING,
      allowNull: false
    },
    charttime: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    tableName: 'pai_pespiratory_rate'
  });
};
