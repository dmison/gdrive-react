import React from 'react';
var Base64 = require('js-base64').Base64;
import contentForRecipient from '../Content/ContentForRecipient.js';
import {getEmail, isValid} from '../Recipient/utils.js';
import Modal from 'react-bootstrap/lib/Modal';
import eachOfLimit from 'async/eachOfLimit';

class EmailSender extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      status: [],
      sending: false,
      abort: false
    };
    this._sendEmail = this._sendEmail.bind(this);
  }

  componentWillReceiveProps(newProps){
    if(newProps.show && !this.props.show){
      this.setState({status: this.props.recipients.filter((r)=>{ return isValid(r.detail); }).map((recipient)=>{
        return {
          id: recipient.id,
          detail: recipient.detail,
          sent: ''
        };
      }), sending: false});

    }

  }

  render(){

    const invalidStyle = {
      backgroundColor: 'red',
      color: 'white',
      padding: '3px 7px',
      borderRadius: '3px'
    };
    const areInvalidRecipients = this.props.recipients.length > this.state.status.length;

    return (
      <Modal show={this.props.show}>
        <Modal.Header style={{padding: '7px'}}>
          <Modal.Title style={{display: 'inline-block', paddingTop: '3px', marginLeft: '7px'}}>Send Email</Modal.Title>
            <button
              disabled={this.state.sending}
              className='btn btn-default'
              style={{fontSize:12, paddingBottom: 5, margin: '0px', float: 'right'}}
              onClick={this.props.onDone}>
                Close <i className='fa fa-times' aria-hidden='true'></i>
            </button>
            <button
              className='btn btn-success'
              style={{fontSize:12, paddingBottom: 5, margin: '0px 10px 0px 0px', float: 'right'}}
              disabled={this.state.status.length === 0 || this.state.sending}
              onClick={this._sendEmail}>
                {this.state.sending? 'Sending ':'Send '}
                {this.state.sending? <i className="fa fa-circle-o-notch fa-spin" aria-hidden="true"></i>:<i className='fa fa-paper-plane-o' aria-hidden='true'></i>}
            </button>
            <button
              className='btn btn-danger'
              style={{display:this.state.sending? 'block':'none',fontSize:12, paddingBottom: 5, margin: '0px 10px 0px 0px', float: 'right'}}
              onClick={()=>{this.setState({abort: true});}}>
                Abort <i className='fa fa-warning' aria-hidden='true'></i>
            </button>

        </Modal.Header>
        <Modal.Body>

          <h4>{areInvalidRecipients?'Valid ':''}Recipients {areInvalidRecipients?<small>{this.state.status.length} valid of {this.props.recipients.length}</small>:''}</h4>
          <ul style={{listStyleType: 'none', paddingLeft: 0}}>
            {this.state.status.map((r)=>{
              return (
                <li key={r.id}>
                  {r.detail} <ShowStatus msg={r.sent} />
                </li>
              );
            })}
          </ul>

          {areInvalidRecipients?<div style={{marginTop: '20px'}}>
            <h4>{this.props.recipients.length - this.state.status.length} Invalid Recipient{this.props.recipients.length - this.state.status.length>1?'s':''} <small> No email will be sent to {this.props.recipients.length - this.state.status.length>1?'these':'it'}.</small></h4>
            <ul style={{listStyleType: 'none', paddingLeft: 0}}>
              {this.props.recipients.filter((r)=>{ return !isValid(r.detail); }).map((r)=>{
                return (
                  <li key={r.id} >
                    <span style={invalidStyle}>{r.detail}</span>
                  </li>
                );

              })}
            </ul>
          </div>:''}
        </Modal.Body>
      </Modal>
    );
  }

  _sendEmail(){
    if(this.context.gapi !== null){
      this.setState({sending: true, status: this.state.status.map((s)=>{
        s.sent = 'waiting';
        return s;
      })});
      const emails = this.state.status.map((r)=>{
        return {
          recipient: r.id,
          msg: `To: ${getEmail(r.detail)}\r\nSubject: ${this.props.subject}\r\n\r\n${contentForRecipient(this.props.content, r.id).join('\r\n\r\n')}`
        };
      });

      eachOfLimit(
        emails,
        2,
        (email, index, callback)=>{
          if(this.state.abort){
            this.setState({status: this.state.status.map((s)=>{
              s.sent = (s.id === email.recipient)? 'aborted': s.sent;
              return s;
            })}, callback());
          } else {
            const base64EncodedMsg = Base64.encodeURI(email.msg);
            this.setState({status: this.state.status.map((s)=>{
              s.sent = (s.id === email.recipient)? 'sending': s.sent;
              return s;
            })});
            this.context.gapi.client.gmail.users.messages.send({
              'userId': 'me',
              'resource': {
                'raw': base64EncodedMsg
              }
            }).then(()=>{
              this.setState({status: this.state.status.map((s)=>{
                s.sent = (s.id === email.recipient)? 'yes': s.sent;
                return s;
              })}, callback());
            }, (reason)=>{
              this.setState({status: this.state.status.map((s)=>{
                s.sent = (s.id === email.recipient)? reason.result.error.message: s.sent;
                return s;
              })}, callback());
            });
          }
        },
        ()=>{
          this.setState({sending: false, abort: false});
        }
      );
    }
  }
}

EmailSender.contextTypes = {
  gapi: React.PropTypes.object
};

EmailSender.propTypes = {
  show: React.PropTypes.bool,
  onDone: React.PropTypes.func,
  subject: React.PropTypes.string,
  content: React.PropTypes.array,
  recipients: React.PropTypes.array
};

const ShowStatus = (props) => {
  if(props.msg === 'yes')return <span className='label label-success'>Sent</span>;
  if(props.msg === 'sending')return <span className='label label-info'><i className="fa fa-circle-o-notch fa-spin" aria-hidden="true"></i> sending</span>;
  if(props.msg === 'waiting')return <span><i className="fa fa-circle-o-notch fa-spin" aria-hidden="true"></i> waiting</span>;
  if(props.msg === 'aborted')return <span className='label label-danger'>{props.msg}</span>;
  return <span className='label label-warning'>{props.msg}</span>;
};

ShowStatus.propTypes = {
  msg: React.PropTypes.string
};

export default EmailSender;
