import React from 'react';
// import {Editor, EditorState, RichUtils, convertToRaw, convertFromRaw} from 'draft-js';
import {Editor} from '../Editor/';
import ContentEditorToolBar from './ContentEditorToolBar.jsx';

class CommonContentEditor extends React.Component {
  constructor(props){
    super(props);
  }

  render(){
    return (
      <div className='panel panel-default'>
        <div className='panel-heading' style={{padding:3}}>
          <ContentEditorToolBar
            title='Common'
            _moveUp={()=>{ this.props.moveContent('up'); }}
            _moveDown={()=>{ this.props.moveContent('down'); }}
            _delete={()=>{
              if(window.confirm('Deleting content is unrecoverable.  Are you sure?')){
                this.props.delete(this.props.content.id);
              }
            }}></ContentEditorToolBar>
        </div>
        <div className='panel-body' style={{padding: 0}}>
          <Editor
            content={this.props.content.editorContent}
            onChange={(content)=>{ this.props.save(content); }}
            mode='markdown'
            theme='tomorrow'
            wrapEnabled={true}
            />
        </div>
      </div>
    );
  }
}

CommonContentEditor.propTypes = {
  children: React.PropTypes.object,
  content: React.PropTypes.object,
  save: React.PropTypes.func,
  delete: React.PropTypes.func,
  moveContent: React.PropTypes.func
};



export default CommonContentEditor;
