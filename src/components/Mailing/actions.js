const addMailingAction = (name) => {
  return {
    type: 'ADD_MAILING',
    name: name
  };
};

export {
  addMailingAction
};
