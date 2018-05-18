import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import CreateEventButton from './CreateEventButton'
import CreateEventForm from './CreateEventForm'
import Calendar from './Calendar'

class EventBoard extends Component {
  render() {
    const { isFormShown } = this.props
    return (
      <Fragment>
        {isFormShown && <CreateEventForm />}
        <CreateEventButton />
        <Calendar beginningHour={8} endHour={17} stepMinute={15} />
      </Fragment>
    )
  }
}

EventBoard.propTypes = {
  isFormShown: PropTypes.bool.isRequired
}

const mapStateToProps = state => ({
  isFormShown: state.createEventForm.isShown
})

export default connect(mapStateToProps)(EventBoard)
