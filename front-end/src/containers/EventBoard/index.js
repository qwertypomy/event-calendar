import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
// import { removeEvent } from '../../actions/event'

import CreateEventButton from './CreateEventButton'
import CreateEventForm from './CreateEventForm'

class EventBoard extends Component {
  render() {
    return <Fragment>{this.props.isFormShown ? <CreateEventForm /> : <CreateEventButton />}</Fragment>
  }
}

EventBoard.propTypes = {
  isFormShown: PropTypes.bool.isRequired
}

const mapStateToProps = state => ({
  isFormShown: state.createEventForm.isShown
})

const mapDispatchToProps = dispatch => ({
  // removeEvent: eventId => dispatch(removeEvent(eventId))
})

export default connect(mapStateToProps, mapDispatchToProps)(EventBoard)
