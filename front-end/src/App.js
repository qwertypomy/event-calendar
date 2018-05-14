import React from 'react'

import { Provider } from 'react-redux'
import { Route, Router, Redirect } from 'react-router'
// import { Switch } from 'react-router-dom'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import customTheme from './muiTheme'
import './index.scss'

import { store, history } from './store'

import Home from './containers/Home'

import 'bootstrap/scss/bootstrap.scss'

import fontawesome from '@fortawesome/fontawesome'
import faGooglePlusG from '@fortawesome/fontawesome-free-brands/faGooglePlusG'

fontawesome.library.add(faGooglePlusG)
export default () => (
  <MuiThemeProvider muiTheme={customTheme}>
    <Provider store={store}>
      <Router history={history}>
        <Route path="/" component={Home} />
        <Redirect from="*" to="/" />
      </Router>
    </Provider>
  </MuiThemeProvider>
)
