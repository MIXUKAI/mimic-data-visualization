/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('services', {
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
    transfertime: {
      type: DataTypes.DATE,
      allowNull: false
    },
    prev_service: {
      type: DataTypes.STRING,
      allowNull: true
    },
    curr_service: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'services'
  });
};
