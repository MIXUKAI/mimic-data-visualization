import { combineReducers } from 'redux'
export const TOGGLE_MODAL = 'TOGGLE_MODAL'
export const SET_MODAL_OPEN = 'SET_MODAL_OPEN'

export const toggleModal = () => (dispatch) => {
  dispatch({ type: TOGGLE_MODAL })
}

export const setModalOpen = (payload) => (dispatch) => {
  dispatch({ type: SET_MODAL_OPEN, payload  })
}

const defaultModalState = {
  open: false,
  data: { labels: [], datasets: [] },
  type: ''
}

export const modal = (state = defaultModalState, action) => {
  if (action.type === TOGGLE_MODAL) {
    state = { ...state, open: !state.open }
  }
  if (action.type === SET_MODAL_OPEN) {
    state = { ...state, ...action.payload }
  }
  return state
}

export default combineReducers({
  modal
})