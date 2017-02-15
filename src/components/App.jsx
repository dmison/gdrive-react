import React from 'react';
import {hashHistory} from 'react-router';
import {name} from '../../package.json';

import Navbar from 'react-bootstrap/lib/Navbar';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';

class App extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      gapi: null,
      signedIn: false,
      loginName: ''
    };
    this._updateSigninStatus = this._updateSigninStatus.bind(this);
  }

  componentDidMount(){
    require('google-client-api')().then((gapi)=>{
      console.log('initializing GAPI...');
      var CLIENT_ID = '1083074050385-cgb3btfhipjd45mhhecoiiqkug8noon9.apps.googleusercontent.com';
      var DISCOVERY_DOCS = ['https://www.googleapis.com/discovery/v1/apis/gmail/v1/rest', 'https://people.googleapis.com/$discovery/rest'];
      var SCOPES = 'https://www.googleapis.com/auth/gmail.readonly profile';

      gapi.client.init({
        discoveryDocs: DISCOVERY_DOCS,
        clientId: CLIENT_ID,
        scope: SCOPES
      }).then(function () {
        console.log('GAPI Initialized.');
        // Listen for sign-in state changes.
        gapi.auth2.getAuthInstance().isSignedIn.listen(this._updateSigninStatus);
        this.setState({gapi: gapi}, ()=>{
          // Handle the initial sign-in state.
          this._updateSigninStatus(this.state.gapi.auth2.getAuthInstance().isSignedIn.get());
        });

      }.bind(this));
    });
  }

  render(){

    const showLogControls = !(this.state.gapi === null);

    return (
      <div>
        <Navbar staticTop fluid inverse collapseOnSelect>
          <div className='container'>
          <Navbar.Header>
            <Navbar.Brand>{name}</Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav>
              <NavItem key={1} href="#" onClick={()=>{ hashHistory.push('/'); }}>Home</NavItem>
              <NavItem key={2} href="#" onClick={()=>{ hashHistory.push('/mailings'); }}>Mailings</NavItem>
              <NavItem key={3} href="#" onClick={()=>{ hashHistory.push('/recipients'); }}>Recipients</NavItem>
              <NavItem key={4} href="#" onClick={()=>{ hashHistory.push('/about'); }}>About</NavItem>
            </Nav>
            <Nav pullRight style={{display:showLogControls?'block':'none'}}>
              <NavItem onClick={()=>{
                if(this.state.signedIn){
                  console.log('signing out');
                  this.state.gapi.auth2.getAuthInstance().signOut();
                  this.state.gapi.auth2.getAuthInstance().disconnect();

                } else {
                  console.log('signing in');
                  this.state.gapi.auth2.getAuthInstance().signIn();
                }

              }}>
              {this.state.signedIn?'logout':'login'}
              </NavItem>
            </Nav>
            <Navbar.Text style={{color: '#fff ', fontStyle:'italic', marginRight:10}} pullRight>{this.state.loginName===''? '':`Welcome ${this.state.loginName} `}</Navbar.Text>
          </Navbar.Collapse>
        </div>
        </Navbar>

        <div className='container'>
          {this.props.children}
        </div>

      </div>
    );
  }


  _updateSigninStatus(isSignedIn) {

    if(isSignedIn){
      this.state.gapi.client.people.people.get({ resourceName: 'people/me' }).then((result)=>{
        this.setState({loginName: result.result.names[0].givenName});
      });
    } else {
      this.setState({loginName: ''});
    }

    this.setState({signedIn: isSignedIn});
  }


}

App.propTypes = {
  children: React.PropTypes.node
};

export default App;
