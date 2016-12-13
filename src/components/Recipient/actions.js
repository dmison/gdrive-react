const addRecipient = (mailing, name, email) => {
  return {
    type: 'ADD_RECIPIENT',
    mailing: mailing,
    name: name,
    email: email
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
