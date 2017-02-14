// https://forum.vuejs.org/t/webpack-doesnt-export-font-awesome-icons-correctly/980/10

require('font-awesome/css/font-awesome.css');
require('./bootstrap/bootstrap.less');
require ('./react-select-less/select.less');

import React from 'react';
import {render} from 'react-dom';
import {Router, IndexRoute, Route, hashHistory} from 'react-router';
import {Provider} from 'react-redux';

import App from './components/App.jsx';
import home from './components/Home';
import about from './components/About';
import {recipientsplaceholder} from './components/Recipient';
import {MailingsManagerContainer} from './components/Mailing';
import {MailingComposerContainer} from './components/Mailing';

// import gdad from './gdad.js';
import store from './store.js';

render(<Provider store={store}>
  <Router history={hashHistory}>
    <Route path='/' component={App}>
      <IndexRoute component={home} />
      <Route path='mailings' component={MailingsManagerContainer} />
      <Route path='mailings/:uuid' component={MailingComposerContainer} />
      <Route path='recipients' component={recipientsplaceholder} />
      <Route path='about' component={about} />


    </Route>
  </Router>
</Provider>, document.getElementById('app'));

// require('google-client-api')().then((gapi)=>{
//   console.log('initializing...');
//
//   var CLIENT_ID = '396884850311-nudjgl5o8i1p2ag9932s6ddl81f7pov2.apps.googleusercontent.com';
//   var config = gdad('config.json', CLIENT_ID, gapi);
//   var loggedIn = false;
//   // renderApp('');
//   config.read().then(function(data){
//     if(data){
//       loggedIn = true;
//       renderApp(data.thisthing);
//     } else {
//       changeData(''); //sets defaults
//
//     }
//   }, function(){
//     //not authenticated so take care of that
//     renderApp('');
//     console.log('you need to log in first');
//     config.read().then(function(data){
//       if(data){
//         loggedIn = true;
//         renderApp(data.thisthing);
//       } else {
//         changeData(''); //sets defaults
//       }
//     });
//   });
//
//   // var renderApp = function(data){
//   //   // console.log('display: ', data);
//   //   var label = document.getElementById('theValue');
//   //   label.textContent = data;
//   // };
//
//   var changeData = function(data){
//     config.save({thisthing: data});
//     renderApp(data);
//   };
//
//   var renderApp = function(data){
//     render( <App value={data} loggedIn={loggedIn} save={changeData}/>, document.getElementById('app') );
//   };
//
//
// });
