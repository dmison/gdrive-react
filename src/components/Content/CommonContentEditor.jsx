import React from 'react';
import {Editor, EditorState, RichUtils, convertToRaw, convertFromRaw} from 'draft-js';
import ContentEditorToolBar from './ContentEditorToolBar.jsx';

class CommonContentEditor extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      editorState: EditorState.createWithContent(convertFromRaw(this.props.content.editorContent))
    };
    this._onChange = this._onChange.bind(this);
    this._handleKeyCommand = this._handleKeyCommand.bind(this);

    this._toggleBlockType = this._toggleBlockType.bind(this);
    this._toggleInlineStyle = this._toggleInlineStyle.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    // if content id is different this means that the content is now different
    // because the content blocks on the page have been reordered
    if(nextProps.content.id !== this.props.content.id){
      this.setState({ editorState: EditorState.createWithContent(convertFromRaw(nextProps.content.editorContent))});
    }
  }

  _onChange(editorState) {
    this.setState({editorState: editorState});
    this.props.save(convertToRaw(editorState.getCurrentContent()));
  }

  _handleKeyCommand(command) {
    const newState = RichUtils.handleKeyCommand(this.state.editorState, command);
    if (newState){
      this._onChange(newState);
      return 'handled';
    }
    return 'not-handled';
  }

  _toggleInlineStyle(style){
    this._onChange(RichUtils.toggleInlineStyle(this.state.editorState, style));
  }
  _toggleBlockType(type){
    this._onChange(RichUtils.toggleBlockType(this.state.editorState, type));
  }

  render(){

    const currentInlineStyle = this.state.editorState.getCurrentInlineStyle();
    const currentBlockType = this.state.editorState.getCurrentContent().getBlockForKey(this.state.editorState.getSelection().getStartKey()).getType();


    return (
      <div className='panel panel-default'>
        <div className='panel-heading' style={{padding:3}}>
          <ContentEditorToolBar
            type={this.props.content.type}
            currentInlineStyle={currentInlineStyle}
            currentBlockType={currentBlockType}
            _toggleBlockType={(type)=>{ this._toggleBlockType(type); }}
            _toggleInlineStyle={(style)=>{ this._toggleInlineStyle(style); }}
            _moveUp={()=>{ this.props.moveContent('up'); }}
            _moveDown={()=>{ this.props.moveContent('down'); }}
            _delete={()=>{
              if(window.confirm('Deleting content is unrecoverable.  Are you sure?')){
                this.props.delete(this.props.content.id);
              }
            }}
            />
        </div>
        <div className='panel-body'>
          <Editor
            ref={(input)=>{ this.editor = input; }}
            editorState={this.state.editorState}
            onChange={this._onChange}
            handleKeyCommand={this._handleKeyCommand}
            placeholder='Put content here that will go to all recipients.'/>

        </div>
      </div>
    );
  }
}

CommonContentEditor.propTypes = {
  content: React.PropTypes.object,
  save: React.PropTypes.func,
  delete: React.PropTypes.func,
  moveContent: React.PropTypes.func
};



export default CommonContentEditor;
