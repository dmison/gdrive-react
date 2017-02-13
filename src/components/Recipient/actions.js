import uuid from 'node-uuid';

const addRecipient = (mailing, details) => {
  return {
    type: 'ADD_RECIPIENT',
    mailing: mailing,
    details: details.split(','),
    newIDs: details.split(',').map(()=>{ return uuid.v1(); })
  };
};

const delRecipient = (mailing, recipient) => {
  return {
    type: 'DEL_RECIPIENT',
    mailing: mailing,
    recipient: recipient
  };
};

const updateRecipient = (recipient, detail) => {
  return {
    type: 'UPDATE_RECIPIENT',
    detail: detail,
    recipient: recipient
  };
};

export {
  addRecipient,
  delRecipient,
  updateRecipient
};
