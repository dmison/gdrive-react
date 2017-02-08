import React from 'react';
import {Editor} from '../Editor/';
import ContentEditorToolBar from './ContentEditorToolBar.jsx';
import Select from 'react-select';

class PerRecipientContentEditor extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      selectedRecipient: '',
    };

    this._recipientDetails = this._recipientDetails.bind(this);
  }

  componentDidMount(){
    if(this.props.content.editorContent.length > 0){
      this.setState({selectedRecipient: this.props.content.editorContent[0].recipient});
      // this.setState({selectedEditorState: this.props.content.editorContent[0].editorContent});
    }
  }

  // componentWillReceiveProps(nextProps) {
  //   // if content id is different this means that the content is now different
  //   // because the content blocks on the page have been reordered
  //   if(nextProps.content.id !== this.props.content.id){
  //     const newContent = this.props.content.editorContent.find((ec)=>{
  //       return ec.recipient === this.state.selectedRecipient;
  //     }).editorContent;
  //     this.setState({ selectedEditorState: EditorState.createWithContent(convertFromRaw(newContent))});
  //   }
  // }

  // _onChange(editorState) {
  //   this.setState({selectedEditorState: editorState});
  //   this.props.save(convertToRaw(editorState.getCurrentContent()), this.state.selectedRecipient);
  // }

  // _handleKeyCommand(command) {
  //   const newState = RichUtils.handleKeyCommand(this.state.selectedEditorState, command);
  //   if (newState){
  //     this._onChange(newState);
  //     return 'handled';
  //   }
  //   return 'not-handled';
  // }
  //
  // _toggleInlineStyle(style){
  //   this._onChange(RichUtils.toggleInlineStyle(this.state.selectedEditorState, style));
  // }
  // _toggleBlockType(type){
  //   this._onChange(RichUtils.toggleBlockType(this.state.selectedEditorState, type));
  // }

  render(){

    const thisRecipient = this._recipientDetails(this.state.selectedRecipient);

    return (
      <div className='panel panel-default'>
        <div className='panel-heading' style={{padding:3}}>
          <ContentEditorToolBar
            _moveUp={()=>{ this.props.moveContent('up'); }}
            _moveDown={()=>{ this.props.moveContent('down'); }}
            _delete={()=>{
              if(window.confirm('Deleting content is unrecoverable.  Are you sure?')){
                this.props.delete(this.props.content.id);
              }
            }}>
            <span>
              <Select
                style={{marginTop:3}}
                name='select-recipient'
                clearable={false}
                value={this.state.selectedRecipient}
                options={this.props.content.editorContent.map((ec)=>{
                  const rdetails = this._recipientDetails(ec.recipient);
                  return {value:ec.recipient, label: `${rdetails.name} ${rdetails.email}`};
                })}
                onChange={(value)=>{
                  if(!Array.isArray(value)){
                    this.setState({selectedRecipient: value.value});
                  }
                }}
                />
            </span>
            </ContentEditorToolBar>
        </div>
        <div className='panel-body' style={{padding:0}}>
          {typeof thisRecipient !== 'undefined'? <Editor
            content={this.props.content.editorContent.find((ec)=>{
              return ec.recipient === this.state.selectedRecipient;
            }).editorContent}
            onChange={(content)=>{ this.props.save(content, this.state.selectedRecipient); }}
            mode='markdown'
            theme='tomorrow'
            wrapEnabled={true}
            /> :''}
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


// {typeof thisRecipient !== 'undefined'?<Editor
//   ref={(input)=>{ this.editor = input; }}
//   editorState={this.state.selectedEditorState}
//   onChange={this._onChange}
//   handleKeyCommand={this._handleKeyCommand}
//   placeholder={`Put content here that will go to ${thisRecipient.name} <${thisRecipient.email}>`} />:''}
