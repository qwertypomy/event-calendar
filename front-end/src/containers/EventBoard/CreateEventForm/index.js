import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createEvent } from '../../../actions/event'
import { hideCreateEventForm } from '../../../actions/createEventForm'

import { RaisedButton } from 'material-ui'

class CreateEventForm extends Component {
  render() {
    return <RaisedButton primary label="Create" onClick={this.props.hideCreateEventForm} />
  }
}

CreateEventForm.propTypes = {
  createEvent: PropTypes.func.isRequired,
  hideCreateEventForm: PropTypes.func.isRequired
}

const mapDispatchToProps = dispatch => ({
  createEvent: payload => dispatch(createEvent(payload)),
  hideCreateEventForm: payload => dispatch(hideCreateEventForm())
})

export default connect(null, mapDispatchToProps)(CreateEventForm)
