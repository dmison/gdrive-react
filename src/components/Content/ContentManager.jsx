import React from 'react';
import CommonContentEditor from './CommonContentEditor.jsx';
// import PerRecipientContentEditor from './PerRecipientContentEditor.jsx';

const ContentManager = (props) => {
  return (
    <div>
      <button onClick={props.addCommonContent}>Add Common Content</button>
      <button>Add Per-Recipient Content</button>
      <div>
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
          // case 'Per-Recipient': return PerRecipientContentEditor;
          default: '';
          }
          return <div key={index}>{Editor}</div>;
        })}

      </div>
    </div>
  );
};

ContentManager.propTypes = {
  content: React.PropTypes.array,
  mailing: React.PropTypes.string,
  addCommonContent: React.PropTypes.func,
  updateCommonContentText: React.PropTypes.func,
  delContent: React.PropTypes.func,
  moveContent: React.PropTypes.func
};


export default ContentManager;
