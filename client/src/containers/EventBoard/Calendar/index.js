import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import _ from 'lodash'

import pad from '../../../helpers/pad'

import { showDeleteEventDialog } from '../../../actions/deleteEventDialog'

import './index.scss'

const timeSlotHeigth = 21 // px
const timeSlotMaxWidth = 200 // px

class Calendar extends Component {
  state = {
    eventsContainerWidth: 0
  }

  timeContainer = React.createRef()

  componentDidMount() {
    this.updateWindowDimensions()
    window.addEventListener('resize', this.updateWindowDimensions)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions)
  }

  updateWindowDimensions = () => this.setState({ eventsContainerWidth: this.timeContainer.current.offsetWidth - 62 })

  componentWillMmount() {
    const { events, endHour, beginningHour, stepMinute } = this.props
    if (events.length) this.extendEventsProp(events, endHour, beginningHour, stepMinute)
  }

  componentWillReceiveProps(nextProps) {
    const { events, endHour, beginningHour, stepMinute } = nextProps
    if (!_.isEqual(events, this.props.events)) this.extendEventsProp(events, endHour, beginningHour, stepMinute)
  }

  /**
   * Calculate and set .startSlotIndex, .endSlotIndex, .columnsNumber, .number for each event
   */
  extendEventsProp(events, endHour, beginningHour, stepMinute) {
    const timeSlotsNumber = (endHour - beginningHour) * (60 / stepMinute) + 1
    const slotsEvents = _.times(timeSlotsNumber, () => Array.apply(null, Array(events.length)))

    events.forEach((event, eventIndex) => {
      event.startSlotIndex = Math.floor(event.start / stepMinute)
      event.endSlotIndex = Math.ceil((event.start + event.duration) / stepMinute)
      event.columnsNumber = 1

      let toEventIndex = 0

      for (let slotIndex = event.startSlotIndex; slotIndex < event.endSlotIndex; slotIndex++) {
        if (slotsEvents[slotIndex][toEventIndex] !== undefined)
          toEventIndex = slotsEvents[slotIndex].indexOf(undefined, toEventIndex)
      }

      for (let slotIndex = event.startSlotIndex; slotIndex < event.endSlotIndex; slotIndex++) {
        slotsEvents[slotIndex][toEventIndex] = eventIndex
      }
    })

    slotsEvents.forEach((slotEvents, slotEventsI) => {
      slotEvents.forEach((eventIndex, eventNumber) => {
        if (eventIndex !== undefined) {
          events[eventIndex].number = eventNumber
          const slotEventsLength = _.findLastIndex(slotEvents, event => event !== undefined) + 1
          events[eventIndex].columnsNumber = Math.max(slotEventsLength, events[eventIndex].columnsNumber)
        }
      })
    })
  }

  render() {
    const { events, beginningHour, endHour, showDeleteEventDialog } = this.props
    const { eventsContainerWidth } = this.state

    /*
     * timeRange - array of formated time strings
     * [beginningHour, ... , endHour] with 30 min step
     * e.g. ['08:00', '08:30', ..., '17:00']
     */
    const timeRange = _.range((endHour - beginningHour) * 2 + 1).map(
      i => pad(beginningHour + Math.floor(i / 2)) + ':' + pad((i % 2) * 30)
    )

    return (
      <div className="container calendar">
        <ul ref={this.timeContainer} className="time-container list">
          {events.map((event, i) => (
            <div
              className="event"
              onClick={() => showDeleteEventDialog(event)}
              style={{
                top: event.startSlotIndex * timeSlotHeigth + 'px',
                left: Math.min(eventsContainerWidth / event.columnsNumber, timeSlotMaxWidth) * event.number + 'px',
                width: eventsContainerWidth / event.columnsNumber + 'px',
                height: (event.endSlotIndex - event.startSlotIndex) * timeSlotHeigth + 'px'
              }}
              key={i}
            >
              {event.title}
            </div>
          ))}
          <div className="time-slot-group">
            {timeRange.map((time, i) => (
              <Fragment key={i}>
                <li className="list-item">
                  <div className="time-slot">
                    <div className="time">{time}</div>
                  </div>
                  <div className="list-item time-slot" />
                </li>
              </Fragment>
            ))}
          </div>
        </ul>
      </div>
    )
  }
}

Calendar.propTypes = {
  events: PropTypes.array.isRequired,
  beginningHour: PropTypes.number.isRequired,
  endHour: PropTypes.number.isRequired,
  stepMinute: PropTypes.number.isRequired,
  showDeleteEventDialog: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  events: state.event.events
})

const mapDispatchToProps = dispatch => ({
  showDeleteEventDialog: event => dispatch(showDeleteEventDialog(event))
})

export default connect(mapStateToProps, mapDispatchToProps)(Calendar)
