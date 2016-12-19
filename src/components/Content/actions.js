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

const updateContentPosition = (mailing, content, index) => {
  return {
    type: 'UPDATE_CONTENT_POSITION',
    mailing: mailing,
    content: content,
    index: index
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
  updateContentPosition,
  addCommonContent,
  updateCommonContentText,
  delContent,
  moveContent
};
