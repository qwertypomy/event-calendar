import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { showCreateEventDialog } from '../../../actions/createEventDialog'

import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentAdd from 'material-ui/svg-icons/content/add'

const CreateEventButton = ({ showCreateEventDialog }) => (
  <FloatingActionButton onClick={showCreateEventDialog} style={{ position: 'fixed', bottom: '3vh', right: '3vh', zIndex: 2 }}>
    <ContentAdd />
  </FloatingActionButton>
)

CreateEventButton.propTypes = {
  showCreateEventDialog: PropTypes.func.isRequired
}

const mapDispatchToProps = dispatch => ({
  showCreateEventDialog: () => dispatch(showCreateEventDialog())
})

export default connect(null, mapDispatchToProps)(CreateEventButton)
