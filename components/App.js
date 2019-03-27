const React = require('react')

import Grid from '@material-ui/core/Grid';

class App extends React.Component {
  render() {
    return (
      <Grid container>
        <Grid item md={6}>
          Test 1
        </Grid>
        <Grid item md={6}>
          Test 2
        </Grid>
      </Grid>
    )
  }
}

module.exports = App