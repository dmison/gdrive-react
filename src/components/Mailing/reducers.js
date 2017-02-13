import uuid from 'node-uuid';

const mailings_reducer = (mailings = [], action) => {
  switch (action.type){

  case 'ADD_MAILING':
    return mailings.concat({
      id: uuid.v1(),
      name: action.name,
      recepients: [],
      subject:'',
      content: []
    });

  case 'UPDATE_MAILING':
    return mailings.map((m)=>{
      if(m.id === action.mailing){
        m.name = action.name;
        m.subject = action.subject;
      }
      return m;
    });

  case 'DELETE_MAILING':
    return mailings.filter((m)=>{
      return m.id !== action.mailing;
    });

  default: return mailings;
  }
};

export default mailings_reducer;
