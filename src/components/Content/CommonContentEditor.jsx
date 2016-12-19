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
    this._onBoldClick = this._onBoldClick.bind(this);
    this._onItalicClick = this._onItalicClick.bind(this);
    this._onUnderlineClick = this._onUnderlineClick.bind(this);
  }

  componentWillReceiveProps(nextProps) {
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

  _onBoldClick() {
    this._onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'BOLD'));
  }
  _onItalicClick() {
    this._onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'ITALIC'));
  }
  _onUnderlineClick() {
    this._onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'UNDERLINE'));
  }

  render(){
    return (
      <div style={{backgroundColor: 'lightGrey', padding: 5, marginBottom: 5}}
        onMouseEnter={()=>{this.setState({showControls: true});}}
        onMouseLeave={()=>{this.setState({showControls: false});}}
        >
        <ToolBar
          type={this.props.content.type}
          _onBoldClick={this._onBoldClick}
          _onItalicClick={this._onItalicClick}
          _onUnderlineClick={this._onUnderlineClick}
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
          handleKeyCommand={this._handleKeyCommand}/>
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
        <button onClick={props._onBoldClick}><span style={{fontWeight: 'bold'}}>B</span></button>
        <button onClick={props._onItalicClick}><span style={{fontStyle: 'italic'}}>I</span></button>
        <button onClick={props._onUnderlineClick}><span style={{textDecoration: 'underline'}}>U</span></button>
        <span style={{float: 'right', backgroundColor:'lightgreen', padding: 2, margin: 1}}>{props.type}</span>
      </div>
  </div>

  );
};
ToolBar.propTypes = {
  type: React.PropTypes.string,
  showControls: React.PropTypes.bool,
  _onBoldClick: React.PropTypes.func,
  _onItalicClick: React.PropTypes.func,
  _onUnderlineClick: React.PropTypes.func,
  _delete: React.PropTypes.func,
  _moveUp: React.PropTypes.func,
  _moveDown: React.PropTypes.func
};


export default CommonContentEditor;
