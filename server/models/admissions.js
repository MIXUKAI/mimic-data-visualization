/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('admissions', {
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
      allowNull: false,
      unique: true
    },
    admittime: {
      type: DataTypes.DATE,
      allowNull: false
    },
    dischtime: {
      type: DataTypes.DATE,
      allowNull: false
    },
    deathtime: {
      type: DataTypes.DATE,
      allowNull: true
    },
    admission_type: {
      type: DataTypes.STRING,
      allowNull: false
    },
    admission_location: {
      type: DataTypes.STRING,
      allowNull: false
    },
    discharge_location: {
      type: DataTypes.STRING,
      allowNull: false
    },
    insurance: {
      type: DataTypes.STRING,
      allowNull: false
    },
    language: {
      type: DataTypes.STRING,
      allowNull: true
    },
    religion: {
      type: DataTypes.STRING,
      allowNull: true
    },
    marital_status: {
      type: DataTypes.STRING,
      allowNull: true
    },
    ethnicity: {
      type: DataTypes.STRING,
      allowNull: false
    },
    edregtime: {
      type: DataTypes.DATE,
      allowNull: true
    },
    edouttime: {
      type: DataTypes.DATE,
      allowNull: true
    },
    diagnosis: {
      type: DataTypes.STRING,
      allowNull: true
    },
    hospital_expire_flag: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    has_chartevents_data: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    tableName: 'admissions'
  });
};
