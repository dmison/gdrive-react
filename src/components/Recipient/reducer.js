
const recipients_reducer = (recipients = [], action) => {
  switch (action.type){

  case 'ADD_RECIPIENT':
    return recipients.concat(action.details.map((d, index)=>{
      return {
        id: action.newIDs[index],
        detail: d.trim()
      };
    }));

  case 'PURGE_RECIPIENT':
    return recipients.filter((recipient)=>{
      return !(recipient.id === action.recipient);
    });

  case 'MERGE_RECIPIENTS':{
    return recipients.filter((recipient)=>{
      const isFound = action.oldones.find((oo)=>{
        return oo.id === recipient.id;
      });
      return typeof isFound === 'undefined';
    });
  }

  case 'UPDATE_RECIPIENT':
    return recipients.map((r)=>{
      r.detail = (r.id === action.recipient) ? action.detail : r.detail;
      return r;
    });

  default: return recipients;
  }
};

export default recipients_reducer;
