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
        delContent={ (content)=>{props.delContent(content);} }
        moveContent={ (content, direction)=>{props.moveContent(content, direction);} }
        addCommonContent={()=>{props.addCommonContent(props.uuid);} }
        updateCommonContentText={(mailing, content, editorState)=>{ props.updateCommonContentText(mailing, content, editorState); } }
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
  updateContentPosition: React.PropTypes.func,
  addCommonContent: React.PropTypes.func,
  updateCommonContentText: React.PropTypes.func,
  delContent: React.PropTypes.func,
  moveContent: React.PropTypes.func
};

export default MailingComposer;
