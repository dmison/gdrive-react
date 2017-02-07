import React from 'react';
import {uniq} from 'underscore';

const LinkEditor = (props) => {

  const inOneBlock = selectionIsWithinOneBlock(props.editorState);
  const entities = getEntitiesForSelection(props.editorState);
  const zeroSelection = noSelection(props.editorState);

  const addLink = (!zeroSelection && inOneBlock && entities.length === 0) ? (<a className='btn btn-default btn-sm' onClick={()=>{
    const url = prompt('URL to link to');
    if(url !== '')props._setLink(url);
  }}><i className='fa fa-link' title='Add Link'/></a>):'';

  const editControl = (!zeroSelection && inOneBlock && entities.length === 1) ? (<span>
    <a className='btn btn-default btn-xs' onClick={()=>{ props._removeLink(); }}><i className='fa fa-unlink' title='Remove Link'/></a>
    <span>{entities[0].getData().url}</span>
    <a className='btn btn-default btn-xs' onClick={()=>{
      const url = prompt('URL to link to', entities[0].getData().url);
      if(url !== '')props._setLink(url);
    }}><i className='fa fa-pencil' title='Edit Link'/></a>
  </span>):'';

  return (
    <div>
      {addLink}
      {editControl}
    </div>
  );

};

LinkEditor.propTypes = {
  editorState: React.PropTypes.object,
  _setLink: React.PropTypes.func,
  _removeLink: React.PropTypes.func
};

const selectionIsWithinOneBlock = (editorState) => {
  const selection = editorState.getSelection();
  return selection.getAnchorKey() === selection.getFocusKey();
};

const noSelection = (editorState) => {
  const selection = editorState.getSelection();
  return selection.getAnchorOffset() === selection.getFocusOffset();
};

const getEntitiesForSelection = (editorState) => {

  const selection = editorState.getSelection();
  //both keys need to be the same otherwise disable
  const anchorKey = selection.getAnchorKey();
  const focusKey = selection.getFocusKey();
  if(anchorKey !== focusKey)return [];

  let startPos = selection.getIsBackward()? selection.getFocusOffset() : selection.getAnchorOffset();
  let endPos = selection.getIsBackward()? selection.getAnchorOffset() : selection.getFocusOffset();

  if(startPos === endPos){
    startPos = startPos === 0? 0: startPos-1;
    endPos = endPos+1;
  }

  const block = editorState.getCurrentContent().getBlockForKey(anchorKey);
  let entities = [];
  for(var i=startPos; i<endPos; i++){
    const e = block.getEntityAt(i);
    if(e) entities = entities.concat(block.getEntityAt(i));
  }
  entities = uniq(entities);
  const contentState = editorState.getCurrentContent();
  return entities.map((e)=>{ return contentState.getEntity(e); }).filter((ent)=>{ return ent.type === 'LINK'; });

};

export default LinkEditor;
