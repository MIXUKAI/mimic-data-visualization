/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('d_items', {
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
      allowNull: true
    },
    abbreviation: {
      type: DataTypes.STRING,
      allowNull: true
    },
    dbsource: {
      type: DataTypes.STRING,
      allowNull: true
    },
    linksto: {
      type: DataTypes.STRING,
      allowNull: true
    },
    category: {
      type: DataTypes.STRING,
      allowNull: true
    },
    unitname: {
      type: DataTypes.STRING,
      allowNull: true
    },
    param_type: {
      type: DataTypes.STRING,
      allowNull: true
    },
    conceptid: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    tableName: 'd_items'
  });
};
