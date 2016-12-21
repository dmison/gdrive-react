import React from 'react';
import {Link} from 'react-router';
import {name} from '!json!../../package.json';

const App = (props) => {
  return (
    <div>

      <nav id='main-nav'>
        <div className='container'>
          <span className='navbar-brand'> {name} </span>
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
