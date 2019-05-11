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
  const demographicQuery = JSON.parse(req.query.demographic)
  Object.keys(demographicConfig).forEach(k => {
    const config = demographicConfig[k]
    console.log('demographicQuery', demographicQuery, k)
    if (demographicQuery[k].checked) {
      if (config.type === 'bar') {
        query.push(
          queryCommonFields(config, req, {
            attributes: attributesRange(
              config.countAttribute,
              req.query[config.countAttribute][0],
              req.query[config.countAttribute][1],
              5
            ),
          })
        )
      } else {
        query.push(queryCommonFields(config, req))
      }
    } else {
      query.push(Promise.resolve([]))
    }
  })

  return query
}

module.exports = {
  queryCommonFields,
  querySelectedDemographic,
}
