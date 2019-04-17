/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('d_labitems', {
    row_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    itemid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true
    },
    label: {
      type: DataTypes.STRING,
      allowNull: false
    },
    fluid: {
      type: DataTypes.STRING,
      allowNull: false
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false
    },
    loinc_code: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'd_labitems'
  });
};
