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
  Admissions
    .findAll({
      group: 'admission_type',
      attributes: ['admission_type', [sequelize.fn('COUNT', sequelize.col('admission_type')), 'count']]
    })
    .then(patients => {
      res.status(200).json(patients)
    })
})

const attributes = ['subject_id', 'gender', 'admissions.religion']

function queryDemographic(req, type) {
  return new Promise((resolve, reject) => {
    Patients.findAll({
      include: [
        {
          model: ICUStays,
          where: {
            first_careunit: req.query.icu
          },
          attributes: [],
          duplicating: false,
        },
        {
          model: Admissions,
          required: true,
          attributes: [],
          duplicating: false
        }
      ],
      where: {
        gender: req.query.gender
      },
      attributes: [type, [sequelize.fn('count', type), 'count']],
      group: type,
      raw: true,
    })
      .then(resolve)
  })
}

app.get('/api/explore', (req, res) => {
  console.log(req.query)

  Promise.all([
    queryDemographic(req, 'admissions.religion'), 
    queryDemographic(req, 'patients.gender'), 
    queryDemographic(req, 'admissions.ethnicity'),
    queryDemographic(req, 'admissions.marital_status')
  ])
    .then(([religion, gender, ethnicity, marital]) => {
      console.log(religion, gender, ethnicity, marital)
      res.status(200).json({ religion, gender, ethnicity, marital })
    })

})




const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
  console.log(`server stared on port ${PORT}`)
})
