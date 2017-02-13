import React from 'react';
import {hashHistory} from 'react-router';
import {name} from '../../package.json';


import Navbar from 'react-bootstrap/lib/Navbar';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';

const App = (props) => {
  return (
    <div>

            <Navbar staticTop fluid inverse collapseOnSelect>
              <Navbar.Header>
                <Navbar.Brand>{name}</Navbar.Brand>
                <Navbar.Toggle />
              </Navbar.Header>
              <Navbar.Collapse>
              <Nav>
                <NavItem key={1} href="#" onClick={()=>{ hashHistory.push('/'); }}>Home</NavItem>
                <NavItem key={2} href="#" onClick={()=>{ hashHistory.push('/mailings'); }}>Mailings</NavItem>
                <NavItem key={3} href="#" onClick={()=>{ hashHistory.push('/about'); }}>Abouts</NavItem>

              </Nav>
              </Navbar.Collapse>
            </Navbar>


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
