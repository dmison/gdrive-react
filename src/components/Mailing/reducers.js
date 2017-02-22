import uuid from 'node-uuid';

const mailings_reducer = (mailings = [], action) => {
  switch (action.type){

  case 'ADD_RECIPIENT':
    return mailings.map((m)=>{
      if (m.id === action.mailing){
        m.recipients = m.recipients.concat(action.newIDs);
      }
      return m;
    });

  case 'DEL_RECIPIENT':
    return mailings.map((m)=>{
      m.recipients = m.recipients.filter((r)=>{
        return r !== action.recipient;
      });
      return m;
    });

  case 'ADD_MAILING':
    return mailings.concat({
      id: uuid.v1(),
      name: action.name,
      recipients: [],
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

  case 'DUPE_MAILING': {
    const toDupe = mailings.filter((m)=>{
      return m.id === action.mailing;
    });
    // console.log('toDupe: ', toDupe);
    //
    const theDupe = toDupe.map((mailing)=>{
      mailing = JSON.parse(JSON.stringify(mailing));
      mailing.id = action.newID;
      mailing.name = `copy of ${mailing.name}`;
      return mailing;
    });

    return mailings.concat(theDupe);

  }

  default: return mailings;
  }
};

export default mailings_reducer;
