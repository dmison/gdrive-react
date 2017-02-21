import React from 'react';
var Base64 = require('js-base64').Base64;
import contentForRecipient from '../Content/ContentForRecipient.js';
import {getEmail, isValid, getName} from '../Recipient/utils.js';
import Modal from 'react-bootstrap/lib/Modal';
import Alert from 'react-bootstrap/lib/Alert';
import eachOfLimit from 'async/eachOfLimit';
import Handlebars from 'handlebars';

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
      this.setState({status: this.props.recipients.map((recipient)=>{
        const content = contentForRecipient(this.props.content, recipient.id).map((c)=>{
          return c===''?'':`${c}\n\n`;
        }).join('\r\n\r\n');
        let compiledBody = '';
        let contentError = false;
        try{
          const builder = Handlebars.compile(content);
          compiledBody = builder({ email:getEmail(recipient.detail), name:getName(recipient.detail) });
        } catch (e) {
          compiledBody = content;
          contentError = true;
        }
        return {
          id: recipient.id,
          detail: recipient.detail,
          sent: '',
          email: `To: ${getEmail(recipient.detail)}\r\nSubject: ${this.props.subject}\r\n\r\n${compiledBody}`,
          contentValid: !contentError,
          emailValid: isValid(recipient.detail)
        };
      }), sending: false});

    }

  }

  render(){

    const headerStyle = {
      // borderBottom: '1px solid #f0f0f0',
      paddingBottom: '5px',
      paddingTop: '0px'
    };

    const validRecipients = this.state.status.filter((s)=>{ return s.emailValid && s.contentValid; });
    const invalidRecipients = this.state.status.filter((s)=>{ return !s.emailValid; });
    const contentErrors = this.state.status.filter((s)=>{ return !s.contentValid; });

    const areValidRecipients = validRecipients.length > 0;
    const areInvalidRecipients = invalidRecipients.length > 0;
    const areContentErrors = contentErrors.length > 0;

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
              disabled={!this.context.gapi || !areValidRecipients}
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

          <Alert bsStyle='danger' style={{ display: this.context.gapi === null? 'block':'none'}}>
            <p><strong>Google API not initialized!</strong> You won't be able to send email.</p>
            <p><strong>Workaround:</strong> Go back to <a href='#mailings'>#/mailings</a>, refresh the page and wait until login/logout button appears.</p>
          </Alert>

          <Alert bsStyle='danger' style={{ display: areValidRecipients? 'none':'block'}}>
            <p><strong>You have no valid emails to send!</strong></p>
          </Alert>


          <div style={{marginTop: '0px', display: areValidRecipients? 'block':'none', padding: '1px 10px 1px 10px'}}>
            <h4 style={headerStyle}>{areInvalidRecipients?'Valid ':''}Recipients {areInvalidRecipients?<small>{validRecipients.length} valid of {this.props.recipients.length}</small>:''}</h4>
            <ul style={{listStyleType: 'none', paddingLeft: 0}}>
              {validRecipients.map((r)=>{
                return (
                  <li key={r.id}>
                    {r.detail} <ShowStatus msg={r.sent} />
                  </li>
                );
              })}
            </ul>
          </div>

          <div style={{backgroundColor: '#f2dede', marginTop: '20px',display: areContentErrors?'block':'none', borderRadius: '0px', borderLeft: '10px solid #d9534f', padding: '1px 10px 1px 10px'}}>
            <h4 style={headerStyle}>Content Errors <small>{contentErrors.length} recipient{contentErrors.length>1?'s':''} with invalid content. No email will be sent to {contentErrors.length>1?'these':'it'}.</small></h4>
            <ul style={{listStyleType: 'none', paddingLeft: 0}}>
              {contentErrors.map((r)=>{
                return (
                  <li key={r.id}>
                    {r.detail}
                  </li>
                );
              })}
            </ul>
          </div>

          <div style={{backgroundColor: '#f2dede',marginTop: '20px',display: areInvalidRecipients?'block':'none', borderRadius: '0px', borderLeft: '10px solid #d9534f', padding: '1px 10px 1px 10px'}}>
            <h4 style={headerStyle}>Invalid Email <small>{invalidRecipients.length} recipient{invalidRecipients.length>1?'s':''} with {invalidRecipients.length>1?'':'an '}invalid email address{invalidRecipients.length>1?'ess':''}. No email will be sent to {invalidRecipients.length>1?'these':'it'}.</small></h4>
            <ul style={{listStyleType: 'none', paddingLeft: 0}}>
              {invalidRecipients.map((r)=>{
                return (
                  <li key={r.id} >
                    {r.detail}
                  </li>
                );
              })}
            </ul>
          </div>

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
      const emails = this.state.status.filter((s)=>{ return s.emailValid && s.contentValid; });

      eachOfLimit(
        emails,
        2,
        (email, index, callback)=>{
          if(this.state.abort){
            // mark as aborted
            this.setState({status: this.state.status.map((s)=>{ s.sent = (s.id === email.id)? 'aborted': s.sent; return s; })}, ()=>{ callback(); });
          } else {
            const base64EncodedMsg = Base64.encodeURI(email.email);
            // mark as sending
            this.setState({status: this.state.status.map((s)=>{ s.sent = (s.id === email.id)? 'sending': s.sent; return s; })});
            this.context.gapi.client.gmail.users.messages.send({
              'userId': 'me',
              'resource': {
                'raw': base64EncodedMsg
              }
            }).then(()=>{
              // success
              this.setState({status: this.state.status.map((s)=>{ s.sent = (s.id === email.id)? 'yes': s.sent; return s; })}, ()=>{ callback(); });
            }, (reason)=>{
              // failure
              this.setState({status: this.state.status.map((s)=>{ s.sent = (s.id === email.id)? reason.result.error.message: s.sent; return s; })}, ()=>{ callback(); });
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
