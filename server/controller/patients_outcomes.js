const patientsOutComesConfig = require('../chart_config').patientsOutComes
const { queryCommonFields } = require('./demographic')

const { attributesRange } = require('../util')

const querySelectedPatientsOutComes = (req) => {
  const query = []
  const patientsOutComesQuery = JSON.parse(req.query.patientsOutComes)
  Object.keys(patientsOutComesConfig).forEach(k => {
    const config = patientsOutComesConfig[k]
    if (patientsOutComesQuery[k].checked) {
      if (config.type === 'bar') {
        query.push(
          queryCommonFields(config, req, {
            attributes: attributesRange(k, 0, 30, 3)
          })
        )
      } else {
        query.push(queryCommonFields(config, req))
      }
    } else {
      query.push(Promise.resolve([]))
    }
  })
  return query
}

module.exports = {
  querySelectedPatientsOutComes,
}