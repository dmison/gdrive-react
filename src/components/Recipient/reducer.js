import uuid from 'node-uuid';

const recipients_reducer = (recipients = [], action) => {
  switch (action.type){

  case 'ADD_RECIPIENT':
    return recipients.concat({
      id: uuid.v1(),
      name: action.name,
      email: action.email,
      mailing: action.mailing,
    });

  case 'DEL_RECIPIENT':
    return recipients.filter((recipient)=>{
      return !(recipient.id === action.recipient && recipient.mailing === action.mailing);
    });

  default: return recipients;
  }
};

export default recipients_reducer;
