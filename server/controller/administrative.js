const administrativeConfig = require('../chart_config').administrative
const { queryCommonFields } = require('./demographic')

const querySelectedAdministrative = (req) => {
  const query = []
  Object.keys(administrativeConfig).forEach(k => {
    query.push(queryCommonFields(administrativeConfig[k], req))
  })
  return query
}

module.exports = {
  querySelectedAdministrative,
}