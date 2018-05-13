import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Snackbar from 'material-ui/Snackbar'

import { hideNotification } from '../../actions/notification'

class Notification extends Component {
  render() {
    const { isShown, message, type, hideNotification } = this.props
    return (
      <Snackbar
        className={`bg-${type}`}
        bodyStyle={{ 'backgroundColor': 'inherit' }}
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
