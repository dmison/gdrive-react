import uuid from 'node-uuid';

import {EditorState, convertToRaw} from 'draft-js';

const content_reducer = (content = [], action) => {
  switch(action.type){

  case 'ADD_RECIPIENT':
    return content.map((c)=>{
      if(c.mailing === action.mailing && c.type === 'per_recipient'){
        c.editorContent = c.editorContent.concat({
          recipient: action.newID,
          editorContent: convertToRaw(EditorState.createEmpty().getCurrentContent())
        });
      }
      return c;
    });

  case 'ADD_COMMON_CONTENT':
    return content.concat({
      id: uuid.v1(),
      type: 'common',
      mailing: action.mailing,
      editorContent: convertToRaw(EditorState.createEmpty().getCurrentContent())
    });

  case 'ADD_PER_RECIPIENT_CONTENT':
    return content.concat({
      id: uuid.v1(),
      type: 'per_recipient',
      mailing: action.mailing,
      editorContent: action.recipients.map((r)=>{
        return {
          recipient: r,
          editorContent: convertToRaw(EditorState.createEmpty().getCurrentContent())
        };
      })
    });

  case 'UPDATE_PER_RECIPIENT_CONTENT':
    //action.content, action.recipient, action.editorContent
    return content.map((c)=>{
      if(c.id === action.content){
        c.editorContent = c.editorContent.map((ec)=>{
          if(ec.recipient === action.recipient){
            ec.editorContent = action.editorContent;
          }
          return ec;
        });
      }
      return c;
    });

  case 'UPDATE_COMMON_CONTENT_TEXT':
    return content.map((c)=>{
      if (c.id === action.content) {
        c.editorContent = action.editorContent;
      }
      return c;
    });

  // group content
  case 'ADD_GROUP_CONTENT':
    return content.concat({
      id:uuid.v1(),
      type: 'group',
      mailing: action.mailing,
      recipients: [],
      editorContent: convertToRaw(EditorState.createEmpty().getCurrentContent())
    });

  case 'UPDATE_GROUP_CONTENT_TEXT':
    return content.map((c)=>{
      if(c.id === content){
        c.editorContent = action.editorContent;
      }
      return c;
    });

  case 'UPDATE_GROUP_CONTENT_RECIPIENTS':
    return content.map((c)=>{
      if(c.id === content){
        c.recipients = action.recipients;
      }
      return c;
    });

  // common content
  case 'DEL_CONTENT':
    return content.filter((c)=>{
      return c.id !== action.content;
    });

  case 'MOVE_CONTENT':{
    return moveContent(content, action.content, action.direction);
  }

  default: return content;
  }

};



const moveContent = (content, sourceID, direction) => {
  const sourceIndex = content.findIndex((element)=>{
    return element.id === sourceID;
  });
  if(direction === 'up'){
    return sourceIndex === 0 ? content : switchElements(content, sourceIndex, sourceIndex-1);
  }
  if(direction === 'down'){
    return sourceIndex === content.length ? content : switchElements(content, sourceIndex, sourceIndex+1);
  }
};

const switchElements = (source, from, to) => {
  // if(from < 0 || from > source.length-1 || to < 0 || to > source.length-1) return source;
  let newArray = [].concat(source);
  const org = newArray[from];
  newArray[from] = newArray[to];
  newArray[to] = org;
  return newArray;
};

export default content_reducer;
