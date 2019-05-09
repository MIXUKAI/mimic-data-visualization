const express = require('express')
const { logUrl } = require('./middlewares/logger')
const Sequelize = require('sequelize')
const Op = Sequelize.Op

const { sequelize } = require('./db')
const DICD = require('./models/d_icd_diagnoses')(sequelize, Sequelize)

const { querySelectedDemographic } = require('./controller/demographic')
const { querySelectedAdministrative } = require('./controller/administrative')
const {
  querySelectedPatientsOutComes,
} = require('./controller/patients_outcomes')
const { queryVitalSign } = require('./controller/vital_sign')
const chartConfig = require('./chart_config')
const chartList = []
Object.keys(chartConfig).forEach(groupKey => {
  Object.keys(chartConfig[groupKey]).forEach(chartKey =>
    chartList.push(chartKey)
  )
})
console.log('chartList', chartList)

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

app.get('/api/explore', (req, res) => {
  console.log('req.query', req.query)
  Promise.all([
    ...querySelectedDemographic(req),
    ...querySelectedAdministrative(req),
    ...querySelectedPatientsOutComes(req),
    ...queryVitalSign(req),
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
