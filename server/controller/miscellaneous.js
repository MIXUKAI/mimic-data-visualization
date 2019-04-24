const { queryEvents } = require('./vital_sign')

const queryWeightKg = queryEvents(226512)
const queryHeightCm = queryEvents(226730)

module.exports = {
  queryHeightCm,
  queryWeightKg,
}
