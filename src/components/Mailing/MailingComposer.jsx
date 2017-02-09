import React from 'react';
import {RecipientsManager} from '../Recipient';
import {ContentManager} from '../Content';
import FocusToEditInput from '../FocusToEditInput.jsx';

const MailingComposer = (props) => {

  if (props.mailing === null){
    return <div>No mailing with UUID {props.uuid}.</div>;
  }

  return (
    <div>
      <div><b style={{paddingRight: 5}}>Mailing Name:</b>
        <FocusToEditInput
          value={props.mailing.name}
          onChange={(name)=>{ props.updateMailing(props.mailing.id, name, props.mailing.subject); } }
          editPlaceHolder='Type mailing name here.'
          viewPlaceHolder='No mailing name. Click here to edit.'
          />
      </div>

      <div><b style={{paddingRight: 5}}>Subject:</b>
        <FocusToEditInput
          value={props.mailing.subject}
          onChange={(subject)=>{ props.updateMailing(props.mailing.id, props.mailing.name, subject); } }
          editPlaceHolder='Type subject here.'
          viewPlaceHolder='No subject. Click here to edit.'
          />
      </div>

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
        addGroupContent={ ()=>{ props.addGroupContent(props.uuid); } }
        updateGroupContentText={ (content, editorContent)=>{ props.updateGroupContentText(content, editorContent); } }
        updateGroupContentRecipients={ (content, recipients)=>{ props.updateGroupContentRecipients(content, recipients); } }
        />
    </div>
  );
};

MailingComposer.propTypes = {
  uuid: React.PropTypes.string,
  recipients: React.PropTypes.array,
  mailing: React.PropTypes.object,
  updateMailing: React.PropTypes.func,
  content: React.PropTypes.array,
  addRecipient: React.PropTypes.func,
  delRecipient: React.PropTypes.func,
  addCommonContent: React.PropTypes.func,
  addPerRecipientContent: React.PropTypes.func,
  updatePerRecipientContent: React.PropTypes.func,
  updateCommonContentText: React.PropTypes.func,
  addGroupContent: React.PropTypes.func,
  updateGroupContentText: React.PropTypes.func,
  updateGroupContentRecipients: React.PropTypes.func,
  delContent: React.PropTypes.func,
  moveContent: React.PropTypes.func
};

export default MailingComposer;
