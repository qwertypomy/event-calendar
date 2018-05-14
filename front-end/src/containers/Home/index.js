import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import * as authActions from '../../actions/auth'

import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentAdd from 'material-ui/svg-icons/content/add'

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
        <FloatingActionButton style={{ position: 'fixed', bottom: '3vh', right: '3vh' }}>
          <ContentAdd />
        </FloatingActionButton>
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
