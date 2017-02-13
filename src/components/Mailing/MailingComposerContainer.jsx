import {connect} from 'react-redux';
import MailingComposer from './MailingComposer';

import {  addCommonContent,
          updateCommonContentText,
          addPerRecipientContent,
          updatePerRecipientContent,
          addGroupContent,
          updateGroupContentText,
          updateGroupContentRecipients,
          delContent,
          moveContent} from '../Content';

import {updateMailing} from './actions.js';

import { addRecipient, delRecipient, updateRecipient } from '../Recipient';

const mapStateToProps = (state, ownProps) => {
  return {
    uuid: ownProps.params.uuid,
    mailing: state.mailings.reduce((prev,curr)=>{ return curr.id === ownProps.params.uuid? curr:prev; }, null),
    recipients: state.recipients.filter((recipient)=>{ return recipient.mailing === ownProps.params.uuid; }),
    content: state.content.filter((content)=>{ return content.mailing === ownProps.params.uuid; })
  };
};

const mapDispatchToProps = (dispatch) => {
  return {

    addRecipient: (mailing, detail) => { dispatch(addRecipient(mailing, detail)); },
    delRecipient: (mailing, recipient) => { dispatch(delRecipient(mailing, recipient)); },
    updateRecipient: (recipient, detail) => { dispatch(updateRecipient(recipient, detail)); },

    addCommonContent: (mailing) => { dispatch(addCommonContent(mailing)); },
    updateCommonContentText: (content, editorContent) => { dispatch(updateCommonContentText(content, editorContent)); },

    addPerRecipientContent: (mailing, recipients) => { dispatch(addPerRecipientContent(mailing, recipients)); },
    updatePerRecipientContent: (content, editorContent, recipient) => { dispatch(updatePerRecipientContent(content, editorContent, recipient)); },

    addGroupContent: (mailing) => { dispatch(addGroupContent(mailing)); },
    updateGroupContentText: (content, editorContent) => { dispatch(updateGroupContentText(content, editorContent)); },
    updateGroupContentRecipients: (content, recipients) => { dispatch(updateGroupContentRecipients(content, recipients)); },

    moveContent: (content, direction) => { dispatch(moveContent(content, direction)); },
    delContent: (content) => { dispatch(delContent(content)); },

    updateMailing: (id, name, subject) => { dispatch(updateMailing(id,name,subject)); }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MailingComposer);
