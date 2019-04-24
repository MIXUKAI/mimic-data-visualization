const { range } = require('../util')
const { sequelize } = require('../db')

const queryEvents = itemid => (req, rangeConfig = {}, field = 'max') => {
  let gender = ' '
  if (req.query.gender && req.query.gender.length) {
    gender += ` and patients.gender='${req.query.gender[0]}' `
    for (let i = 1; i < req.query.gender.length; i++) {
      icu += `or patients.gender='${req.query.gender[i]}' `
    }
  }
  let icu = ' '
  if (req.query.icu && req.query.icu.length) {
    icu += `where icustays.first_careunit='${req.query.icu[0]}' `
    for (let i = 1; i < req.query.icu.length; i++) {
      icu += `or icustays.first_careunit='${req.query.icu[i]}' `
    }
  }
  return new Promise((resolve, reject) => {
    sequelize
      .query(
        `
    select
      count(*),
      ${range(
        'valuenum',
        rangeConfig.min,
        rangeConfig.max,
        rangeConfig.step
      ).slice(0, -1)} 
    from (
      select 
        icustays.subject_id,
        ${field}(valuenum) as valuenum
      from mimiciii.icustays as icustays inner join mimiciii.patients as patients  
      on patients.subject_id=icustays.subject_id 
      ${gender}
      inner join mimiciii.chartevents as chartevents on icustays.subject_id=chartevents.subject_id 
      and chartevents.itemid=${itemid} 
      ${icu}
      group by icustays.subject_id
    ) as res;
    `
      )
      .then(res => {
        let result = []
        if (Array.isArray(res) && res[1] && res[1].rows) {
          result = res[1].rows
        }
        resolve(result)
      })
  })
}

const queryHeartRate = queryEvents(211)
const queyrArtericalBloodPressure = queryEvents(220052)
const queyrTemperature = queryEvents(223761)
const queryPespiratoryRate = queryEvents(224690)

module.exports = {
  queryEvents,
  queyrArtericalBloodPressure,
  queryHeartRate,
  queyrTemperature,
  queryPespiratoryRate,
}
