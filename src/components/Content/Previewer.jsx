import React from 'react';
import Select from 'react-select';
import contentForRecipient from './ContentForRecipient.js';

class Previewer extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      selectedRecipient: ''
    };
  }

  componentDidMount(){
    if(this.props.recipients.length > 0){
      this.setState({selectedRecipient: this.props.recipients[0].id});
    }
  }

  render(){
    const previewContent = contentForRecipient(this.props.content, this.state.selectedRecipient);
    return (
      <div>
        <Select
          style={{marginTop:3}}
          name='select-recipient'
          clearable={false}
          value={this.state.selectedRecipient}
          options={this.props.recipients.map((r)=>{
            return {value:r.id, label: `${r.name} ${r.email}`};
          })}
          onChange={(value)=>{
            if(!Array.isArray(value)){
              this.setState({selectedRecipient: value.value});
            }
          }}
          />

        <pre style={{paddingLeft:10}}>
            {previewContent.map((c)=>{
              return c===''?'':`${c}\n\n`;
            })}
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
