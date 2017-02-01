import React from 'react';
import CommonContentEditor from './CommonContentEditor.jsx';
import PerRecipientContentEditor from './PerRecipientContentEditor.jsx';
import GroupContentEditor from './GroupContentEditor.jsx';

const ContentManager = (props) => {

  return (
    <div>
      <div className='panel panel-default'>
        <div className='panel-heading' style={{padding:3}}>
          <button style={{marginRight:10, paddingBottom:2}} className='btn btn-default' onClick={props.addCommonContent}><span className='fa fa-plus'></span> Add Common Content</button>
          <button style={{marginRight:10, paddingBottom:2}} className='btn btn-default' onClick={props.addPerRecipientContent}><span className='fa fa-plus'></span> Add Per-Recipient Content</button>
          <button style={{marginRight:10, paddingBottom:2}} className='btn btn-default' onClick={props.addGroupContent}><span className='fa fa-plus'></span> Add Group Content</button>
        </div>
      </div>
      <ul style={{ listStyleType:'none', paddingLeft:0}}>
        {props.content.map((content, index)=>{
          let Editor = '';
          switch(content.type){
          case 'common':
            Editor = (<CommonContentEditor
              content={content}
              delete={()=>{props.delContent(content.id);} }
              moveContent={(direction)=>{ props.moveContent(content.id, direction); } }
              save={(editorContent)=>{
                props.updateCommonContentText(content.id, editorContent);
              }}><span style={{float: 'right', margin: 0, padding: 7}} className='label label-default'>{content.type}</span></CommonContentEditor>);
            break;
          case 'per_recipient':
            Editor = <PerRecipientContentEditor
              content={content}
              recipients={props.recipients}
              delete={()=>{props.delContent(content.id);} }
              moveContent={(direction)=>{ props.moveContent(content.id, direction); } }
              save={(editorContent, recipient)=>{
                props.updatePerRecipientContent(content.id, editorContent, recipient);
              }}></PerRecipientContentEditor>;
            break;
          case 'group':
            Editor = <GroupContentEditor
              content={content}
              recipients={props.recipients}
              delete={()=>{props.delContent(content.id);} }
              moveContent={(direction)=>{ props.moveContent(content.id, direction); } }
              save={(editorContent)=>{
                props.updateGroupContentText(content.id, editorContent);
              }}></GroupContentEditor>;
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
  addGroupContent: React.PropTypes.func,
  updateGroupContentText: React.PropTypes.func,
  updateGroupContentRecipients: React.PropTypes.func,
  delContent: React.PropTypes.func,
  moveContent: React.PropTypes.func
};


export default ContentManager;
