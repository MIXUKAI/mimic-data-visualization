/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('d_cpt', {
    row_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    category: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    sectionrange: {
      type: DataTypes.STRING,
      allowNull: false
    },
    sectionheader: {
      type: DataTypes.STRING,
      allowNull: false
    },
    subsectionrange: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    subsectionheader: {
      type: DataTypes.STRING,
      allowNull: false
    },
    codesuffix: {
      type: DataTypes.STRING,
      allowNull: true
    },
    mincodeinsubsection: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    maxcodeinsubsection: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    tableName: 'd_cpt'
  });
};
