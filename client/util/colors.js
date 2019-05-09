export const RPIMARY_COLOR = '#2185D0'

export const BLUE_SCHEMA = {
  primary: '#2185D0',
  linear: [
    '#7CB9EB',
    '#55A8E8',
    '#2185D0',
    '#3A719C',
    '#0B5187',
  ]
}

export const PURPLE_SCHEMA = {
  primary: '#3515B0',
  linear: [
    '#3F2D84',
    '#1D0772',
    '#3515B0',
    '#6749D7',
    '#856FD7',
  ]
}

export const GREEN_SCHEMA = {
  primary: '#009D91',
  linear: [
    '#1D766F',
    '#00665E',
    '#009D91',
    '#33CEC3',
    '#5DCEC6',
  ]
}

export const ORANGE_SCHEMA = {
  primary: '#FFA700',
  linear: [
    '#A66D00',
    '#BF8E30',
    '#FFA700',
    '#FFBD40',
    '#FFCF73',
  ]
}

export const getColors = (len = 4) => {
  // const schemas = [BLUE_SCHEMA, PURPLE_SCHEMA, GREEN_SCHEMA, ORANGE_SCHEMA]
  const colors = [...BLUE_SCHEMA.linear, ...PURPLE_SCHEMA.linear, ...GREEN_SCHEMA.linear, ...ORANGE_SCHEMA.linear]
  const res = []
  for (let i = 0; i < len; i++) {
    res.push(colors[i])
  }
  return res
}