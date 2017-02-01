const updatePerRecipientContent = (content, editorContent, recipient) => {
  return {
    type: 'UPDATE_PER_RECIPIENT_CONTENT',
    content: content,
    recipient: recipient,
    editorContent: editorContent
  };
};

const addPerRecipientContent = (mailing, recipients) => {
  return {
    type: 'ADD_PER_RECIPIENT_CONTENT',
    mailing: mailing,
    recipients: recipients
  };
};

const addCommonContent = (mailing) => {
  return {
    type: 'ADD_COMMON_CONTENT',
    mailing: mailing
  };
};

const addGroupContent = (mailing) => {
  return {
    type: 'ADD_GROUP_CONTENT',
    mailing: mailing
  };
};

const updateGroupContentText = (content, editorContent) => {
  return {
    type: 'UPDATE_GROUP_CONTENT_TEXT',
    editorContent: editorContent,
    content: content
  };
};

const updateGroupContentRecipients = (content, recipients) => {
  return {
    type: 'UPDATE_GROUP_CONTENT_RECIPIENTS',
    recipients: recipients,
    content: content
  };
};

const updateCommonContentText = (content, editorContent) => {
  return {
    type: 'UPDATE_COMMON_CONTENT_TEXT',
    editorContent: editorContent,
    content: content
  };
};

const delContent = (content) => {
  return {
    type: 'DEL_CONTENT',
    content: content
  };
};

const moveContent = (content, direction) => {
  return {
    type: 'MOVE_CONTENT',
    content: content,
    direction: direction
  };
};

export {
  addCommonContent,
  updateCommonContentText,
  delContent,
  moveContent,
  addPerRecipientContent,
  updatePerRecipientContent,
  addGroupContent,
  updateGroupContentText,
  updateGroupContentRecipients
};
