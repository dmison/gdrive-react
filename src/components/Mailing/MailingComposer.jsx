import React from 'react';

const MailingComposer = (props) => {
  if (props.mailing === null) return <div>No mailing with UUID {props.uuid}.</div>
  return (
    <div>
      <h4>{props.mailing.name}</h4>
    </div>
  );
};

MailingComposer.propTypes = {
  mailing: React.PropTypes.object,
  uuid: React.PropTypes.string
};

export default MailingComposer;
