import React from 'react';
import ReactDOM from 'react-dom';
import App from './blockchain-project/App';
import * as serviceWorker from './serviceWorker';
import store from './blockchain-project/core/createStore'
import { JssProvider, ThemeProvider } from 'react-jss'
import { default as theme } from './theme'
import { Provider } from 'react-redux';
import jss from 'react-jss/lib/jss';

const Root = () => (
    <Provider store={store}>
        <JssProvider jss={jss}>
            <ThemeProvider theme={theme}>
                <App />
            </ThemeProvider>
        </JssProvider>
    </Provider>
  )  

ReactDOM.render(<Root />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
