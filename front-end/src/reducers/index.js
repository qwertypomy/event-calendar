import authReducer from './auth'
import eventReducer from './event'

// UI
import notificationReducer from './notification'
import createEventFormReducer from './createEventForm'

export default {
  auth: authReducer,
  event: eventReducer,
  notification: notificationReducer,
  createEventForm: createEventFormReducer
}
