import React from 'react';
import './recipient.scss';
import {isValid} from './utils.js';

class Recipient extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      editing: false,
      inputWidth: 50
    };
  }

  render(){
    const valid = isValid(this.props.recipient.detail)? '':'invalid';

    const view = this.state.editing? (
      <span className={`recipient editing ${valid}`}>
        <input
          style={{width: this.state.inputWidth}}
          ref={(input)=>{this.inputbox = input;} }
          onChange={(event)=>{ this.props._update(event.target.value); }}
          type='text'
          title='edit recipient'
          placeholder='add recipient'
          value={ this.props.recipient.detail }
          onBlur={()=>{this.setState({editing: false});}}
          onKeyUp={(event)=>{ if (event.key === 'Enter'){ this.setState({editing: false}); }}}
          />
      </span>

    ) : (
        <span className={`recipient viewing ${valid}`} ref={(input)=>{this.viewer = input;} }>
          <span onClick={()=>{ this.setState({editing: true, inputWidth: this.viewer.offsetWidth}, ()=>{this.inputbox.focus();}); }}>{this.props.recipient.detail}</span>
          <span className='delRecipient'> <i onClick={()=>{ this.props._remove(); }} className="fa fa-times" style={{color: '#982d22'}}aria-hidden="true"></i></span>
      </span>
    );

    return view;
  }

}

Recipient.propTypes = {
  recipient: React.PropTypes.object,
  _remove: React.PropTypes.func,
  _update: React.PropTypes.func
};

export default Recipient;
