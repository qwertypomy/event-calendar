import React from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
// import registerServiceWorker from './registerServiceWorker'

import App from './App'

axios.defaults.baseURL = process.env.NODE_ENV === 'development' ? 'http://localhost:8080/api' : '/api'

ReactDOM.render(<App />, document.getElementById('root'))

// registerServiceWorker()
