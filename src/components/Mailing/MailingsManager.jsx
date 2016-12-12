import React from 'react';
// import ReactDOM from 'react-dom';
import {Link} from 'react-router';

class MailingsManager extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      adding: false,
      newName: ''
    };
  }

  render(){

    return (

      <div>
        <h3>Mailings</h3>
        {this.state.adding ? <AddNewMailingControl
          save={(name)=>{ this.props.addMailing(name); this.setState({ adding: false});}}
          cancel={()=>{ this.setState({ adding: false}); }} /> : <button onClick={()=>{ this.setState({ adding: true}); }}>Add New</button>}
        <ul>
          {this.props.mailings.map((mailing)=>{
            return <li key={mailing.id}><Link to={`mailing/${mailing.id}`}>{mailing.name}</Link></li>;
          })}
        </ul>
      </div>
    );
  }

}

MailingsManager.propTypes = {
  mailings: React.PropTypes.array,
  addMailing: React.PropTypes.func
};

class AddNewMailingControl extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      name: ''
    };
  }

  componentDidMount(){
    this.nameEditBox.focus();
  }

  render(){
    return (
      <div>
        <input ref={(input)=>{ this.nameEditBox = input; }} type='text' value={this.state.name} onChange={(event)=>{ this.setState({name:event.target.value}); }} />
        <button onClick={()=>{this.props.save(this.state.name);}}>Save</button>
        <button onClick={this.props.cancel}>Cancel</button>
      </div>
    );
  }

}

AddNewMailingControl.propTypes = {
  save: React.PropTypes.func,
  cancel: React.PropTypes.func
};

export default MailingsManager;
