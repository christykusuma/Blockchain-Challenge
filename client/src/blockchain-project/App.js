import React, { PureComponent } from 'react';
import compose from 'recompose/compose'
import injectSheet from 'react-jss'
import { connect } from 'react-redux';
import { Route, BrowserRouter } from 'react-router-dom';
import AddressPage from './address-page/containers/AddressPage'

const styleSheet = theme => ({
  appContainer: {
  },
})

const style = injectSheet(styleSheet)

class App extends PureComponent {
  render() {
    return (
        <BrowserRouter>
          <div className="App">
            <Route exact path="/" component={AddressPage} />
          </div>
        </BrowserRouter>
    );
  }
}

export default compose(
  style,
  connect(null)
)(App)