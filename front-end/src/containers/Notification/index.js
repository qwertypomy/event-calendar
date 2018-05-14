import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Snackbar from 'material-ui/Snackbar'

import { hideNotification } from '../../actions/notification'
import { red600, cyan600 } from 'material-ui/styles/colors/'

class Notification extends Component {
  render() {
    const { isShown, message, type, hideNotification } = this.props
    return (
      <Snackbar
        bodyStyle={{ backgroundColor: type === 'danger' ? 'rgb(244, 67, 54, 0.1)' : 'rgb(0, 188, 212, 0.1)' }}
        contentStyle={{ color: type === 'danger' ? red600 : cyan600 }}
        open={!!isShown}
        message={message ? message : ''}
        autoHideDuration={4000}
        onRequestClose={hideNotification}
      />
    )
  }
}

const mapStateToProps = state => ({
  isShown: state.notification.isShown,
  message: state.notification.message,
  type: state.notification.type
})

Notification.propTypes = {
  hideNotification: PropTypes.func.isRequired,
  isShown: PropTypes.bool.isRequired,
  message: PropTypes.string,
  type: PropTypes.string
}

const mapDispatchToProps = dispatch => ({
  hideNotification: authToken => dispatch(hideNotification(authToken))
})

export default connect(mapStateToProps, mapDispatchToProps)(Notification)
