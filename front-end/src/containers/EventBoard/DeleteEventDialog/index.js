import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import pad from '../../../helpers/pad'
import { removeEvent } from '../../../actions/event'
import { hideDeleteEventDialog } from '../../../actions/deleteEventDialog'

import { Dialog, FlatButton } from 'material-ui'

class DeleteEventDialog extends Component {
  formatTime = time => {
    const { beginningHour } = this.props
    const hour = Math.floor(time / 60) + beginningHour
    const minute = time % 60
    return pad(hour) + ':' + pad(minute)
  }

  render() {
    const { loading, hideDeleteEventDialog, removeEvent, event } = this.props

    const actions = [
      <FlatButton label="Cancel" onClick={hideDeleteEventDialog} />,
      <FlatButton label="Delete" secondary onClick={() => removeEvent(event)} disabled={loading} />
    ]

    return (
      <Dialog
        title={this.formatTime(event.start) + ' - ' + this.formatTime(event.start + event.duration)}
        actions={actions}
        modal={true}
        open={true}
      >
        {event.title}
      </Dialog>
    )
  }
}

DeleteEventDialog.propTypes = {
  removeEvent: PropTypes.func.isRequired,
  hideDeleteEventDialog: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  event: PropTypes.object.isRequired,
  beginningHour: PropTypes.number.isRequired
}

const mapStateToProps = state => ({
  loading: state.event.loading,
  event: state.deleteEventDialog.event
})

const mapDispatchToProps = dispatch => ({
  removeEvent: event => dispatch(removeEvent(event)),
  hideDeleteEventDialog: () => dispatch(hideDeleteEventDialog())
})

export default connect(mapStateToProps, mapDispatchToProps)(DeleteEventDialog)
