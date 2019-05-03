const Sequelize = require('sequelize')

const { sequelize } = require('../db')
const Pai = require('../models/pai')(sequelize, Sequelize)
const demographicConfig = require('../chart_config').demographic
const Op = Sequelize.Op

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

function range(value, min = 25, max = 140, step = 15) {
  const res = []
  let i = +min
  for (; i + step < max; i += step) {
    res.push([
      Sequelize.literal(
        `count(case when ${value} >= ${i} and ${value} < ${i +
        step} then 1 end)`
      ),
      `gte${i}_lt${i + step}`,
    ])
  }
  res.push([
    Sequelize.literal(
      `count(case when ${value} >= ${i} and ${value} < ${max} then 1 end)`
    ),
    `gte${i}_lt${max}`,
  ])
  res.push([
    Sequelize.literal(
      `count(case when ${value} >= ${max} then 1 end)`
    ),
    `gte${max}`
  ])
  console.log('res', res)
  return res
}

const querySelectedDemographic = req => {
  const query = []
  Object.keys(demographicConfig).forEach(k => {
    const config = demographicConfig[k]
    if (config.type === 'bar') {
      query.push(
        queryCommonFields(config, req, {
          attributes: range(k, req.query[k][0], req.query[k][1], 5)
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
