import uuid from 'node-uuid';

const mailings_reducer = (mailings = [], action) => {
  switch (action.type){

  // ======================================================== MAILING ACTIONS
  case 'ADD_MAILING':
    return mailings.concat({
      id: uuid.v1(),
      name: action.name,
      recipients: [],
      subject:''
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
    const theDupe = toDupe.map((mailing)=>{
      mailing = JSON.parse(JSON.stringify(mailing));
      mailing.id = action.newID;
      mailing.name = `copy of ${mailing.name}`;
      return mailing;
    });
    return mailings.concat(theDupe);
  }


  // ======================================================== RECIPIENT ACTIONS
  case 'ADD_RECIPIENT':
    return mailings.map((m)=>{
      if (m.id === action.mailing){
        m.recipients = m.recipients.concat(action.newIDs);
      }
      return m;
    });

  case 'MERGE_RECIPIENTS':
    return mailings.map((m)=>{
      m.recipients = m.recipients.map((r)=>{
        const inOldOnes = typeof (action.oldones.find((oo)=>{ return oo.id === r; })) !== 'undefined';
        if(inOldOnes)r = action.recipient.id;
        return r;
      });
      return m;
    });

  case 'PURGE_RECIPIENT':
    return mailings.map((m)=>{
      m.recipients = m.recipients.filter((r)=>{
        return r !== action.recipient;
      });
      return m;
    });

  case 'DEL_RECIPIENT':
    return mailings.map((m)=>{
      if(m.id === action.mailing){
        m.recipients = m.recipients.filter((r)=>{
          return r !== action.recipient;
        });
      }
      return m;
    });



  default: return mailings;
  }
};

export default mailings_reducer;
