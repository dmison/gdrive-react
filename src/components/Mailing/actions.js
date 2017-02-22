import uuid from 'node-uuid';

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

const deleteMailing = (id) => {
  return {
    type: 'DELETE_MAILING',
    mailing: id
  };
};

const dupeMailing = (id) => {
  return {
    type: 'DUPE_MAILING',
    mailing: id,
    newID: uuid.v1()
  };
};

export {
  addMailingAction,
  updateMailing,
  deleteMailing,
  dupeMailing
};
