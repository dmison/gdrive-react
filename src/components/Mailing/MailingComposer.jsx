import React from 'react';
import {RecipientsManager} from '../Recipient';

const MailingComposer = (props) => {

  if (props.mailing === null){
    return <div>No mailing with UUID {props.uuid}.</div>;
  }

  return (
    <div>
      <h4>{props.mailing.name}</h4>
      <RecipientsManager  recipients={props.recipients}
                          addRecipient={ (name,email)=>{ props.addRecipient(props.uuid, name, email); } }
                          delRecipient={ (id)=>{ props.delRecipient(props.uuid, id); } } />
    </div>
  );
};

MailingComposer.propTypes = {
  uuid: React.PropTypes.string,
  recipients: React.PropTypes.array,
  mailing: React.PropTypes.object,
  addRecipient: React.PropTypes.func,
  delRecipient: React.PropTypes.func
};

export default MailingComposer;
