import uuid from 'node-uuid';
import {contains} from 'underscore';

const content_reducer = (content = [], action) => {
  switch(action.type){

  // ========================================================= CONTENT ACTIONS
  case 'ADD_COMMON_CONTENT':
    return content.concat({
      id: uuid.v1(),
      type: 'common',
      mailing: action.mailing,
      editorContent: ''
    });

  case 'ADD_PER_RECIPIENT_CONTENT':
    return content.concat({
      id: uuid.v1(),
      type: 'per_recipient',
      mailing: action.mailing,
      editorContent: action.recipients.map((r)=>{
        return {
          recipient: r,
          editorContent: ''
        };
      })
    });

  case 'UPDATE_PER_RECIPIENT_CONTENT':
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
      editorContent: ''
    });

  case 'UPDATE_GROUP_CONTENT_TEXT':
    return content.map((c)=>{
      if(c.id === action.content){
        c.editorContent = action.editorContent;
      }
      return c;
    });

  case 'UPDATE_GROUP_CONTENT_RECIPIENTS':
    return content.map((c)=>{
      if(c.id === action.content){
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

  // ======================================================== MAILING ACTIONS
  case 'DELETE_MAILING':
    return content.filter((c)=>{
      return c.mailing !== action.mailing;
    });

  case 'DUPE_MAILING': {
    const newContent = JSON.parse(JSON.stringify(content.filter((c)=>{
      return c.mailing === action.mailing;
    })));
    return content.concat(newContent.map((nc)=>{
      nc.id =uuid.v1();
      nc.mailing = action.newID;
      return nc;
    }));
  }

  // ======================================================== RECIPIENT ACTIONS
  case 'ADD_RECIPIENT':
    return content.map((c)=>{
      if(c.mailing === action.mailing && c.type === 'per_recipient'){
        c.editorContent = c.editorContent.concat(action.newIDs.map((id)=>{
          return {
            recipient: id,
            editorContent: ''
          };
        }));
      }
      return c;
    });
    
  // ======================================================== RECIPIENT ACTIONS
  case 'ATTACH_RECIPIENT':
    return content.map((c)=>{
      if(c.mailing === action.mailing && c.type === 'per_recipient'){
        if(!contains(c.editorContent.map((ec)=>{return ec.id;}), action.recipient)){
          c.editorContent = c.editorContent.concat({
            recipient: action.recipient,
            editorContent: ''
          });
        }
      }
      return c;
    });

  case 'DEL_RECIPIENT':
    return content.map((c)=>{
      if(c.mailing === action.mailing && c.type === 'per_recipient'){
        c.editorContent = c.editorContent.filter((ec)=>{
          return ec.recipient !== action.recipient;
        });
      }
      return c;
    });

  case 'PURGE_RECIPIENT':
    return content.map((c)=>{
      if(c.type === 'per_recipient'){
        c.editorContent = c.editorContent.filter((ec)=>{
          return ec.recipient !== action.recipient;
        });
      }
      return c;
    });


  case 'MERGE_RECIPIENTS':{
    return content.map((c)=>{
      //go through all group blocks
      if(c.type==='group'){
        // if r is found in action.oldones, r = recipient
        c.recipients = c.recipients.map((r)=>{
          if(contains(action.oldones, r)) r = action.recipient;
          return r;
        });
      }
      // go through all per_recipient blocks
      // if any for oldones, then update to recipient
      if(c.type==='per_recipient'){
        c.editorContent = c.editorContent.map((ec)=>{
          if(contains(action.oldones, ec.recipient)) ec.recipient = action.recipient;
          return ec;
        });
      }
      return c;
    });
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
