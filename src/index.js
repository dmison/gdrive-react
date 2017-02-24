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
import {RecipientsGlobalListContainer} from './components/Recipient';
import {MailingsManagerContainer} from './components/Mailing';
import {MailingComposerContainer} from './components/Mailing';

import store from './store.js';

render(<Provider store={store}>
  <Router history={hashHistory}>
    <Route path='/' component={App}>
      <IndexRoute component={home} />
      <Route path='mailings' component={MailingsManagerContainer} />
      <Route path='mailings/:uuid' component={MailingComposerContainer} />
      <Route path='recipients' component={RecipientsGlobalListContainer} />
      <Route path='about' component={about} />


    </Route>
  </Router>
</Provider>, document.getElementById('app'));
