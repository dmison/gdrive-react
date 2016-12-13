import {connect} from 'react-redux';
import MailingComposer from './MailingComposer';
import {addRecipient, delRecipient} from '../Recipient';

const mapStateToProps = (state, ownProps) => {
  return {
    uuid: ownProps.params.uuid,
    mailing: state.mailings.reduce((prev,curr)=>{
      return curr.id === ownProps.params.uuid? curr:prev;
    }, null),
    recipients: state.recipients.filter((recipient)=>{
      return recipient.mailing === ownProps.params.uuid;
    })
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addRecipient: (mailing, name, email) => { dispatch(addRecipient(mailing, name, email)); },
    delRecipient: (mailing, recipient) => { dispatch(delRecipient(mailing, recipient)); },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MailingComposer);
