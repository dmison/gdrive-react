import React from 'react';

const Link = (props) => {
  const {url} = props.contentState.getEntity(props.entityKey).getData();
  return (
    <a href={url} style={{ color: '#3b5998', textDecoration: 'underline', }} title={url}>
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
