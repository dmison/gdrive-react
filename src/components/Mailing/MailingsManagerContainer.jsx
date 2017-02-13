import {connect} from 'react-redux';
import MailingsManager from './MailingsManager';

import {addMailingAction, deleteMailing} from './actions.js';

const mapStateToProps = (state) => {
  return {
    mailings: state.mailings.map((mailing)=>{ return { id: mailing.id, name: mailing.name}; })
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addMailing: (name) => { dispatch(addMailingAction(name)); },
    delMailing: (id) => { dispatch(deleteMailing(id)); }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MailingsManager);
