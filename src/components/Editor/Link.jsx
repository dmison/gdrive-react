import React from 'react';
require('./Link.less');

const Link = (props) => {
  const {url} = props.contentState.getEntity(props.entityKey).getData();
  return (
    <a className='editorLink' href={url} title={url}>
      {props.children}
    </a>
  );
};

Link.propTypes = {
  contentState: React.PropTypes.object,
  entityKey: React.PropTypes.string,
  children: React.PropTypes.node
};

export default Link;