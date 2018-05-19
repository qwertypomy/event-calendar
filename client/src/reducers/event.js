import _ from 'lodash'

import {
  LOGIN_USER_START,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  AUTH_USER_START,
  AUTH_USER_SUCCESS,
  AUTH_USER_FAIL,
  LOGOUT,
  CREATE_EVENT_START,
  CREATE_EVENT_SUCCESS,
  CREATE_EVENT_FAIL,
  REMOVE_EVENT_START,
  REMOVE_EVENT_SUCCESS,
  REMOVE_EVENT_FAIL
} from '../actions/actionTypes'

const initialState = {
  events: [],
  loading: false,
  error: null
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER_START:
    case AUTH_USER_START:
    case CREATE_EVENT_START:
    case REMOVE_EVENT_START:
      return {
        ...state,
        loading: true,
        error: null
      }

    case LOGIN_USER_SUCCESS:
    case AUTH_USER_SUCCESS:
      return {
        ...state,
        events: action.payload.events,
        loading: false
      }

    case LOGIN_USER_FAIL:
    case AUTH_USER_FAIL:
    case CREATE_EVENT_FAIL:
    case REMOVE_EVENT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload.message
      }

    case LOGOUT:
      return initialState

    case CREATE_EVENT_SUCCESS:
      return {
        ...state,
        events: _.concat(state.events, action.payload.event),
        loading: false
      }

    case REMOVE_EVENT_SUCCESS:
      return {
        ...state,
        events: _.differenceBy(state.events, [action.payload.event], '_id'),
        loading: false
      }

    default:
      return state
  }
}

export default reducer
