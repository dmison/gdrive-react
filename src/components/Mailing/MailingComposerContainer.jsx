import {connect} from 'react-redux';
import MailingComposer from './MailingComposer';

// import {addMailingAction} from './actions.js';

const mapStateToProps = (state, ownProps) => {
  return {
    uuid: ownProps.params.uuid,
    mailing: state.mailings.reduce((prev,curr)=>{
      return curr.id === ownProps.params.uuid? curr:prev;
    }, null)
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // addMailing: (name) => { dispatch(addMailingAction(name)); }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MailingComposer);
