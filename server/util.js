const range = (value, min = 25, max = 140, step = 15) => {
  let subQuery = `count(case when ${value} < ${min} then 1 end) as lt${min},`
  let i = +min
  for (; i + step < max; i += step) {
    subQuery += `count(case when ${value} >= ${i} and ${value} < ${i +
      step} then 1 end) as gte${i}_lt${i + step},`
  }
  subQuery += `count(case when ${value} >= ${i} and ${value} < ${max} then 1 end) as gte${i}_lt${max},`
  subQuery += `count(case when ${value} >= ${max} then 1 end) as gt${max},`
  return subQuery
}

module.exports = {
  range,
}
