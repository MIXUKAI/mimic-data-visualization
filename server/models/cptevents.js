/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('cptevents', {
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
    costcenter: {
      type: DataTypes.STRING,
      allowNull: false
    },
    chartdate: {
      type: DataTypes.DATE,
      allowNull: true
    },
    cpt_cd: {
      type: DataTypes.STRING,
      allowNull: false
    },
    cpt_number: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    cpt_suffix: {
      type: DataTypes.STRING,
      allowNull: true
    },
    ticket_id_seq: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    sectionheader: {
      type: DataTypes.STRING,
      allowNull: true
    },
    subsectionheader: {
      type: DataTypes.STRING,
      allowNull: true
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'cptevents'
  });
};
