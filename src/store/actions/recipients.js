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

const purgeRecipient = (recipient) => {
  return {
    type: 'PURGE_RECIPIENT',
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

const mergeRecipients = (recipient, oldones) => {
  return {
    type: 'MERGE_RECIPIENTS',
    recipient: recipient,
    oldones: oldones
  };
};

export {
  addRecipient,
  delRecipient,
  updateRecipient,
  purgeRecipient,
  mergeRecipients
};
