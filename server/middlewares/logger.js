const moment = require('moment')

const logUrl = (req, res, next) => {
  console.log(
    `${req.protocol}://${req.hostname}${req.originalUrl} ${moment().format()}`
  )
  next()
}

const logPostBody = (req, res, next) => {
  console.log(req.body)
  next()
}

module.exports = {
  logUrl,
  logPostBody,
}
