/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('callout', {
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
    submit_wardid: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    submit_careunit: {
      type: DataTypes.STRING,
      allowNull: true
    },
    curr_wardid: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    curr_careunit: {
      type: DataTypes.STRING,
      allowNull: true
    },
    callout_wardid: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    callout_service: {
      type: DataTypes.STRING,
      allowNull: false
    },
    request_tele: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    request_resp: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    request_cdiff: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    request_mrsa: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    request_vre: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    callout_status: {
      type: DataTypes.STRING,
      allowNull: false
    },
    callout_outcome: {
      type: DataTypes.STRING,
      allowNull: false
    },
    discharge_wardid: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    acknowledge_status: {
      type: DataTypes.STRING,
      allowNull: false
    },
    createtime: {
      type: DataTypes.DATE,
      allowNull: false
    },
    updatetime: {
      type: DataTypes.DATE,
      allowNull: false
    },
    acknowledgetime: {
      type: DataTypes.DATE,
      allowNull: true
    },
    outcometime: {
      type: DataTypes.DATE,
      allowNull: false
    },
    firstreservationtime: {
      type: DataTypes.DATE,
      allowNull: true
    },
    currentreservationtime: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    tableName: 'callout'
  });
};
