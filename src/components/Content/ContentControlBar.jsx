import React from 'react';

const buttonBlockStyle = {
  paddingRight: 10
};

const ContentControlBar = (props) => {

  return (
    <div className="toolbar" >
        <div className='btn-group' style={buttonBlockStyle}>
          <a className='btn btn-danger btn-sm' onClick={props._delete}><i className='fa fa-trash' title='Delete this content (unrecoverable).'/></a>
        </div>
        <div className='btn-group' style={buttonBlockStyle}>
          <a className='btn btn-default btn-sm' onClick={props._moveUp}><i className='fa fa-chevron-up' title='Move content block up.'/></a>
          <a className='btn btn-default btn-sm' onClick={props._moveDown}><i className='fa fa-chevron-down' title='Move content block down.'/></a>
        </div>
      {props.children}
  </div>

  );
};

ContentControlBar.propTypes = {
  children: React.PropTypes.node,
  _delete: React.PropTypes.func,
  _moveUp: React.PropTypes.func,
  _moveDown: React.PropTypes.func,
};

export default ContentControlBar;
