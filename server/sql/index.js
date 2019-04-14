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
  `WITH age_admit AS (${queryPatients.slice(0,-1)}) 
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

const queryIcustays = `
SELECT count(*) AS icu_count FROM icustays ist, patients pa where first_careunit='MICU'
 AND ist.subject_id=pa.subject_id AND pa.gender='F';
`


module.exports = {
  queryPatientsAge,
  queryGender,
  queryIcustays,
  queryPatients,
}