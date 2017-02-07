import React from 'react';
import LinkEditor from '../Editor/LinkEditor.jsx';

const buttonBlockStyle = {
  paddingRight: 10
};



const INLINE_STYLES = [
  {label: 'Bold', style: 'BOLD', icon: 'bold'},
  {label: 'Italic', style: 'ITALIC', icon: 'italic'},
  {label: 'Underline', style: 'UNDERLINE', icon: 'underline'},
  {label: 'Monospace', style: 'CODE', icon: 'code'}
];

const BLOCK_TYPES = [
  {label: 'H1', style: 'header-one', icon: 'header'},
  {label: 'H2', style: 'header-two', icon: 'header'},
  {label: 'H3', style: 'header-three', icon: 'header'},
  // {label: 'H4', style: 'header-four', icon: 'header-four'},
  // {label: 'H5', style: 'header-five', icon: 'header-five'},
  // {label: 'H6', style: 'header-six', icon: 'header-six'},
  {label: 'Blockquote', style: 'blockquote', icon: 'quote-right'},
  {label: 'UL', style: 'unordered-list-item', icon: 'list-ul'},
  {label: 'OL', style: 'ordered-list-item', icon: 'list-ol'},
  // {label: 'Code Block', style: 'code-block', icon: 'code-block'},
];

const ContentEditorToolBar = (props) => {

  return (
    <div className="toolbar" >
      <div className='btn-group' style={buttonBlockStyle}>
        <a className='btn btn-default btn-sm' onClick={props._moveUp}><i className='fa fa-chevron-up' title='Move content block up.'/></a>
        <a className='btn btn-default btn-sm' onClick={props._moveDown}><i className='fa fa-chevron-down' title='Move content block down.'/></a>
      </div>

        <div className='btn-group' style={buttonBlockStyle}>
          {INLINE_STYLES.map((style, index)=>{
            return <ContentEditorToolBarButton key={index}  type={style} active={props.currentInlineStyle.has(style.style)} _toggleEffect={props._toggleInlineStyle} />;
          })}
      </div>
      <div className='btn-group' style={buttonBlockStyle}>
          {BLOCK_TYPES.map((type, index)=>{
            return <ContentEditorToolBarButton key={index} active={type.style===props.currentBlockType} type={type} _toggleEffect={props._toggleBlockType} />;
          })}
      </div>
      <div className='btn-group' style={buttonBlockStyle} >
        <LinkEditor editorState={props.editorState} _setLink={props._setLink} _removeLink={props._removeLink}/>
      </div>
      <div className='btn-group' style={{float:'right'}}>
        <a className='btn btn-danger btn-sm' onClick={props._delete}><i className='fa fa-trash' title='Delete this content (unrecoverable).'/></a>
      </div>



      </div>

  );
};

ContentEditorToolBar.propTypes = {
  editorState: React.PropTypes.object,
  children: React.PropTypes.node,
  currentInlineStyle: React.PropTypes.object,
  currentBlockType: React.PropTypes.string,
  _toggleBlockType: React.PropTypes.func,
  _toggleInlineStyle: React.PropTypes.func,
  _delete: React.PropTypes.func,
  _moveUp: React.PropTypes.func,
  _moveDown: React.PropTypes.func,
  _setLink: React.PropTypes.func,
  _removeLink: React.PropTypes.func
};

const ContentEditorToolBarButton = (props) => {
  const active = props.active? ' active':'';
  return (
    <a className={'btn btn-default btn-sm'+active}
        onClick={()=>{ props._toggleEffect(props.type.style);}}>
          <i  className={'fa fa-'+props.type.icon}>{props.type.icon === 'header' ?<span >{props.type.label.substring(1)}</span>:''}</i>
      </a>
  );
};
ContentEditorToolBarButton.propTypes = {
  _toggleEffect: React.PropTypes.func,
  type: React.PropTypes.object,
  active: React.PropTypes.bool
};


export default ContentEditorToolBar;
