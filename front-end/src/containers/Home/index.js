import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import * as authActions from '../../actions/auth'

import Header from '../Header'
import Notification from '../Notification'

class Home extends Component {
  componentWillMount() {
    if (localStorage.getItem('AUTH_TOKEN')) this.props.authorize()
  }

  render() {
    return (
      <Fragment>
        <Header />
        <Notification />
      </Fragment>
    )
  }
}

Home.propTypes = {
  authorize: PropTypes.func.isRequired
}

const mapDispatchToProps = dispatch => ({
  authorize: authToken => dispatch(authActions.authorize(authToken))
})

export default connect(null, mapDispatchToProps)(Home)
