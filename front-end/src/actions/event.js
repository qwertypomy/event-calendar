import axios from '../axios'
import { notify } from './notification'

import {
  CREATE_EVENT_START,
  CREATE_EVENT_SUCCESS,
  CREATE_EVENT_FAIL,
  REMOVE_EVENT_START,
  REMOVE_EVENT_SUCCESS,
  REMOVE_EVENT_FAIL
} from './actionTypes'

export const createEventStart = () => ({
  type: CREATE_EVENT_START
})

export const createEventSuccess = payload => ({
  type: CREATE_EVENT_SUCCESS,
  payload
})

export const createEventFail = payload => ({
  type: CREATE_EVENT_FAIL,
  payload
})

export const createEvent = payload => dispatch => {
  dispatch(createEventStart())
  axios
    .post('/events', payload)
    .then(res => {
      dispatch(createEventSuccess(res.data))
    })
    .catch(err => {
      console.log('ERRORS', err)
      const error = err.response && err.response.data ? err.response.data : err
      dispatch(createEventFail(error))
      dispatch(notify({ message: error.message, type: 'danger' }))
    })
}

export const removeEventStart = () => ({
  type: REMOVE_EVENT_START
})

export const removeEventSuccess = payload => ({
  type: REMOVE_EVENT_SUCCESS,
  payload
})

export const removeEventFail = payload => ({
  type: REMOVE_EVENT_FAIL,
  payload
})

export const removeEvent = eventId => dispatch => {
  dispatch(removeEventStart())
  axios
    .delete(`/events/${eventId}`)
    .then(res => {
      dispatch(removeEventStart(res.data))
    })
    .catch(err => {
      console.log('ERRORS', err)
      const error = err.response && err.response.data ? err.response.data : err
      dispatch(removeEventFail(error))
      dispatch(notify({ message: error.message, type: 'danger' }))
    })
}
