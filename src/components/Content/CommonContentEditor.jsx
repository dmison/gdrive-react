import React from 'react';
import {Editor, EditorState, RichUtils, convertToRaw, convertFromRaw} from 'draft-js';
import ContentEditorToolBar from './ContentEditorToolBar.jsx';
import decorator from '../Editor/decorator.js';

class CommonContentEditor extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      editorState: EditorState.createWithContent(convertFromRaw(this.props.content.editorContent), decorator)
    };
    this._onChange = this._onChange.bind(this);
    this._handleKeyCommand = this._handleKeyCommand.bind(this);

    this._toggleBlockType = this._toggleBlockType.bind(this);
    this._toggleInlineStyle = this._toggleInlineStyle.bind(this);

    this._setLink = this._setLink.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    // if content id is different this means that the content is now different
    // because the content blocks on the page have been reordered
    if(nextProps.content.id !== this.props.content.id){
      this.setState({ editorState: EditorState.createWithContent(convertFromRaw(nextProps.content.editorContent), decorator)});
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

  _setLink(url){
    const editorState = this.state.editorState;
    const contentState = editorState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity(
      'LINK',
      'MUTABLE',
      {url: url}
    );
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const newEditorState = EditorState.set(editorState, { currentContent: contentStateWithEntity });
    this.setState({ editorState: RichUtils.toggleLink( newEditorState, newEditorState.getSelection(), null )});

    this.setState({ editorState: RichUtils.toggleLink( newEditorState, newEditorState.getSelection(), entityKey )});
  }

  render(){

    const currentInlineStyle = this.state.editorState.getCurrentInlineStyle();
    const currentBlockType = this.state.editorState.getCurrentContent().getBlockForKey(this.state.editorState.getSelection().getStartKey()).getType();

    return (
      <div className='panel panel-default'>
        <div className='panel-heading' style={{padding:3}}>
          <ContentEditorToolBar
            editorState={this.state.editorState}
            currentInlineStyle={currentInlineStyle}
            currentBlockType={currentBlockType}
            _toggleBlockType={(type)=>{ this._toggleBlockType(type); }}
            _toggleInlineStyle={(style)=>{ this._toggleInlineStyle(style); }}
            _setLink={this._setLink}
            _moveUp={()=>{ this.props.moveContent('up'); }}
            _moveDown={()=>{ this.props.moveContent('down'); }}
            _delete={()=>{
              if(window.confirm('Deleting content is unrecoverable.  Are you sure?')){
                this.props.delete(this.props.content.id);
              }
            }}>{this.props.children}</ContentEditorToolBar>
        </div>
        <div className='panel-body' style={{padding: 0}}>
          <div style={{padding: 14}}>
          <Editor
            ref={(input)=>{ this.editor = input; }}
            editorState={this.state.editorState}
            onChange={this._onChange}
            handleKeyCommand={this._handleKeyCommand}
            placeholder='Put content here that will go to all recipients.'/>
</div>
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
