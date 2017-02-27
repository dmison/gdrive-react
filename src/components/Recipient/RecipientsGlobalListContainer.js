import {connect} from 'react-redux';
import RecipientsGlobalList from './RecipientsGlobalList.jsx';

import { purgeRecipient, mergeRecipients } from '../../store/actions/recipients.js';

const mapStateToProps = (state) => {
  return {
    recipients: state.recipients.map((r)=>{
      r.mailings = state.mailings.filter((mailing)=>{
        return mailing.recipients.filter((recipient)=>{ return recipient === r.id; }).length > 0;
      });
      return r;
    })
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    purgeRecipient: (recipient) => { dispatch(purgeRecipient(recipient)); },
    mergeRecipients: (recipient, oldones) => { dispatch(mergeRecipients(recipient, oldones)); }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RecipientsGlobalList);
