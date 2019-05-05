const express = require('express')
const { logUrl, logPostBody } = require('./middlewares/logger')
const Sequelize = require('sequelize')
const Op = Sequelize.Op

const { Admissions, sequelize } = require('./db')
const Patients = require('./models/patients')(sequelize, Sequelize)
const ICUStays = require('./models/icustays')(sequelize, Sequelize)
const DICD = require('./models/d_icd_diagnoses')(sequelize, Sequelize)

const {
  queyrArtericalBloodPressure,
  queryHeartRate,
  queryPespiratoryRate,
  queyrTemperature,
} = require('./controller/vital_sign')
const { queryHeightCm, queryWeightKg } = require('./controller/miscellaneous')

Patients.hasMany(Admissions, { foreignKey: 'subject_id' })
Patients.hasMany(ICUStays, { foreignKey: 'subject_id' })
Admissions.belongsTo(Patients, {
  foreignKey: 'subject_id',
  targetKey: 'subject_id',
})

const { querySelectedDemographic } = require('./controller/demographic')
const {
  querySelectedAdministrative,
} = require('./controller/administrative')
const { querySelectedPatientsOutComes } = require('./controller/patients_outcomes')
const chartConfig = require('./chart_config')
const chartList = []
Object.keys(chartConfig).forEach(groupKey => {
  Object.keys(chartConfig[groupKey]).forEach(chartKey =>
    chartList.push(chartKey)
  )
})
console.log('chartList', chartList)

// ICUStays.belongsTo(Patients, { foreignKey: 'subject_id', targetKey: 'subject_id' })

const age = `ROUND(CAST(EXTRACT(EPOCH FROM admissions.admittime-patients.dob) AS NUMERIC) / (60*60*24*365.252), 2)`
const age1 = `ROUND(CAST(EXTRACT(EPOCH FROM admittime-dob) AS NUMERIC) / (60*60*24*365.252), 2)`

const app = express()

app.all('*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'X-Requested-With')
  res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
  res.header('X-Powered-By', ' 3.2.1')
  res.header('Content-Type', 'application/json;charset=utf-8')
  next()
})

app.use(logUrl)
app.use(express.json())

app.get('/api/overview', (req, res) => {
  Admissions.findAll({
    group: 'admission_type',
    attributes: [
      'admission_type',
      [sequelize.fn('COUNT', sequelize.col('admission_type')), 'count'],
    ],
  }).then(patients => {
    res.status(200).json(patients)
  })
})

app.get('/api/hello', (req, res) => {
  res.status(200).json('hello api')
})

const attributes = ['subject_id', 'gender', 'admissions.religion']

function queryDemographic(req, type, options = { attributes: [] }) {
  let icuWhere = {}
  if (req.query.icu && req.query.icu.length) {
    icuWhere = {
      [Op.or]: req.query.icu.map(name => ({ first_careunit: name })),
    }
  }
  let genderWhere = {}
  if (req.query.gender && req.query.gender.length) {
    genderWhere = {
      [Op.or]: req.query.gender.map(gender => ({ gender })),
    }
  }
  let ageWhere = {}
  if (req.query.age && req.query.age.length) {
    ageWhere = {
      [Op.and]: [
        Sequelize.literal(
          `ROUND(CAST(EXTRACT(EPOCH FROM admissions.admittime-patients.dob) AS NUMERIC) / (60*60*24*365.252), 3) >= ${
            req.query.age[0]
          }`
        ),
        Sequelize.literal(
          `ROUND(CAST(EXTRACT(EPOCH FROM admissions.admittime-patients.dob) AS NUMERIC) / (60*60*24*365.252), 3) <= ${
            req.query.age[1]
          }`
        ),
      ],
    }
  }
  return new Promise((resolve, reject) => {
    Patients.findAll({
      include: [
        {
          model: ICUStays,
          where: icuWhere,
          required: true,
          attributes: [],
          duplicating: false,
        },
        {
          model: Admissions,
          attributes: [],
          where: ageWhere,
          duplicating: false,
        },
      ],
      where: genderWhere,
      attributes: !options.overrideAttr
        ? [type, [sequelize.fn('count', type), 'count'], ...options.attributes]
        : options.attributes,
      group: options.group || type,
      raw: true,
    }).then(resolve)
  })
}

