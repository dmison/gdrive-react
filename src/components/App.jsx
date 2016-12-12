import React from 'react';
import {Link} from 'react-router';

const App = (props) => {
  return (
    <div>
      <h1>Email Thingy</h1>
        <Link to=''>home</Link>
      <Link to='mailings'>Mailings</Link>

      {props.children}
    </div>
  );

};


App.propTypes = {
  children: React.PropTypes.node
};

export default App;
