import React from 'react';
import ReactDOM from 'react-dom';
import App from 'render/App';
import store from 'store';
import { Provider } from 'react-redux';
import 'render/index.scss';

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root'),
);
