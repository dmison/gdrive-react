import uuid from 'node-uuid';

const mailings_reducer = (mailings = [], action) => {
  switch (action.type){

  case 'ADD_MAILING':
    return mailings.concat({
      id: uuid.v1(),
      name: action.name,
      recepients: [],
      content: []
    });

  default: return mailings;
  }
};

export default mailings_reducer;
