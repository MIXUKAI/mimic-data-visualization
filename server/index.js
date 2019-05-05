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

const { querySelectedDemographic } = require('./controller/demographic')
const { querySelectedAdministrative } = require('./controller/administrative')
const {
  querySelectedPatientsOutComes,
} = require('./controller/patients_outcomes')
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

app.get('/api/explore', (req, res) => {
  console.log('mxkxxkxmxkx', req.query)
  Promise.all([
    ...querySelectedDemographic(req),
    ...querySelectedAdministrative(req),
    ...querySelectedPatientsOutComes(req),
  ]).then(result => {
    console.log('res', result)
    const r = {}
    result.forEach((value, i) => {
      r[chartList[i]] = value
    })
    res.status(200).json(r)
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

const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
  console.log(`server stared on port ${PORT}`)
})
