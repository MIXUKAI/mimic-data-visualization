const express = require('express')
const { logUrl, logPostBody } = require('./middlewares/logger')
const Sequelize = require('sequelize')
const Op = Sequelize.Op

const { Admissions, sequelize } = require('./db')
const Patients = require('./models/patients')(sequelize, Sequelize)
const ICUStays = require('./models/icustays')(sequelize, Sequelize)

Patients.hasMany(Admissions, { foreignKey: 'subject_id' })
Patients.hasMany(ICUStays, { foreignKey: 'subject_id' })
Admissions.belongsTo(Patients, { foreignKey: 'subject_id', targetKey: 'subject_id' })

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
  Admissions
    .findAll({
      group: 'admission_type',
      attributes: ['admission_type', [sequelize.fn('COUNT', sequelize.col('admission_type')), 'count']]
    })
    .then(patients => {
      res.status(200).json(patients)
    })
})

app.get('/api/explore', (req, res) => {
  console.log(req.query)

  Patients.findAndCountAll({
    include: [{
      model: Admissions,
      // required: true,
    }, {
      model: ICUStays,
    }],
    where: {
      gender: req.query.gender,
    },
    offset: 10,
    limit: 2
  }).then(patients => {
    console.log(patients)
    res.status(200).json(patients)
  })
})




const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
  console.log(`server stared on port ${PORT}`)
})
