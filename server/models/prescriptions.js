/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('prescriptions', {
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
    icustay_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    startdate: {
      type: DataTypes.DATE,
      allowNull: true
    },
    enddate: {
      type: DataTypes.DATE,
      allowNull: true
    },
    drug_type: {
      type: DataTypes.STRING,
      allowNull: false
    },
    drug: {
      type: DataTypes.STRING,
      allowNull: false
    },
    drug_name_poe: {
      type: DataTypes.STRING,
      allowNull: true
    },
    drug_name_generic: {
      type: DataTypes.STRING,
      allowNull: true
    },
    formulary_drug_cd: {
      type: DataTypes.STRING,
      allowNull: true
    },
    gsn: {
      type: DataTypes.STRING,
      allowNull: true
    },
    ndc: {
      type: DataTypes.STRING,
      allowNull: true
    },
    prod_strength: {
      type: DataTypes.STRING,
      allowNull: true
    },
    dose_val_rx: {
      type: DataTypes.STRING,
      allowNull: true
    },
    dose_unit_rx: {
      type: DataTypes.STRING,
      allowNull: true
    },
    form_val_disp: {
      type: DataTypes.STRING,
      allowNull: true
    },
    form_unit_disp: {
      type: DataTypes.STRING,
      allowNull: true
    },
    route: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'prescriptions'
  });
};
