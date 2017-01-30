import React from 'react';
import {Link} from 'react-router';
import {name} from '../../package.json';

const App = (props) => {
  return (
    <div>

      <nav className="navbar navbar-inverse">
        <div className="container-fluid">
          <div className="navbar-header">
            <a className="navbar-brand" href="#">
              <Link to='/'>{name}</Link>
            </a>
            <ul className='nav navbar-nav'>
              <li><Link activeClassName='active' to='/'>Home</Link></li>
              <li><Link activeClassName='active' to='mailings'>Mailings</Link></li>
              <li><Link activeClassName='active' to='about'>About</Link></li>
            </ul>

          </div>
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
