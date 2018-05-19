import { SHOW_DELETE_EVENT_DIALOG, HIDE_DELETE_EVENT_DIALOG } from './actionTypes'

export const showDeleteEventDialog = payload => ({
  type: SHOW_DELETE_EVENT_DIALOG,
  payload
})

export const hideDeleteEventDialog = () => ({
  type: HIDE_DELETE_EVENT_DIALOG
})
