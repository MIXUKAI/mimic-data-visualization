const chart_config = {
  demographic: {
    religion: {
      group: 'religion',
      countAttribute: 'religion'
    },
    gender: {
      group: 'gender',
      countAttribute: 'gender'
    },
    marital: {
      group: 'marital_status',
      countAttribute: 'marital_status',
    },
    ethnicity: {
      group: 'ethnicity',
      countAttribute: 'ethnicity'
    },
    age: {
      type: 'bar',
      step: 5,
    }
  },
  administrative: {
    icuType: {
      group: 'first_careunit',
      countAttribute: 'first_careunit'
    },
    admissionLocation: {
      group: 'admission_location',
      countAttribute: 'admission_location',
    },
    admissionType: {
      group: 'admission_type',
      countAttribute: 'admission_type',
    },
    insurance: {
      group: 'insurance',
      countAttribute: 'insurance',
    }
  },
  patientsOutComes: {
    hos_los: {
      type: 'bar',
      step: 3,
    },
    icu_los: {
      type: 'bar',
      step: 3,
    }
  },
  vitalSign: {
    weightKg: {
      modal: 'pai_weight_kg',
    },
    height: {
      modal: 'pai_height_cm'
    },
    heartRate: {
      modal: 'pai_heart_rate'
    },
    artericalBloodPressure: {
      modal: 'pai_arterical_blood_pressure'
    },
    temperature: {
      modal: 'pai_temperature_c'
    },
    pespiratoryRate: {
      modal: 'pai_pespiratory_rate'
    }
  },
  miscellaneous: {
    weight: {
      type: 'bar',
      step: 5
    },
    height: {
      type: 'bar',
      step: 5
    }
  }
}

module.exports = chart_config