import React from 'react';
var Base64 = require('js-base64').Base64;
import contentForRecipient from '../Content/ContentForRecipient.js';
import {getEmail, isValid} from '../Recipient/utils.js';

class EmailSender extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      selected: []
    };
  }

  // componentDidMount(){
  //   this.setState({recipients: this.props.recipients});
  // }
  //
  // componentWillUpdate(nextProps){
  //   this.setState({recipients: nextProps.recipients});
  // }
  // shouldComponentUpdate(nextProps, nextState, nextContext){
  //   console.log(nextContext);
  //   return true;
  // }

  render(){

    const messages = this.state.selected.map((r)=>{
      return `To: ${getEmail(r.detail)}\r\nSubject: ${this.props.subject}\r\n\r\n${contentForRecipient(this.props.content, r.id).join('\r\n\r\n')}`;
    });

    const invalidStyle = {
      backgroundColor: 'red',
      color: 'white'
    };

    return (
      <div>
        <ul>
          {this.props.recipients.map((r)=>{
            const checked = this.state.selected.findIndex((element)=>{
              return element.id === r.id;
            }) !== -1;
            return <li key={r.id}
                              style={isValid(r.detail)?{}:invalidStyle}>
              <input  type='checkbox'

                      checked={isValid(r.detail) && checked}
                      onChange={(event)=>{
                        if(event.target.checked && isValid(r.detail)){
                          this.setState({selected: this.state.selected.concat(r)});
                        } else {
                          this.setState({selected: this.state.selected.filter((selected)=>{
                            return selected.id !== r.id;
                          })});
                        }
                      }}/> {r.detail}</li>;
          })}
        </ul>

        <button
          className='btn btn-success'
          style={{width: 120, fontSize:16, paddingBottom: 7}}
          disabled={this.state.selected.length === 0}
          onClick={()=>{
            if(this.context.gapi !== null){
              messages.forEach((msg)=>{
                const base64EncodedMsg = Base64.encodeURI(msg);
                const request = this.context.gapi.client.gmail.users.messages.send({
                  'userId': 'me',
                  'resource': {
                    'raw': base64EncodedMsg
                  }
                });
                request.execute((result)=>{
                  console.log('so ...');
                  console.log(result);
                  if(typeof result.code === 'undefined') {
                    console.log('sent ok');
                  } else {
                    console.log('oh noes an error sending.');
                  }
                });
              });
            }
          }}>Send <i className='fa fa-paper-plane-o' aria-hidden='true'></i></button>

      </div>
    );
  }
}

EmailSender.contextTypes = {
  gapi: React.PropTypes.object
};

EmailSender.propTypes = {
  subject: React.PropTypes.string,
  content: React.PropTypes.array,
  recipients: React.PropTypes.array
};

export default EmailSender;
