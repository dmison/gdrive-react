import React from 'react';
import {Editor, EditorState, RichUtils, convertToRaw, convertFromRaw} from 'draft-js';

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
    return (
      <div style={{backgroundColor: 'lightGrey', padding: 5, marginBottom: 5}} >
        <ToolBar
          type={this.props.content.type}
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
        <div style={{backgroundColor: 'white', padding: 8}}>
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



const buttonBlockStyle = {
  paddingRight: 10
};

const toolBarStyle = {
  backgroundColor: 'grey',
  padding: 5,
  marginBottom: 6
};

const INLINE_STYLES = [
  {label: 'Bold', style: 'BOLD', icon: 'BOLD'},
  {label: 'Italic', style: 'ITALIC', icon: 'ITALIC'},
  {label: 'Underline', style: 'UNDERLINE', icon: 'UNDERLINE'},
  {label: 'Monospace', style: 'CODE', icon: 'CODE'}
];

const BLOCK_TYPES = [
  {label: 'H1', style: 'header-one', icon: 'header-one'},
  {label: 'H2', style: 'header-two', icon: 'header-two'},
  {label: 'H3', style: 'header-three', icon: 'header-three'},
  // {label: 'H4', style: 'header-four', icon: 'header-four'},
  // {label: 'H5', style: 'header-five', icon: 'header-five'},
  // {label: 'H6', style: 'header-six', icon: 'header-six'},
  {label: 'Blockquote', style: 'blockquote', icon: 'blockquote'},
  {label: 'UL', style: 'unordered-list-item', icon: 'unordered-list-item'},
  {label: 'OL', style: 'ordered-list-item', icon: 'ordered-list-item'},
  {label: 'Code Block', style: 'code-block', icon: 'code-block'},
];


const ToolBar = (props) => {

  return (
    <div className="toolbar" style={toolBarStyle}>
      <div className='controls'>
        <span style={buttonBlockStyle}>
          <button onClick={props._delete}>Del</button>
        </span>
        <span style={buttonBlockStyle}>
          <button onClick={props._moveUp}>Up</button>
          <button onClick={props._moveDown}>Down</button>
        </span>
        <span style={buttonBlockStyle}>
          {INLINE_STYLES.map((style, index)=>{
            return <button key={index} onClick={()=>{ props._toggleInlineStyle(style.style);} }>{style.label}</button>;
          })}
        </span>
        <span style={buttonBlockStyle}>
          <span style={buttonBlockStyle}>
            {BLOCK_TYPES.map((type, index)=>{
              return <button  key={index} onClick={()=>{ props._toggleBlockType(type.style);} }>{type.label}</button>;
            })}
          </span>
        </span>
        <span style={{float: 'right', backgroundColor:'lightgreen', padding: 2, margin: 1}}>{props.type}</span>
      </div>
  </div>

  );
};
ToolBar.propTypes = {
  type: React.PropTypes.string,
  _toggleBlockType: React.PropTypes.func,
  _toggleInlineStyle: React.PropTypes.func,
  _delete: React.PropTypes.func,
  _moveUp: React.PropTypes.func,
  _moveDown: React.PropTypes.func,
};


export default CommonContentEditor;
