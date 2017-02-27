import React from 'react';
import {contains} from 'underscore';
import './dropdown.scss';
import {getEmail} from './utils.js';

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
    //filter global recipients down to the ones that we have
    const available = this.props.globalRecipients.filter((gc)=>{
      return ( gc.detail.toUpperCase().startsWith(this.state.detail.toUpperCase()) ||
        getEmail(gc.detail).toUpperCase().startsWith(this.state.detail.toUpperCase())
      ) && !contains(this.props.recipients.map((r)=>{ return r.id; }), gc.id);
    });

    return (
      <div style={{display: 'inline'}}>
        <input
          style={{width:200}}
          ref={(input)=>{ this.detailEditBox = input; }}
          type='text'
          placeholder='[Name] [email]'
          value={this.state.name}
          onChange={(event)=>{ this.setState({detail:event.target.value}); }}
        />
      {this.state.detail === '' || available.length === 0 ?'':
        <ul className='dropdown'>
          {available.map((gr)=>{
            return <li className='dropdownItem' key={gr.id} onClick={()=>{ this.setState({detail: ''}); this.props.attachRecipient(gr.id); }}>{gr.detail}</li>;
          })}
        </ul>}

      <button onClick={()=>{this.props.save(this.state.detail);}}>Save</button>
        <button onClick={this.props.cancel}>Cancel</button>
      </div>
    );
  }

}

AddNewRecipientControl.propTypes = {
  save: React.PropTypes.func,
  cancel: React.PropTypes.func,
  globalRecipients: React.PropTypes.array,
  attachRecipient: React.PropTypes.func,
  recipients: React.PropTypes.array

};

export default AddNewRecipientControl;
