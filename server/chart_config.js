const chart_config = {
  icu_stay_info: {
    patientsCount: {},
  },
  demographic: {
    show_religion: {
      group: 'religion',
      countAttribute: 'religion',
    },
    show_gender: {
      group: 'gender',
      countAttribute: 'gender',
    },
    show_marital: {
      group: 'marital_status',
      countAttribute: 'marital_status',
    },
    show_ethnicity: {
      group: 'ethnicity',
      countAttribute: 'ethnicity',
    },
    show_age: {
      countAttribute: 'age',
      type: 'bar',
      step: 5,
    },
  },
  administrative: {
    show_icuType: {
      group: 'first_careunit',
      countAttribute: 'first_careunit',
    },
    show_admissionSource: {
      group: 'admission_location',
      countAttribute: 'admission_location',
    },
    show_admissionType: {
      group: 'admission_type',
      countAttribute: 'admission_type',
    },
    show_insurance: {
      group: 'insurance',
      countAttribute: 'insurance',
    },
  },
  patientsOutComes: {
    hos_los: {
      type: 'bar',
      step: 3,
    },
    icu_los: {
      type: 'bar',
      step: 3,
    },
  },
  vitalSign: {
    weightKg: {
      modal: 'pai_weight_kg',
      range: { min: 22, max: 140, step: 13 },
    },
    height: {
      modal: 'pai_height_cm',
      range: { min: 136, max: 191, step: 5 },
    },
    heartRate: {
      modal: 'pai_heart_rate',
      range: { min: 28, max: 136, step: 12 },
    },
    artericalBloodPressure: {
      modal: 'pai_arterical_blood_pressure',
      range: { min: 27, max: 127, step: 11 },
    },
    temperature: {
      modal: 'pai_temperature_c',
      range: { min: 35, max: 40, step: 1 },
    },
    pespiratoryRate: {
      modal: 'pai_pespiratory_rate',
      range: { min: 0, max: 36, step: 4 },
    },
  },
  miscellaneous: {
    weight: {
      type: 'bar',
      step: 5,
    },
    height: {
      type: 'bar',
      step: 5,
    },
  },
}

module.exports = chart_config
