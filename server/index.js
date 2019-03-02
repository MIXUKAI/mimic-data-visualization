const express = require('express')
const { logUrl, logPostBody } = require('./middlewares/logger')

const app = express()

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

const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
  console.log(`server stared on port ${PORT}`)
})
