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

const queryPatientsCount = req => {
  let where = ''
  let index = 0
  Object.keys(selectionConfig).forEach((k, i) => {
    const config = selectionConfig[k]
    const value =
      config.type === 'slider'
        ? req.query[k].map(v => parseInt(v))
        : req.query[k]
    if (value) {
      if (index !== 0) {
        where += ' AND '
      }
      index++
      where += '('
      if (config.where === 'between') {
        where += `${config.filed} between ${value[0]} and ${value[1]}`
      } else {
        value.forEach((v, index) => {
          if (index === 0) {
            where += `${config.filed}='${v}' `
          } else {
            where += `or ${config.filed}='${v}' `
          }
        })
      }
      where += ')'
    }
  })
  return new Promise((resolve, reject) => {
    sequelize.query(`
      SELECT count(*) as patients_count FROM (
        SELECT DISTINCT subject_id FROM mimiciii.pai 
        WHERE ${where}
      ) as res;
    `).then(res => resolve(res[0]))
  })
}

const querySelectedDemographic = req => {
  const query = []
  query.push(queryPatientsCount(req))
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
