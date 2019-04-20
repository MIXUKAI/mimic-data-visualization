/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('patients', {
    row_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true
    },
    subject_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false
    },
    dob: {
      type: DataTypes.DATE,
      allowNull: false
    },
    dod: {
      type: DataTypes.DATE,
      allowNull: true
    },
    dod_hosp: {
      type: DataTypes.DATE,
      allowNull: true
    },
    dod_ssn: {
      type: DataTypes.DATE,
      allowNull: true
    },
    expire_flag: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    tableName: 'patients',
  });
};
