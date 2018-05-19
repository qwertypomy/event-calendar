import getMuiTheme from 'material-ui/styles/getMuiTheme'

import { red500 } from 'material-ui/styles/colors'

const customTheme = getMuiTheme({
  palette: {
    accent1Color: red500
  }
})

export default customTheme
