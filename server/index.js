const express = require('express')
const { logUrl, logPostBody } = require('./middlewares/logger')
const Sequelize = require('sequelize')
const Op = Sequelize.Op

const { Admissions, sequelize } = require('./db')
const Patients = require('./models/patients')(sequelize, Sequelize)
const ICUStays = require('./models/icustays')(sequelize, Sequelize)
const DICD = require('./models/d_icd_diagnoses')(sequelize, Sequelize)

Patients.hasMany(Admissions, { foreignKey: 'subject_id' })
Patients.hasMany(ICUStays, { foreignKey: 'subject_id' })
Admissions.belongsTo(Patients, {
  foreignKey: 'subject_id',
  targetKey: 'subject_id',
})
// ICUStays.belongsTo(Patients, { foreignKey: 'subject_id', targetKey: 'subject_id' })

const app = express()

app.all('*', function (req, res, next) {
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

const attributes = ['subject_id', 'gender', 'admissions.religion']

function queryDemographic(req, type, options = { attributes: [] }) {
  return new Promise((resolve, reject) => {
    Patients.findAll({
      include: [
        {
          model: ICUStays,
          where: {
            first_careunit: req.query.icu,
          },
          required: true,
          attributes: [],
          duplicating: false,
        },
        {
          model: Admissions,
          attributes: [],
          where: {
            [Op.and]: [
              Sequelize.literal(`ROUND(CAST(EXTRACT(EPOCH FROM admissions.admittime-patients.dob) AS NUMERIC) / (60*60*24*365.252), 3) >= ${req.query.age[0]}`),
              Sequelize.literal(`ROUND(CAST(EXTRACT(EPOCH FROM admissions.admittime-patients.dob) AS NUMERIC) / (60*60*24*365.252), 3) <= ${req.query.age[1]}`),
            ]
          },
          duplicating: false,
        },
      ],
      where: {
        gender: req.query.gender,
      },
      attributes: [type, [sequelize.fn('count', type), 'count'], ...options.attributes],
      group: type,
      raw: true,
    }).then(resolve)
  })
}

app.get('/api/explore', (req, res) => {
  console.log(req.query)

  Promise.all([
    queryDemographic(req, 'admissions.religion'),
    queryDemographic(req, 'patients.gender'),
    queryDemographic(req, 'admissions.ethnicity'),
    queryDemographic(req, 'admissions.marital_status'),
    queryDemographic(req, 'admissions.admission_type'),
    queryDemographic(req, 'admissions.admission_location'),
    queryDemographic(req, 'admissions.insurance'),
  ]).then(([religion, gender, ethnicity, marital, admissionType, admissionLocation, insurance]) => {
    console.log(religion, gender, ethnicity, marital, admissionType, admissionLocation, insurance)
    res.status(200).json({ religion, gender, ethnicity, marital })
  })
})

function range(value, min = 25, max = 140, step = 15) {
  let subQuery = `count(case when ${value} < ${min} then 1 end) as lt${min},`
  let i = min
  for (; i + step < max; i += step) {
    subQuery += `count(case when ${value} >= ${i} and ${value} < ${i + step} then 1 end) as gte${i}_lt${i + step},`
  }

  return subQuery
}

// ${range('valuenum').slice(0, -1)} 
app.get('/api/explore1', async (req, res) => {
  await sequelize.query('set search_path to mimiciii;')
  sequelize.query(`
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
  `, { raw: true, replacements: { gender: req.query.gender, icu: req.query.icu } })
    .then(res => {
      console.log(res)
    })
})

app.get('/api/icd/search', (req, res) => {
  DICD.findAll({
    where: {
      short_title: {
        [Op.like]: `%${req.query.icd}%`
      }
    },
    row: true,
    limit: 10,
  })
  .then(result => {
    console.log(result)
    res.status(200).json(result)
  })
})

const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
  console.log(`server stared on port ${PORT}`)
})
