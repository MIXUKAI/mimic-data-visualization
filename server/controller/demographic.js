const Sequelize = require('sequelize')

const { sequelize } = require('../db')
const Pai = require('../models/pai')(sequelize, Sequelize)
const demographicConfig = require('../chart_config').demographic
const selectionConfig = require('../selectionConfig')
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
  Object.keys(selectionConfig).forEach(k => {
    const config = selectionConfig[k]
    const value =
      config.type === 'slider'
        ? req.query[k].map(v => parseInt(v))
        : req.query[k]
    if (value) {
      where[config.filed] = {
        [config.where === 'between' ? Op.between : Op.or]: value,
      }
    }
  })
  where = { ...where, ...configWhere }
  console.log('where', where, config)
  return new Promise((resolve, reject) => {
    Pai.findAll({
      where,
      group: type === 'bar' ? '' : group,
      attributes:
        type === 'bar'
          ? addtionConfig.attributes
          : [countAttribute, [sequelize.fn('count', countAttribute), 'count']],
      raw: true,
    }).then(resolve)
  })
}

const querySelectedDemographic = req => {
  const query = []
  Object.keys(demographicConfig).forEach(k => {
    const config = demographicConfig[k]
    if (config.type === 'bar') {
      query.push(
        queryCommonFields(config, req, {
          attributes: attributesRange(k, req.query[k][0], req.query[k][1], 5),
        })
      )
    } else {
      query.push(queryCommonFields(config, req))
    }
    // if (req.query[k] && req.query[k].checked) {

    // } else {
    //   query.push(Promise.resolve([]))
    // }
  })

  return query
}

module.exports = {
  queryCommonFields,
  querySelectedDemographic,
}
