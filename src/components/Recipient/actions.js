import uuid from 'node-uuid';

const addRecipient = (mailing, detail) => {
  return {
    type: 'ADD_RECIPIENT',
    mailing: mailing,
    detail: detail,
    newID: uuid.v1()
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
