const administrativeConfig = require('../chart_config').administrative
const { queryCommonFields } = require('./demographic')

const querySelectedAdministrative = (req) => {
  const query = []
  const administrativeQuery = JSON.parse(req.query.administrative)
  Object.keys(administrativeConfig).forEach(k => {
    if (administrativeQuery[k].checked) {
      query.push(queryCommonFields(administrativeConfig[k], req))
    } else {
      query.push(Promise.resolve([]))
    }
  })
  return query
}

module.exports = {
  querySelectedAdministrative,
}