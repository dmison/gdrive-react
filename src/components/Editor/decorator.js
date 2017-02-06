import {CompositeDecorator} from 'draft-js';
import Link from './Link.jsx';


const findLinkEntities = (contentBlock, callback, contentState) => {
  contentBlock.findEntityRanges(
    (character) => {
      const entityKey = character.getEntity();
      return (
        entityKey !== null &&
        contentState.getEntity(entityKey).getType() === 'LINK'
      );
    },
    callback
  );
};

const decorator = new CompositeDecorator([{
  strategy: findLinkEntities,
  component: Link,
}]);


export default decorator;
