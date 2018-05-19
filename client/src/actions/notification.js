import { SET_NOTIFICATION, HIDE_NOTIFICATION } from './actionTypes'

export const notify = payload => ({
  type: SET_NOTIFICATION,
  payload
})

export const hideNotification = () => ({
  type: HIDE_NOTIFICATION
})
