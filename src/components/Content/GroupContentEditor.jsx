import React from 'react';
import {Editor} from '../Editor/';
import ContentEditorToolBar from './ContentEditorToolBar.jsx';
import Select from 'react-select';

class GroupContentEditor extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      editorState: ''
    };
    this._recipientDetails = this._recipientDetails.bind(this);
  }

  render(){

    return (
      <div className='panel panel-default'>
        <div className='panel-heading' style={{padding:3}}>
          <ContentEditorToolBar
            _moveUp={()=>{ this.props.moveContent('up'); }}
            _moveDown={()=>{ this.props.moveContent('down'); }}
            _delete={()=>{
              if(window.confirm('Deleting content is unrecoverable.  Are you sure?')){
                this.props.delete(this.props.content.id);
              }
            }}>
            <Select
              style={{marginTop: 3}}
              name='select-recipient'
              clearable={true}
              multi={true}
              delimited=','
              value={this.props.content.recipients.join(',')}
              options={this.props.recipients.map((r)=>{
                return {value:r.id, label: `${r.name} ${r.email}`, clearableValue:true};
              })}
              onChange={(value)=>{
                this.props.updateRecipients( value.map((r)=>{ return r.value; }) );
              } }
          />
        </ContentEditorToolBar>
        </div>
        <div className='panel-body' style={{padding: 0}}>
          <Editor
            content={this.props.content.editorContent}
            onChange={(content)=>{ this.props.save(content); }}
            mode='markdown'
            theme='tomorrow'
            wrapEnabled={true}
            />
        </div>
      </div>
    );
  }

  _recipientDetails(id){
    return this.props.recipients.find((r)=>{
      return r.id === id;
    });
  }

}

GroupContentEditor.propTypes = {
  children: React.PropTypes.object,
  recipients: React.PropTypes.array,
  content: React.PropTypes.object,
  save: React.PropTypes.func,
  updateRecipients: React.PropTypes.func,
  delete: React.PropTypes.func,
  moveContent: React.PropTypes.func
};



export default GroupContentEditor;
