const { queryEvents } = require('./vital_sign')

const queryWeightKg = queryEvents(226512)
const queryHeightCm = queryEvents(226730)

const Sequelize = require('sequelize')

const { sequelize } = require('../db')
const Pai = require('../models/pai')(sequelize, Sequelize)
const miscellaneousConfig = require('../chart_config').miscellaneous
const Op = Sequelize.Op

const { attributesRange } = require('../util')

const queryCommonFields = (config = {}, req, addtionConfig) => {
  const {
    group,
    countAttribute,
    attributes,
    where: configWhere = {},
    type = 'pie',
  } = config

  let where = {}
  if (req.query.icu && req.query.icu.length) {
    where.first_careunit = {
      [Op.or]: req.query.icu.map(name => name),
    }
  }
  if (req.query.age && req.query.age.length) {
    where.age = {
      [Op.between]: req.query.age.map(a => parseInt(a)),
    }
  }
  if (req.query.gender && req.query.gender.length) {
    where.gender = {
      [Op.or]: req.query.gender.map(gender => gender),
    }
  }
  where = { ...where, ...configWhere }
  console.log('where', where, config)
  return new Promise((resolve, reject) => {
    Pai.findAll({
      where,
      group: type === 'bar' ? '' : group,
      attributes: type === 'bar' ? addtionConfig.attributes : [
        countAttribute,
        [sequelize.fn('count', countAttribute), 'count'],
      ],
      raw: true,
    }).then(resolve)
  })
}

module.exports = {
  queryHeightCm,
  queryWeightKg,
}


