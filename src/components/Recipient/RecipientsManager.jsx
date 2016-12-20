import React from 'react';

class RecipientsManager extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      adding: false
    };
  }

  render() {
    return (
      <div>
        <h4>Recipients</h4>
        <ul>
          <li>
            {this.state.adding ? <AddNewRecipientControl
              save={(name, email)=>{ this.props.addRecipient(name, email); this.setState({ adding: false});}}
              cancel={()=>{ this.setState({ adding: false}); }} /> : <button onClick={()=>{ this.setState({ adding: true}); }}>Add New</button>}
          </li>
          {this.props.recipients.map((recipient, index)=>{
            return <li key={index}>{recipient.name} {recipient.email} <button onClick={()=>{ this.props.delRecipient(recipient.id); }}>-</button></li>;
          })}
          </ul>
      </div>
    );
  }



}

RecipientsManager.propTypes = {
  mailing: React.PropTypes.string,
  recipients: React.PropTypes.array,
  addRecipient: React.PropTypes.func,
  delRecipient: React.PropTypes.func
};


class AddNewRecipientControl extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      name: '',
      email: ''
    };
  }

  componentDidMount(){
    this.nameEditBox.focus();
  }

  render(){
    return (
      <div>
        <input ref={(input)=>{ this.nameEditBox = input; }} type='text' value={this.state.name} onChange={(event)=>{ this.setState({name:event.target.value}); }} />
        <input type='text' value={this.state.email} onChange={(event)=>{ this.setState({email:event.target.value}); }} />
        <button onClick={()=>{this.props.save(this.state.name, this.state.email);}}>Save</button>
        <button onClick={this.props.cancel}>Cancel</button>
      </div>
    );
  }

}

AddNewRecipientControl.propTypes = {
  save: React.PropTypes.func,
  cancel: React.PropTypes.func
};


export default RecipientsManager;
