import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import LC from 'leancloud-storage';

//初始化Leancloud服务
const APP_ID = 'Me872SwKDBgiMyDLnneSS9T3-gzGzoHsz';
const APP_KEY = '8hyFXTocldzAvkPSr0i5ba0C';

LC.init({
  appId: APP_ID,
  appKey: APP_KEY
});

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
