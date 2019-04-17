const queryPatients =
  `SELECT 
    ad.subject_id,
    ad.hadm_id,
    ad.religion,
    ad.marital_status,
    ad.ethnicity,
    pat.gender,
    ROUND((CAST(EXTRACT(epoch FROM ad.admittime - pat.dob)/
     (60*60*24*365.242) AS NUMERIC)), 4) AS age 
    FROM admissions ad, patients pat 
    WHERE ad.subject_id=pat.subject_id;`

const queryPatientsAge =
  `WITH age_admit AS (${queryPatients.slice(0, -1)}) 
    SELECT 
     subject_id,
     hadm_id,
     CASE 
      WHEN age > 89 THEN '>89' 
      WHEN age >= 18 THEN 'adult' 
      ELSE 'child' END AS age_group 
     FROM age_admit;`

const queryGender = `
SELECT COUNT(CASE WHEN pa.gender='F' THEN 1 END) AS female,
 COUNT(CASE WHEN pa.gender='M' THEN 1 END) AS male,
 COUNT(*) AS totoal_count from patients pa;
`
// AND pat.gender='F'
const queryIcustays =
  `WITH pat AS(${queryPatients.slice(0, -1)}) 
  SELECT DISTINCT
    pat.subject_id,
    ist.first_careunit,
    pat.age,
    pat.gender
  FROM icustays ist, pat 
  WHERE ist.subject_id=pat.subject_id 
  AND ist.first_careunit='MICU'
  AND pat.age >= 44
  AND pat.age <= 80;`

const queryIcustays1 =
  `WITH cri AS(${queryIcustays.slice(0, -1)}) 
  SELECT 
    COUNT(*) AS total,
    COUNT(CASE WHEN cri.age >= 45 AND cri.age < 50 THEN 1 END) as age_lg45_ls50,
    COUNT(CASE WHEN cri.age >= 50 AND cri.age < 55 THEN 1 END) as age_lg50_ls55,
    COUNT(CASE WHEN cri.age >= 55 AND cri.age < 60 THEN 1 END) as age_lg55_ls60,
    COUNT(CASE WHEN cri.gender='F' THEN 1 END) AS female,
    COUNT(CASE WHEN cri.gender='M' THEN 1 END) AS male
  FROM cri;
  `
const makeAgeSelect = (table, left, right, step = 1) => {
  let select = ''
  let i = left
  for (; i < right; i += step) {
    const l = i
    const r = i + step
    select += `COUNT(CASE WHEN ${table}.age >= ${l} AND ${table}.age < ${r} THEN 1 END) AS gte${l}_lt${r},`
  }
  if (i === right) {
    select += `COUNT(CASE WHEN ${table}.age >= ${i - step} AND ${table}.age < ${i}THEN 1 END ) AS gte${i - step}_lt${i}`
  }
  if (i > right) {
    const l = i - step
    select += `COUNT(CASE WHEN ${table}.age >= ${l} AND ${table}.age < ${right} THEN 1 END)AS gte${l}_lt${right}`
  }
  return select
}

const queryIcustayPatients = (icu, gender, age) => {
  return `
WITH pat AS(${queryPatients.slice(0, -1)}) 
  SELECT DISTINCT
    pat.subject_id,
    ist.first_careunit,
    pat.age,
    pat.gender,
    pat.ethnicity
  FROM icustays ist, pat 
  WHERE ist.subject_id=pat.subject_id
  ${gender ? ` AND pat.gender='${gender}' ` : ''}
  AND ist.first_careunit='${icu}'
  AND pat.age >= ${age.left}
  AND pat.age < ${age.right}`
}

// const queryDemographicInformation = ({
//   age,
//   ethnicity,
//   gender,
//   marital,
//   religion
// }) => {
//   let baseSelect = `COUNT(*) AS total, COUNT(CASE WHEN cri.gender='F' THEN 1 END) AS female,
//   COUNT(CASE WHEN cri.gender='M' THEN 1 END) AS male`;
//   if (age) {
//     const { left, right, step } = age
//     baseSelect += ',' + makeAgeSelect('cri', left, right, step)
//   }

//   const s = `
//   WITH cri AS(${queryIcustayPatients('MICU', gender, age)}) 
//   SELECT
//     ${baseSelect}
//   FROM cri;
//   `
//   return s
// }

const queryDemographicInformation = ({
  age,
  ethnicity,
  gender,
  marital,
  religion
}) => {
  const s = `
  WITH cri AS(${queryIcustayPatients('MICU', gender, age)}) 
  SELECT
    ethnicity,
    COUNT(subject_id)
  FROM cri GROUP BY ethnicity;
  `
  return s
}



module.exports = {
  queryPatientsAge,
  queryGender,
  queryIcustays,
  queryPatients,
  queryIcustays1,
  queryDemographicInformation,
}