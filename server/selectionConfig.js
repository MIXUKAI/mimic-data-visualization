const selectionConfig = {
  icu: {
    type: 'button',
    value: ['CCU', 'CSRU', 'MICU', 'SICU', 'NICU', 'TSICU'],
    title: '请选择第一个重症监护室服务',
    filed: 'first_careunit'
  },
  admissionType: {
    type: 'button',
    value: ['EMERGENCY', 'NEWBORN', 'ELECTIVE', 'URGENT'],
    title: '请选择入院的类型',
    filed: 'admission_type'
  },
  gender: {
    type: 'button',
    value: ['M', 'F'],
    title: '请选择性别',
    filed: 'gender'
  },
  marital: {
    type: 'button',
    value: ['MARRIED', 'SINGLE', 'DIVORCED'],
    title: '婚姻状况',
    filed: 'marital_status'
  },
  age: {
    type: 'slider',
    value: [20, 80],
    title: '请选择年龄范围',
    where: 'between',
    filed: 'age'
  }
}

module.exports = selectionConfig