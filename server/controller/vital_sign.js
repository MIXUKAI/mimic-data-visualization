const { sequelize } = require('../db')

const Sequelize = require('sequelize')
const PaiWeightKg = require('../models/pai_weight_kg')(sequelize, Sequelize)
const PaiHeightCm = require('../models/pai_height_cm')(sequelize, Sequelize)
const PaiHeartRate = require('../models/pai_heart_rate')(sequelize, Sequelize)
const PaiTemperature = require('../models/pai_temperature_c')(
  sequelize,
  Sequelize
)
const PaiBloodPressure = require('../models/pai_arterical_blood_pressure')(
  sequelize,
  Sequelize
)
const PaiPespiratoryRate = require('../models/pai_pespiratory_rate')(
  sequelize,
  Sequelize
)
const vitalSignConfig = require('../chart_config').vitalSign
const selectionConfig = require('../selectionConfig')
const Op = Sequelize.Op

const modals = {
  PaiWeightKg,
  PaiHeartRate,
  PaiHeightCm,
  PaiTemperature,
  PaiBloodPressure,
  PaiPespiratoryRate,
}

const { attributesRange, range } = require('../util')

// const queryEvents = (config = {}, req, addtionConfig) => {
//   const {
//     group,
//     countAttribute,
//     attributes,
//     where: configWhere = {},
//     type = 'pie',
//   } = config

//   let where = {}
//   Object.keys(selectionConfig).forEach(k => {
//     const config = selectionConfig[k]
//     const value =
//       config.type === 'slider'
//         ? req.query[k].map(v => parseInt(v))
//         : req.query[k]
//     if (value) {
//       where[config.filed] = {
//         [config.where === 'between' ? Op.between : Op.or]: value,
//       }
//     }
//   })
//   where = { ...where, ...configWhere }
//   console.log('where', where, config)
//   return new Promise((resolve, reject) => {
//     modals[config.modal]
//       .findAll({
//         where,
//         group: 'icustay_id',
//         attributes: addtionConfig.attributes || [
//           countAttribute,
//           [sequelize.fn('count', countAttribute), 'count'],
//         ],
//         raw: true,
//       })
//       .then(resolve)
//   })
// }

const queryEvents = (config, req) => {
  const { modal } = config
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
  // return Promise.resolve([])
  return new Promise((resolve, reject) => {
    sequelize.query(`
      SELECT ${range('valuenum', 30, 100, 10)} FROM (
        SELECT max(valuenum) as valuenum FROM mimiciii.${modal} 
        WHERE ${where} group by icustay_id
      ) as res;
    `).then(res => resolve(res[0]))
  }) 
}

// const queryHeartRate = queryEvents(211)
// const queyrArtericalBloodPressure = queryEvents(220052)
// const queyrTemperature = queryEvents(223761)
// const queryPespiratoryRate = queryEvents(224690)

const queryVitalSign = req => {
  const query = []
  Object.keys(vitalSignConfig).forEach(k => {
    const config = vitalSignConfig[k]
    query.push(
      queryEvents(config, req)
    )
  })

  return query
}

module.exports = {
  queryVitalSign,
}
