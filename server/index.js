const express = require('express')
const { logUrl, logPostBody } = require('./middlewares/logger')

const { query } = require('./db')

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

app.get('/', (req, res) => {
  res.send('hello world')
})

app.get('/api/members', (req, res) => {
  res.status(200).json({ name: 'mixukai', age: 21 })
})

app.post('/api/members', logPostBody, (req, res) => {
  res.status(200).json(req.body)
})

app.get('/api/overview', (req, res) => {
  query(
    'SELECT admission_type, COUNT(*) FROM admissions ad GROUP BY admission_type;',
    null,
    (err, result) => {
      console.log(result.rows)
      res.status(200).json(result.rows)
    }
  )
  // query(
  //   `WITH tmp as ( SELECT adm.hadm_id, admittime, dischtime, adm.deathtime, pat.dod FROM admissions adm INNER JOIN patients pat ON adm.subject_id = pat.subject_id WHERE lower(diagnosis) NOT LIKE '%organ donor%' AND extract(YEAR FROM admittime) - extract(YEAR FROM dob) > 15 AND HAS_CHARTEVENTS_DATA = 1)

  //   SELECT COUNT(hadm_id) AS NumPat
  //   , round( cast(COUNT(deathtime) AS NUMERIC)/COUNT(hadm_id)*100 , 4) AS HospMort
  //   , round( cast(SUM(CASE WHEN dod < admittime + interval '30' day THEN 1 ELSE 0 END) AS NUMERIC)/COUNT(hadm_id)*100.0 , 4) AS HospMort30day
  //   , round( cast(SUM(CASE WHEN dod < admittime + interval '1' year THEN 1 ELSE 0 END) AS NUMERIC)/COUNT(hadm_id)*100 , 4) AS HospMort1yr
  //   FROM tmp;`
  //   null,
  //   (err, result) => {
  //     res.status(200).json(result.rows)
  //   }
  // )
})

const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
  console.log(`server stared on port ${PORT}`)
})
