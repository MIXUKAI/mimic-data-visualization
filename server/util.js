const Sequelize = require('sequelize')

const range = (value, min = 25, max = 140, step = 15) => {
  // let subQuery = `count(case when ${value} < ${min} then 1 end) as lt${min},`
  let subQuery = ''
  let i = +min
  for (; i + step < max; i += step) {
    subQuery += `count(case when ${value} >= ${i} and ${value} < ${i +
      step} then 1 end) as "${i}-${i + step-1}",`
  }
  subQuery += `count(case when ${value} >= ${i} and ${value} < ${max} then 1 end) as "${i}-${max-1}",`
  subQuery += `count(case when ${value} >= ${max} then 1 end) as ">=${max}" `
  return subQuery
}

function attributesRange(value, min = 25, max = 140, step = 15) {
  const res = []
  let i = +min
  for (; i + step < max; i += step) {
    res.push([
      Sequelize.literal(
        `count(case when ${value} >= ${i} and ${value} < ${i +
        step} then 1 end)`
      ),
      `${i}-${i + step - 1}`,
    ])
  }
  res.push([
    Sequelize.literal(
      `count(case when ${value} >= ${i} and ${value} < ${max} then 1 end)`
    ),
    `${i}-${max - 1}`,
  ])
  res.push([
    Sequelize.literal(
      `count(case when ${value} >= ${max} then 1 end)`
    ),
    `>=${max}`
  ])
  console.log('res', res)
  return res
}

module.exports = {
  range, 
  attributesRange,
}