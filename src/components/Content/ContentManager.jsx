import React from 'react';
import CommonContentEditor from './CommonContentEditor.jsx';
import PerRecipientContentEditor from './PerRecipientContentEditor.jsx';

const ContentManager = (props) => {

  return (
    <div>
      <button onClick={props.addCommonContent}>Add Common Content</button>
      <button onClick={props.addPerRecipientContent}>Add Per-Recipient Content</button>
      <button >Add Group Content</button>
      <ul style={{ listStyleType:'none', paddingLeft:0}}>
        {props.content.map((content, index)=>{
          let Editor = '';
          switch(content.type){
          case 'common':
            Editor = <CommonContentEditor
              content={content}
              delete={()=>{props.delContent(content.id);} }
              moveContent={(direction)=>{ props.moveContent(content.id, direction); } }
              save={(editorContent)=>{
                props.updateCommonContentText(content.id, editorContent);
              }}
              />;
            break;
          case 'per_recipient':
            Editor = <PerRecipientContentEditor
              content={content}
              recipients={props.recipients}
              delete={()=>{props.delContent(content.id);} }
              moveContent={(direction)=>{ props.moveContent(content.id, direction); } }
              save={(editorContent, recipient)=>{
                props.updatePerRecipientContent(content.id, editorContent, recipient);
              }}
              />;
            break;
          default: '';
          }
          return <li key={index}>{Editor}</li>;
        })}
      </ul>
    </div>
  );
};

ContentManager.propTypes = {
  content: React.PropTypes.array,
  recipients: React.PropTypes.array,
  mailing: React.PropTypes.string,
  addCommonContent: React.PropTypes.func,
  addPerRecipientContent: React.PropTypes.func,
  updatePerRecipientContentText: React.PropTypes.func,
  updateCommonContentText: React.PropTypes.func,
  delContent: React.PropTypes.func,
  moveContent: React.PropTypes.func
};


export default ContentManager;
