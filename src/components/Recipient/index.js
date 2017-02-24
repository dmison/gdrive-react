import RecipientsManager from './RecipientsManager.jsx';
import recipientsplaceholder from './recipientsplaceholder.jsx';
import RecipientsGlobalListContainer from './RecipientsGlobalListContainer.js';

import recipients_reducer from './reducer.js';
import {addRecipient, delRecipient, updateRecipient} from './actions.js';

export {
  RecipientsManager,
  RecipientsGlobalListContainer,
  recipientsplaceholder,
  recipients_reducer,
  addRecipient,
  delRecipient,
  updateRecipient
};
