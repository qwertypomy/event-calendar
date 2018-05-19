import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { authorize } from '../../actions/auth'

import Header from '../Header'
import Notification from '../Notification'
import EventBoard from '../EventBoard'

class Home extends Component {
  componentWillMount() {
    this.props.authorize()
  }

  render() {
    return (
      <Fragment>
        <Header />
        <Notification />
        <EventBoard />
      </Fragment>
    )
  }
}

Home.propTypes = {
  authorize: PropTypes.func.isRequired
}

const mapDispatchToProps = dispatch => ({
  authorize: authToken => dispatch(authorize(authToken))
})

export default connect(null, mapDispatchToProps)(Home)
