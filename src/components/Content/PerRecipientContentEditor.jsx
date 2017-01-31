import React from 'react';
import {Editor, EditorState, RichUtils, convertToRaw, convertFromRaw} from 'draft-js';
import ContentEditorToolBar from './ContentEditorToolBar.jsx';
import ContentControlBar from './ContentControlBar.jsx';

class PerRecipientContentEditor extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      selectedRecipient: '',
      selectedEditorState: EditorState.createEmpty()
    };
    this._onChange = this._onChange.bind(this);
    this._handleKeyCommand = this._handleKeyCommand.bind(this);
    //
    this._toggleBlockType = this._toggleBlockType.bind(this);
    this._toggleInlineStyle = this._toggleInlineStyle.bind(this);

    this._recipientDetails = this._recipientDetails.bind(this);
  }

  componentDidMount(){
    if(this.props.content.editorContent.length > 0){
      this.setState({selectedRecipient: this.props.content.editorContent[0].recipient});
      this.setState({selectedEditorState: EditorState.createWithContent(convertFromRaw(this.props.content.editorContent[0].editorContent))});
    }
  }

  componentWillReceiveProps(nextProps) {
    // if content id is different this means that the content is now different
    // because the content blocks on the page have been reordered
    if(nextProps.content.id !== this.props.content.id){
      const newContent = this.props.content.editorContent.find((ec)=>{
        return ec.recipient === this.state.selectedRecipient;
      }).editorContent;
      this.setState({ selectedEditorState: EditorState.createWithContent(convertFromRaw(newContent))});
    }
  }

  _onChange(editorState) {
    this.setState({selectedEditorState: editorState});
    this.props.save(convertToRaw(editorState.getCurrentContent()), this.state.selectedRecipient);
  }

  _handleKeyCommand(command) {
    const newState = RichUtils.handleKeyCommand(this.state.selectedEditorState, command);
    if (newState){
      this._onChange(newState);
      return 'handled';
    }
    return 'not-handled';
  }

  _toggleInlineStyle(style){
    this._onChange(RichUtils.toggleInlineStyle(this.state.selectedEditorState, style));
  }
  _toggleBlockType(type){
    this._onChange(RichUtils.toggleBlockType(this.state.selectedEditorState, type));
  }

  render(){

    const currentInlineStyle = this.state.selectedEditorState.getCurrentInlineStyle();
    const currentBlockType = this.state.selectedEditorState.getCurrentContent().getBlockForKey(this.state.selectedEditorState.getSelection().getStartKey()).getType();

    const thisRecipient = this._recipientDetails(this.state.selectedRecipient);

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
            <select value={this.state.selectedRecipient} className='label label-default' style={{float: 'right', margin: 0, padding: 5, align:'right'}} onChange={(event)=>{
              this.setState({selectedRecipient: event.target.value});
              this.setState({selectedEditorState: EditorState.createWithContent(convertFromRaw(this.props.content.editorContent.find((ec)=>{
                return ec.recipient === event.target.value;
              }).editorContent))});
            }}>
              {this.props.content.editorContent.map((ec, index)=>{
                const rdetails = this._recipientDetails(ec.recipient);
                return <option key={index} value={ec.recipient}>Content for: {rdetails.name} {rdetails.email}</option>;
              })}
            </select>

          </ContentControlBar>

        </div>
        <div className='panel-body'>
          <ContentEditorToolBar
            currentInlineStyle={currentInlineStyle}
            currentBlockType={currentBlockType}
            _toggleBlockType={(type)=>{ this._toggleBlockType(type); }}
            _toggleInlineStyle={(style)=>{ this._toggleInlineStyle(style); }} />

          {typeof thisRecipient !== 'undefined'?<Editor
            ref={(input)=>{ this.editor = input; }}
            editorState={this.state.selectedEditorState}
            onChange={this._onChange}
            handleKeyCommand={this._handleKeyCommand}
            placeholder={`Put content here that will go to ${thisRecipient.name} <${thisRecipient.email}>`} />:''}

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

PerRecipientContentEditor.propTypes = {
  content: React.PropTypes.object,
  children: React.PropTypes.object,
  recipients: React.PropTypes.array,
  save: React.PropTypes.func,
  delete: React.PropTypes.func,
  moveContent: React.PropTypes.func
};

export default PerRecipientContentEditor;
