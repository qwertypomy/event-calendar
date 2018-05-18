import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { showCreateEventForm } from '../../../actions/createEventForm'

import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentAdd from 'material-ui/svg-icons/content/add'

const CreateEventButton = ({ showCreateEventForm }) => (
  <FloatingActionButton onClick={showCreateEventForm} style={{ position: 'fixed', bottom: '3vh', right: '3vh', zIndex: 2 }}>
    <ContentAdd />
  </FloatingActionButton>
)

CreateEventButton.propTypes = {
  showCreateEventForm: PropTypes.func.isRequired
}

const mapDispatchToProps = dispatch => ({
  showCreateEventForm: () => dispatch(showCreateEventForm())
})

export default connect(null, mapDispatchToProps)(CreateEventButton)
