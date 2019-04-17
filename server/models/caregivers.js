/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('caregivers', {
    row_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    cgid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true
    },
    label: {
      type: DataTypes.STRING,
      allowNull: true
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'caregivers'
  });
};
