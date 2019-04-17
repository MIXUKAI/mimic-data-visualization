/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('inputevents_mv', {
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
    starttime: {
      type: DataTypes.DATE,
      allowNull: true
    },
    endtime: {
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
    ordercategoryname: {
      type: DataTypes.STRING,
      allowNull: true
    },
    secondaryordercategoryname: {
      type: DataTypes.STRING,
      allowNull: true
    },
    ordercomponenttypedescription: {
      type: DataTypes.STRING,
      allowNull: true
    },
    ordercategorydescription: {
      type: DataTypes.STRING,
      allowNull: true
    },
    patientweight: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    totalamount: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    totalamountuom: {
      type: DataTypes.STRING,
      allowNull: true
    },
    isopenbag: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    continueinnextdept: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    cancelreason: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    statusdescription: {
      type: DataTypes.STRING,
      allowNull: true
    },
    comments_editedby: {
      type: DataTypes.STRING,
      allowNull: true
    },
    comments_canceledby: {
      type: DataTypes.STRING,
      allowNull: true
    },
    comments_date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    originalamount: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    originalrate: {
      type: DataTypes.DOUBLE,
      allowNull: true
    }
  }, {
    tableName: 'inputevents_mv'
  });
};
