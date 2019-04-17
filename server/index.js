const express = require('express')
const { logUrl, logPostBody } = require('./middlewares/logger')

const { query } = require('./db')

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
})

app.get('/api/explore', (req, res) => {
  const { body } = req

})

const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
  console.log(`server stared on port ${PORT}`)
})
