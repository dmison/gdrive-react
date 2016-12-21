import React from 'react';
import {Link} from 'react-router';
import {name} from '!json!../../package.json';

const App = (props) => {
  return (
    <div>

      <nav className='navbar navbar-default'>
        <div className='container-fluid'>
          <div className='navbar-header'>
            <a className='navbar-brand' href='#'> {name} </a>
          </div>
          <ul className='nav navbar-nav'>
            <li><Link to=''>home</Link></li>
            <li><Link to='mailings'>Mailings</Link></li>
          </ul>
        </div>
      </nav>

      <div className='container'>
        {props.children}
      </div>
    </div>
  );

};


App.propTypes = {
  children: React.PropTypes.node
};

export default App;
