/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('noteevents', {
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
    chartdate: {
      type: DataTypes.DATE,
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
    category: {
      type: DataTypes.STRING,
      allowNull: true
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true
    },
    cgid: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    iserror: {
      type: DataTypes.CHAR,
      allowNull: true
    },
    text: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    tableName: 'noteevents'
  });
};
