import React from 'react';
import {RecipientsManager} from '../Recipient';
import {ContentManager} from '../Content';

const MailingComposer = (props) => {

  if (props.mailing === null){
    return <div>No mailing with UUID {props.uuid}.</div>;
  }
  
  return (
    <div>
      <h4>{props.mailing.name}</h4>
      <RecipientsManager  recipients={props.recipients} addRecipient={ (name,email)=>{ props.addRecipient(props.uuid, name, email); } } delRecipient={ (id)=>{ props.delRecipient(props.uuid, id); } } />
      <ContentManager
        mailing={props.mailing.id}
        content={props.content}
        recipients={props.recipients}
        delContent={ (content)=>{props.delContent(content);} }
        moveContent={ (content, direction)=>{props.moveContent(content, direction);} }
        addCommonContent={()=>{props.addCommonContent(props.uuid);} }
        addPerRecipientContent={()=>{props.addPerRecipientContent(props.uuid, props.recipients.map((r)=>{return r.id;}));} }
        updateCommonContentText={(mailing, content, editorState)=>{ props.updateCommonContentText(mailing, content, editorState); } }
        updatePerRecipientContent={(content, editorContent, recipient)=>{props.updatePerRecipientContent(content, editorContent, recipient); } }
        />
    </div>
  );
};

MailingComposer.propTypes = {
  uuid: React.PropTypes.string,
  recipients: React.PropTypes.array,
  mailing: React.PropTypes.object,
  content: React.PropTypes.array,
  addRecipient: React.PropTypes.func,
  delRecipient: React.PropTypes.func,
  addCommonContent: React.PropTypes.func,
  addPerRecipientContent: React.PropTypes.func,
  updatePerRecipientContent: React.PropTypes.func,
  updateCommonContentText: React.PropTypes.func,
  delContent: React.PropTypes.func,
  moveContent: React.PropTypes.func
};

export default MailingComposer;
