import uuid from 'node-uuid';

const addRecipient = (mailing, name, email) => {
  return {
    type: 'ADD_RECIPIENT',
    mailing: mailing,
    name: name,
    email: email,
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

export {
  addRecipient,
  delRecipient
};
