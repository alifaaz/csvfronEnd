/* eslint-disable no-undef */
/* eslint-disable import/first */
// import('module-alias/register')
// require('module-alias/register')

// console.log('@comp')
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
    /*****Ready function end*****/
   
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
