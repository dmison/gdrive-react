const updatePerRecipientContent = (content, editorContent, recipient) => {
  // console.log(`editorContent: ${editorContent}`);
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
  updatePerRecipientContent
};
