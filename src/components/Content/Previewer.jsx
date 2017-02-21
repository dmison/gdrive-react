import React from 'react';
import Select from 'react-select';
import contentForRecipient from './ContentForRecipient.js';
import {getEmail, getName} from '../Recipient/utils.js';
import Handlebars from 'handlebars';

class Previewer extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      selectedRecipient: null
    };
  }

  render(){
    let previewContent = '';

    const theSelectedRecipient = this.props.recipients.find((r)=>{
      return r.id === this.state.selectedRecipient;
    });

    if(typeof theSelectedRecipient === 'undefined'){
      previewContent = 'no selected recipient';
    } else {
      let recipientDetail = theSelectedRecipient.detail;
      const rawContent = contentForRecipient(this.props.content, this.state.selectedRecipient).map((c)=>{
        return c===''?'':`${c}\n\n`;
      }).join('');
      try{
        const builder = Handlebars.compile(rawContent);
        previewContent = builder({ email:getEmail(recipientDetail), name:getName(recipientDetail) });
      }catch(e){
        previewContent = rawContent;
      }
    }

    return (
      <div>
        <Select
          style={{margin:'10px 0px 5px 0px'}}
          name='select-recipient'
          clearable={false}
          value={this.state.selectedRecipient}
          options={this.props.recipients.map((r)=>{
            return {value:r.id, label: `${r.detail}`};
          })}
          onChange={(value)=>{
            if(!Array.isArray(value)){
              this.setState({selectedRecipient: value.value});
            }
          }}
          />

        <pre style={{paddingLeft:10}}>
            {previewContent}
        </pre>
    </div>

    );
  }
}

Previewer.propTypes = {
  content: React.PropTypes.array,
  recipients: React.PropTypes.array
};

export default Previewer;
