import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './antd.less';
import App from './components/App/App.component';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <App />,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
