import Api from '../../util/fetch'


export const explore = ({ age, icu, gender }) => async (dispatch) => {
  const { data } = await Api.get('/explore', {
    params: {
      age,
      icu,
      gender: gender === 'Male' ? 'M' : 'F',
    }
  })
  if (data) {

  }
}