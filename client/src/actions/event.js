import uuidv1 from 'uuid/v1'

import axios from '../axios'
import { notify } from './notification'
import { hideCreateEventDialog } from './createEventDialog'
import { hideDeleteEventDialog } from './deleteEventDialog'

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
  const onSuccess = event => {
    dispatch(createEventSuccess({ event: event }))
    dispatch(hideCreateEventDialog())
    dispatch(notify({ message: 'Event created.', type: 'success' }))
  }

  if (!store.getState().auth.user) {
    return onSuccess({ ...payload, _id: uuidv1() })
  }

  const authToken = localStorage.getItem('AUTH_TOKEN')

  dispatch(createEventStart())
  axios({
    method: 'post',
    url: '/events',
    data: payload,
    headers: { Authorization: authToken }
  })
    .then(res => onSuccess(res.data.event))
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

export const removeEvent = event => dispatch => {
  const onSuccess = () => {
    dispatch(removeEventSuccess({ event: event }))
    dispatch(hideDeleteEventDialog())
    dispatch(notify({ message: 'Event removed.', type: 'success' }))
  }

  if (!store.getState().auth.user) {
    return onSuccess()
  }

  const authToken = localStorage.getItem('AUTH_TOKEN')

  dispatch(removeEventStart())
  axios({
    method: 'delete',
    url: `/events/${event._id}`,
    headers: { Authorization: authToken }
  })
    .then(res => onSuccess())
    .catch(err => {
      console.log('ERRORS', err)
      const error = err.response && err.response.data ? err.response.data : err
      dispatch(removeEventFail(error))
      dispatch(notify({ message: error.message, type: 'danger' }))
    })
}
