/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('procedureevents_mv', {
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
    value: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    valueuom: {
      type: DataTypes.STRING,
      allowNull: true
    },
    location: {
      type: DataTypes.STRING,
      allowNull: true
    },
    locationcategory: {
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
    ordercategorydescription: {
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
    }
  }, {
    tableName: 'procedureevents_mv'
  });
};
