export const menus = {
  demographic: [
    { name: 'show_age', title: 'Age', cname: '年龄', showStep: true },
    { name: 'show_ethnicity', title: 'Ethnicity', cname: '种族' },
    { name: 'show_gender', title: 'Gender', cname: '性别' },
    { name: 'show_marital', title: 'Marital Status', cname: '婚姻状况' },
    { name: 'show_religion', title: 'Religion', cname: '宗教信仰' },
  ],
  administrative: [
    { name: 'show_icuType', title: 'Admission ICU Service Type', cname: 'Admission重症监护室服务类型' },
    { name: 'show_admissionSource', title: 'Admission Source', cname: 'Admission来源' },
    { name: 'show_admissionType', title: 'Admission Type', cname: 'Admission类型' },
    { name: 'show_insurance', title: 'Insurance Type', cname: '保险类型' },
  ],
  patientOutcomes: [
    { name: 'show_28mortality', title: '28 Day Mortality', cname: '28天死亡率' },
    { name: 'show_hospitalLenStay', title: 'Hospital Length of Stay', cname: '医院时长'},
    { name: 'show_hospitalMortality', title: 'Hospital Mortality', cname: '医院死亡率' },
    { name: 'show_icuMortality', title: 'ICU Mortality', cname: '重症监护室死亡率比' },
    { name: 'show_icuLenStay', title: 'ICU Length of Stay', cname: '重症监护室时长' },
  ],
  vitalSigns: [
    { name: 'heartRate', cname: '心率', mma: true },
    { name: 'bloodPressure', cname: '血压', mma: true },
    { name: 'pespiratoryRate', cname: '呼吸频率', mma: true },
    { name: 'temperature', cname: '体温', mma: true },
  ]
}
