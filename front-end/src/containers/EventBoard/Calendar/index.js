import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import _ from 'lodash'

import { removeEvent } from '../../../actions/event'

import './index.scss'

function pad(num) {
  var s = num + ''
  return s.length === 1 ? '0' + s : s
}

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

  render() {
    const { events, loading, beginningHour, endHour, stepMinute } = this.props
    const { eventsContainerWidth } = this.state

    const timeSlotsNumber = (endHour - beginningHour) * 4 + 2

    const slotsEvents = _.times(timeSlotsNumber - 1, () => [])

    events.forEach((event, eventIndex) => {
      event.startSlotIndex = Math.floor(event.start / stepMinute)
      event.endSlotIndex = Math.ceil((event.start + event.duration) / stepMinute)
      event.columnsNumber = 1
      event.number = 0
      for (let slotIndex = event.startSlotIndex; slotIndex < event.endSlotIndex; slotIndex++) {
        slotsEvents[slotIndex].push(eventIndex)
      }
    })

    slotsEvents.forEach((slotEvents, slotEventsII) => {
      slotEvents.forEach((eventIndex, eventNumber) => {
        events[eventIndex].number = Math.max(eventNumber, events[eventIndex].number)
        events[eventIndex].columnsNumber = Math.max(slotEvents.length, events[eventIndex].columnsNumber)
      })
    })

    const timeRange = _.range(timeSlotsNumber / 2).map(i => pad(beginningHour + Math.floor(i / 2)) + ':' + pad((i % 2) * 30))

    return (
      <div className="container calendar">
        <ul ref={this.timeContainer} className="time-container list">
          {events.map((event, i) => (
            <div
              className="event"
              style={{
                top: event.startSlotIndex * 21 + 'px',
                left: Math.min(eventsContainerWidth / event.columnsNumber, 200) * event.number + 'px',
                width: eventsContainerWidth / event.columnsNumber + 'px',
                height: (event.endSlotIndex - event.startSlotIndex - 1) * 21 + 'px'
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
  removeEvent: PropTypes.func.isRequired,
  events: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  beginningHour: PropTypes.number.isRequired,
  endHour: PropTypes.number.isRequired
}

const mapStateToProps = state => ({
  events: state.event.events,
  loading: state.event.loading
})

const mapDispatchToProps = dispatch => ({
  removeEvent: eventId => dispatch(removeEvent(eventId))
})

export default connect(mapStateToProps, mapDispatchToProps)(Calendar)
