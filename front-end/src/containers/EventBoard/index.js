import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import CreateEventButton from './CreateEventButton'
import CreateEventDialog from './CreateEventDialog'
import DeleteEventDialog from './DeleteEventDialog'
import Calendar from './Calendar'

const beginningHour = 8
const endHour = 17
const stepMinute = 15

class EventBoard extends Component {
  render() {
    const { isCreateEventDialogShown, isDeleteEventDialogShown } = this.props
    return (
      <Fragment>
        {isCreateEventDialogShown && <CreateEventDialog />}
        {isDeleteEventDialogShown && <DeleteEventDialog beginningHour={beginningHour} />}
        <CreateEventButton />
        <Calendar beginningHour={beginningHour} endHour={endHour} stepMinute={stepMinute} />
      </Fragment>
    )
  }
}

EventBoard.propTypes = {
  isCreateEventDialogShown: PropTypes.bool.isRequired,
  isDeleteEventDialogShown: PropTypes.bool.isRequired
}

const mapStateToProps = state => ({
  isCreateEventDialogShown: state.createEventDialog.isShown,
  isDeleteEventDialogShown: !!state.deleteEventDialog.event
})

export default connect(mapStateToProps)(EventBoard)
