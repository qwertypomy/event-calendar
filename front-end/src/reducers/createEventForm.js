import { SHOW_CREATE_EVENT_FORM, HIDE_CREATE_EVENT_FORM } from '../actions/actionTypes'

const initialState = {
  isShown: false
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_CREATE_EVENT_FORM:
      return {
        isShown: true
      }
    case HIDE_CREATE_EVENT_FORM:
      return {
        isShown: false
      }
    default:
      return state
  }
}

export default reducer
