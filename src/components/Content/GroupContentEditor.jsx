import React from 'react';
import {Editor, EditorState, RichUtils, convertToRaw, convertFromRaw} from 'draft-js';
import ContentEditorToolBar from './ContentEditorToolBar.jsx';
import ContentControlBar from './ContentControlBar.jsx';

class GroupContentEditor extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      editorState: EditorState.createWithContent(convertFromRaw(this.props.content.editorContent))
    };
    this._onChange = this._onChange.bind(this);
    this._handleKeyCommand = this._handleKeyCommand.bind(this);

    this._toggleBlockType = this._toggleBlockType.bind(this);
    this._toggleInlineStyle = this._toggleInlineStyle.bind(this);

    this._recipientDetails = this._recipientDetails.bind(this);
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
          <ContentControlBar
            _moveUp={()=>{ this.props.moveContent('up'); }}
            _moveDown={()=>{ this.props.moveContent('down'); }}
            _delete={()=>{
              if(window.confirm('Deleting content is unrecoverable.  Are you sure?')){
                this.props.delete(this.props.content.id);
              }
            }}>

            <select className='label label-default' style={{float: 'right', margin: 0, padding: 5, align:'right'}} onChange={()=>{
              // this.setState({selectedRecipient: event.target.value});
              // this.setState({selectedEditorState: EditorState.createWithContent(convertFromRaw(this.props.content.editorContent.find((ec)=>{
              //   return ec.recipient === event.target.value;
              // }).editorContent))});
            }}>
              {this.props.recipients.map((r, index)=>{
                return <option key={index} value={r.id}>{r.name} {r.email}</option>;
              })}
            </select>

          </ContentControlBar>
        </div>
        <div className='panel-body' style={{padding: 0}}>
          <ContentEditorToolBar
            currentInlineStyle={currentInlineStyle}
            currentBlockType={currentBlockType}
            _toggleBlockType={(type)=>{ this._toggleBlockType(type); }}
            _toggleInlineStyle={(style)=>{ this._toggleInlineStyle(style); }} />
          <div style={{padding: 14}}>
          <Editor
            ref={(input)=>{ this.editor = input; }}
            editorState={this.state.editorState}
            onChange={this._onChange}
            handleKeyCommand={this._handleKeyCommand}
            placeholder='Put content here that will go to all selected recipients.'/>
</div>
        </div>
      </div>
    );
  }

  _recipientDetails(id){
    return this.props.recipients.find((r)=>{
      return r.id === id;
    });
  }

}

GroupContentEditor.propTypes = {
  children: React.PropTypes.object,
  recipients: React.PropTypes.array,
  content: React.PropTypes.object,
  save: React.PropTypes.func,
  delete: React.PropTypes.func,
  moveContent: React.PropTypes.func
};



export default GroupContentEditor;
