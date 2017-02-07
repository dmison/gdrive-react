import React from 'react';
import './Link.less';

const Link = (props) => {

  const {url} = props.contentState.getEntity(props.entityKey).getData();
  return (
    <a className='editorLink' href={url} title={`Link to: ${url}`}>
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