function range(value, min = 25, max = 140, step = 15) {
  let subQuery = `count(case when ${value} < ${min} then 1 end) as lt${min},`
  let i = +min
  for (; i + step < max; i += step) {
    subQuery += `count(case when ${value} >= ${i} and ${value} < ${i +
      step} then 1 end) as gte${i}_lt${i + step},`
  }
  subQuery += `count(case when ${value} >= ${i} and ${value} < ${max} then 1 end) as gte${i}_lt${max},`
  subQuery += `count(case when ${value} >= ${max} then 1 end) as gt${max},`
  return subQuery
}
function queryAge(req, step) {
  if (req.query.show_age && req.query.show_age[0] === 'false') {
    return Promise.resolve([])
  }
  let icu = ''
  if (req.query.icu && req.query.icu.length) {
    icu += ` and icustays.first_careunit='${req.query.icu[0]}' `
    for (let i = 1; i < req.query.icu.length; i++) {
      icu += `or icustays.first_careunit='${req.query.icu[i]}' `
    }
  }
  let gender = ' '
  if (req.query.gender && req.query.gender.length) {
    icu += `where patients.gender='${req.query.gender[0]}' `
    for (let i = 1; i < req.query.icu.length; i++) {
      icu += `or patients.gender='${req.query.gender[i]}' `
    }
  }
  return new Promise(async (resolve, reject) => {
    sequelize
      .query(
        `
        select
          count(*),
          ${range(
            age1,
            req.query.age[0],
            req.query.age[1],
            +req.query.show_age[1]
          ).slice(0, -1)} 
        from (
          select
            patients.subject_id,
            max(patients.dob) as dob,
            max(admissions.admittime) as admittime 
          from mimiciii.patients as patients inner join mimiciii.admissions as admissions  
            on patients.subject_id=admissions.subject_id and 
            ${age} >= ${req.query.age[0]} and ${age} <= ${req.query.age[1]}
            inner join mimiciii.icustays as icustays 
            on icustays.subject_id=patients.subject_id 
            ${icu} 
            ${gender}
          group by patients.subject_id
        ) as res;
      `
      )
      .then(resolve)
      .catch(err => {
        console.log(err)
      })
  })
}

const queryHospitalLos = (req, step) => {
  let icu = ''
  if (req.query.icu && req.query.icu.length) {
    icu += ` and icustays.first_careunit='${req.query.icu[0]}' `
    for (let i = 1; i < req.query.icu.length; i++) {
      icu += `or icustays.first_careunit='${req.query.icu[i]}' `
    }
  }
  let gender = ' '
  if (req.query.gender && req.query.gender.length) {
    icu += `where patients.gender='${req.query.gender[0]}' `
    for (let i = 1; i < req.query.icu.length; i++) {
      icu += `or patients.gender='${req.query.gender[i]}' `
    }
  }
  return new Promise(async (resolve, reject) => {
    sequelize
      .query(
        `select 
          count(*),
          ${range('hosLos', 1, 38, step).slice(0, -1)} 
        from(
          select 
            patients.subject_id,
            round(cast(extract(epoch from dischtime-admittime) as numeric) / (60*60*24), 2) as hosLos,
            round(cast(extract(epoch from outtime-intime) as numeric) / (60*60*24), 2) as icuLos 
          from mimiciii.admissions as admissions inner join mimiciii.patients as patients 
            on patients.subject_id=admissions.subject_id and 
            ${age} >= ${req.query.age[0]} and ${age} <= ${req.query.age[1]} 
            inner join mimiciii.icustays as icustays 
            on icustays.subject_id=patients.subject_id
            ${icu}
          ${gender}
        ) as res limit 10;
      `
      )
      .then(resolve)
  })
}

const queryICULos = (req, step) => {
  // if (req.query.show_age && req.query.show_age[0] === 'false') {
  //   return Promise.resolve([])
  // }
  let icu = ''
  if (req.query.icu && req.query.icu.length) {
    icu += ` and icustays.first_careunit='${req.query.icu[0]}' `
    for (let i = 1; i < req.query.icu.length; i++) {
      icu += `or icustays.first_careunit='${req.query.icu[i]}' `
    }
  }
  let gender = ' '
  if (req.query.gender && req.query.gender.length) {
    icu += `where patients.gender='${req.query.gender[0]}' `
    for (let i = 1; i < req.query.icu.length; i++) {
      icu += `or patients.gender='${req.query.gender[i]}' `
    }
  }
  return new Promise(async (resolve, reject) => {
    sequelize
      .query(
        `select 
          count(*),
          ${range('icuLos', 0, 38, step).slice(0, -1)} 
        from(
          select 
            patients.subject_id,
            round(cast(extract(epoch from dischtime-admittime) as numeric) / (60*60*24), 2) as hosLos,
            round(cast(extract(epoch from outtime-intime) as numeric) / (60*60*24), 2) as icuLos 
          from mimiciii.admissions as admissions inner join mimiciii.patients as patients 
            on patients.subject_id=admissions.subject_id and 
            ${age} >= ${req.query.age[0]} and ${age} <= ${req.query.age[1]} 
            inner join mimiciii.icustays as icustays 
            on icustays.subject_id=patients.subject_id 
            ${icu}
          ${gender}
        ) as res limit 10;
      `
      )
      .then(resolve)
      .catch(err => {
        console.log(err)
      })
  })
}

