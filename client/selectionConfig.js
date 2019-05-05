const selectionConfig = {
  icu: {
    type: 'button',
    value: ['CCU', 'CSRU', 'MICU', 'SICU', 'NICU', 'TSICU'],
    title: '请选择第一个重症监护室服务'
  },
  admissionType: {
    type: 'button',
    value: ['EMERGENCY', 'NEWBORN', 'ELECTIVE', 'URGENT'],
    title: '请选择入院的类型'
  },
  gender: {
    type: 'button',
    value: ['M', 'F'],
    title: '请选择性别'
  },
  marital: {
    type: 'button',
    value: ['MARRIED', 'SINGLE', 'DIVORCED'],
    title: '婚姻状况'
  },
  age: {
    type: 'slider',
    value: [20, 80],
    title: '请选择年龄范围'
  }
}

export default selectionConfig