import React, { PureComponent } from 'react';
import compose from 'recompose/compose'
import injectSheet from 'react-jss'
import { connect } from 'react-redux';
import { Route, BrowserRouter } from 'react-router-dom';
import SearchPage from './search-page/containers/SearchPage'

const styleSheet = theme => ({
  container: {
  },
})

const style = injectSheet(styleSheet)

class App extends PureComponent {
  render() {
    const { classes} = this.props;

    return (
        <BrowserRouter>
          <div className={classes.container}>
            <Route exact path="/" component={SearchPage} />
          </div>
        </BrowserRouter>
    );
  }
}

export default compose(
  style,
  connect(null)
)(App)