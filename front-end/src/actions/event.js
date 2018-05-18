import axios from '../axios'
import { notify } from './notification'
import { hideCreateEventForm } from './createEventForm'

import { store } from '../store'

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
  if (!store.getState().auth.user) {
    dispatch(createEventSuccess({ event: payload }))
    dispatch(hideCreateEventForm())
    return
  }

  const authToken = localStorage.getItem('AUTH_TOKEN')

  dispatch(createEventStart())
  axios({
    method: 'post',
    url: '/events',
    data: payload,
    headers: { Authorization: authToken }
  })
    .then(res => {
      dispatch(createEventSuccess(res.data))
      dispatch(hideCreateEventForm())
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
  if (!store.getState().auth.user) return dispatch(removeEventSuccess({ event: { _id: eventId } }))

  const authToken = localStorage.getItem('AUTH_TOKEN')

  dispatch(removeEventStart())
  axios({
    method: 'delete',
    url: `/events/${eventId}`,
    headers: { Authorization: authToken }
  })
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
