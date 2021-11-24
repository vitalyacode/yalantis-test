import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './style.css'


import { Provider } from 'react-redux'
import { Store } from 'redux'

import configureStore, { IAppState } from './store/Store'


interface IProps {
  store: Store<IAppState>
}

const Root: React.FunctionComponent<IProps> = props => {
  return (
    <Provider store={props.store}>
      <App />
    </Provider>
  )
}

const store = configureStore()

ReactDOM.render(
  <React.StrictMode>
    <Root store={store} />
  </React.StrictMode>,
  document.getElementById('root')
);

