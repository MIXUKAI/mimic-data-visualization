const { Pool } = require('pg')

const DB_CONFIG = {
  user: 'postgres',
  host: 'localhost',
  database: 'mimic',
  password: 'postgres',
  port: 5432,
}

const pool = new Pool(DB_CONFIG)

const {
  queryPatients,
  queryPatientsAge,
  queryIcustays,
  queryIcustays1,
  queryGender,
  queryDemographicInformation,
} = require('../sql')

pool.on('connect', client => {
  client.query('SET search_path TO mimiciii;')
})

pool.query(queryDemographicInformation({age: {left: 40, right: 60, step: 2}}), null, (err, res) => {
  err && console.log(err)
  console.log(res)
})

// pool.query(
//   `SELECT ad.subject_id, ad.hadm_id,
//     ROUND((CAST(EXTRACT(epoch FROM ad.admittime - pa.dob) /
//     (60 * 60 * 24 * 365.242) AS NUMERIC)), 4) AS age
//    FROM admissions ad, patients pa
//    WHERE ad.subject_id=pa.subject_id;`,
//   (err, res) => {
//     console.log(res)
//   }
// )

module.exports = {
  query: (text, params, cb) => {
    const start = Date.now()
    return pool.query(text, params, (err, res) => {
      const duration = Date.now() - start
      console.log('execeted query', { text, duration, rows: res.rowCountF })
      cb(err, res)
    })
  },
}