app.get('/api/explore', (req, res) => {
  console.log('mxkxxkxmxkx', req.query)

  Promise.all(
    [
      ...querySelectedDemographic(req),
      ...querySelectedAdministrative(req),
      ...querySelectedPatientsOutComes(req),
    ]
    // queryReligion(req)
    // queryDemographic(req, 'admissions.religion'),
    // queryDemographic(req, 'patients.gender'),
    // queryAge(req, 3),
    // queryDemographic(req, 'admissions.ethnicity'),
    // queryDemographic(req, 'admissions.marital_status'),
    // queryDemographic(req, 'admissions.admission_type'),
    // queryDemographic(req, 'admissions.admission_location'),
    // queryDemographic(req, 'admissions.insurance'),
    // queryDemographic(req, 'icustays.first_careunit'),
    // queryHospitalLos(req, 5),
    // queryICULos(req, 4),
    // queryHeartRate(req, { min: 28, max: 140, step: 12 }),
    // queyrTemperature(req, { min: 80, max: 104, step: 2 }),
    // queyrArtericalBloodPressure(req, { min: 44, max: 190, step: 15 }),
    // queryPespiratoryRate(req, { min: 0, max: 36, step: 4 }),
    // queryHeightCm(req, { min: 136, max: 210, step: 5 }),
    // queryWeightKg(req, { min: 21, max: 140, step: 10 })
    // queryEvents(req, null, 'max', 618)
  ).then((
    result
    // []
    // religion,
    // gender,
    // age,
    // ethnicity,
    // marital,
    // admissionType,
    // admissionLocation,
    // insurance,
    // icutype,
    // hospitalLos,
    // icuLos,
    // heartRate,
    // temperature,
    // bloodPressure,
    // pespiratoryRate,
    // height,
    // weight,
    // ]
  ) => {
    console.log('res', result)
    // console.log(
    // religion,
    // gender,
    // age,
    // ethnicity,
    // marital,
    // admissionType,
    // admissionLocation,
    // insurance,
    // icutype,
    // hospitalLos,
    // icuLos,
    // heartRate,
    // temperature,
    // bloodPressure,
    // pespiratoryRate,
    // height,
    // weight
    // )
    // let ageValue = []
    // if (age[1] && age[1].rows) {
    //   ageValue = age[1].rows
    // }
    // let hospitalLosValue = []
    // if (hospitalLos[1] && hospitalLos[1].rows) {
    //   hospitalLosValue = hospitalLos[1].rows
    // }
    // let icuLosValue = []
    // if (icuLos[1] && icuLos[1].rows) {
    //   icuLosValue = icuLos[1].rows
    // }
    // res.status(200).json({
    //   religion,
    // gender,
    // age: ageValue,
    // ethnicity,
    // marital,
    // admissionType,
    // admissionLocation,
    // insurance,
    // icutype,
    // hospitalLos: hospitalLosValue,
    // icuLos: icuLosValue,
    // heartRate,
    // temperature,
    // bloodPressure,
    // pespiratoryRate,
    // height,
    // weight,
    // })
    const r = {}
    result.forEach((value, i) => {
      r[chartList[i]] = value
    })
    res.status(200).json(r)
  })
})

// ${range('valuenum').slice(0, -1)}
app.get('/api/explore1', async (req, res) => {
  await sequelize.query('set search_path to mimiciii;')
  sequelize
    .query(
      `
    select
      count(*),
      ${range('max').slice(0, -1)} 
    from (
      select 
        ist.subject_id,
        max(valuenum) 
      from icustays as ist inner join patients 
      on patients.subject_id=ist.subject_id
      and patients.gender=:gender
      inner join chartevents_3 on ist.subject_id=chartevents_3.subject_id 
      and chartevents_3.itemid=211 
      where ist.first_careunit=:icu 
      group by ist.subject_id
    ) as mypa;
    `,
      {
        raw: true,
        replacements: { gender: req.query.gender, icu: req.query.icu },
      }
    )
    .then(res => {
      console.log(res)
    })
})

app.get('/api/icd/search', (req, res) => {
  DICD.findAll({
    where: {
      short_title: {
        [Op.like]: `%${req.query.icd}%`,
      },
    },
    row: true,
    limit: 10,
  }).then(result => {
    console.log(result)
    res.status(200).json(result)
  })
})

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log(`server stared on port ${PORT}`)
})
