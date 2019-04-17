/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('inputevents_cv', {
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
    icustay_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    charttime: {
      type: DataTypes.DATE,
      allowNull: true
    },
    itemid: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    amount: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    amountuom: {
      type: DataTypes.STRING,
      allowNull: true
    },
    rate: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    rateuom: {
      type: DataTypes.STRING,
      allowNull: true
    },
    storetime: {
      type: DataTypes.DATE,
      allowNull: true
    },
    cgid: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    orderid: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    linkorderid: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    stopped: {
      type: DataTypes.STRING,
      allowNull: true
    },
    newbottle: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    originalamount: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    originalamountuom: {
      type: DataTypes.STRING,
      allowNull: true
    },
    originalroute: {
      type: DataTypes.STRING,
      allowNull: true
    },
    originalrate: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    originalrateuom: {
      type: DataTypes.STRING,
      allowNull: true
    },
    originalsite: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'inputevents_cv'
  });
};
