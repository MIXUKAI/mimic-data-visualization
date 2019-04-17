/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('microbiologyevents', {
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
    spec_itemid: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    spec_type_desc: {
      type: DataTypes.STRING,
      allowNull: true
    },
    org_itemid: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    org_name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    isolate_num: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    ab_itemid: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    ab_name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    dilution_text: {
      type: DataTypes.STRING,
      allowNull: true
    },
    dilution_comparison: {
      type: DataTypes.STRING,
      allowNull: true
    },
    dilution_value: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    interpretation: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'microbiologyevents'
  });
};
