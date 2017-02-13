import React from 'react';
import Recipient from './Recipient.jsx';

const recipientBarStyle = {
  // backgroundColor: 'red'
};

class RecipientsManager extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      adding: false
    };
  }

  render() {
    return (
      <div style={recipientBarStyle}>
        <div style={{paddingBottom: 5}}>
          <b style={{display: 'inline-block', paddingRight: 5, width: 120}}>Recipients: </b>
          <ul style={{display: 'inline', paddingLeft: 0}}>
            {this.props.recipients.map((recipient, index)=>{
              return (
                <li style={{display: 'inline-block', listStyleType: 'none', marginBottom:6}} key={index}>
                  <Recipient recipient={recipient}
                    _remove={()=>{this.props.delRecipient(recipient.id);}}
                    _update={(detail)=>{ this.props.updateRecipient(recipient.id, detail);}}
                    />
                </li>
              );
            })}
            <li style={{display: 'inline-block', listStyleType: 'none'}}>
              {this.state.adding ? <AddNewRecipientControl
                save={(detail)=>{ this.props.addRecipient(detail); this.setState({ adding: false});}}
                cancel={()=>{ this.setState({ adding: false}); }} /> : <button onClick={()=>{ this.setState({ adding: true}); }}>+</button>}
            </li>

            </ul>
        </div>
      </div>
    );
  }


}

RecipientsManager.propTypes = {
  mailing: React.PropTypes.string,
  recipients: React.PropTypes.array,
  addRecipient: React.PropTypes.func,
  delRecipient: React.PropTypes.func,
  updateRecipient: React.PropTypes.func
};


class AddNewRecipientControl extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      detail: ''
    };
  }

  componentDidMount(){
    this.detailEditBox.focus();
  }

  render(){
    return (
      <div style={{display: 'inline'}}>
        <input
          ref={(input)=>{ this.detailEditBox = input; }}
          type='text'
          value={this.state.name}
          onChange={(event)=>{ this.setState({detail:event.target.value}); }}
        />
      <button onClick={()=>{this.props.save(this.state.detail);}}>Save</button>
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
