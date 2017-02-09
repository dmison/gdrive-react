const addMailingAction = (name) => {
  return {
    type: 'ADD_MAILING',
    name: name
  };
};

const updateMailing = (id, name, subject) => {
  return {
    type: 'UPDATE_MAILING',
    mailing: id,
    name: name,
    subject: subject
  };
};

export {
  addMailingAction,
  updateMailing
};
