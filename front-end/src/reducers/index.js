import authReducer from './auth'
import eventReducer from './event'

// UI
import notificationReducer from './notification'
import createEventDialogReducer from './createEventDialog'
import deleteEventDialogReducer from './deleteEventDialog'

export default {
  auth: authReducer,
  event: eventReducer,
  notification: notificationReducer,
  createEventDialog: createEventDialogReducer,
  deleteEventDialog: deleteEventDialogReducer
}
