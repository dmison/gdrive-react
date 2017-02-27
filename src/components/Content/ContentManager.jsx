import React from 'react';
import CommonContentEditor from './CommonContentEditor.jsx';
import PerRecipientContentEditor from './PerRecipientContentEditor.jsx';
import GroupContentEditor from './GroupContentEditor.jsx';
import Preview from './Previewer.jsx';
import EmailSender from '../Email/EmailSender.jsx';

import Tabs from 'react-bootstrap/lib/Tabs';
import Tab from 'react-bootstrap/lib/Tab';
import FlipMove from 'react-flip-move';

class ContentManager extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      showModal: false
    };
  }

  render(){

    const controlStripStyle = {
      marginTop: 15,
      marginBottom: 15,
      backgroundColor: '#f5f5f5',
      padding: 3,
      borderTop: '1px solid #ccc',
      borderBottom: '1px solid #ccc',
      borderLeft: '1px solid #ddd',
      borderRight: '1px solid #ddd'

    };

    return (
      <div>

        <button className='btn btn-success'
                disabled={this.props.recipients.length === 0}
                style={{width: 80, fontSize:12, paddingBottom: 5, float: 'right'}}
                onClick={()=>{ this.setState({showModal: true}); }}
                >Send <i className='fa fa-paper-plane-o' aria-hidden='true'></i></button>
        <Tabs defaultActiveKey={1} id="details-tabs">
            <Tab eventKey={1} title="Edit">

                <div style={controlStripStyle}>
                    <button style={{marginRight:10, paddingBottom:5}} className='btn btn-default' onClick={this.props.addCommonContent}><span className='fa fa-plus'></span> Add Common Content</button>
                    <button style={{marginRight:10, paddingBottom:5}} className='btn btn-default' onClick={this.props.addPerRecipientContent}><span className='fa fa-plus'></span> Add Per-Recipient Content</button>
                    <button style={{marginRight:10, paddingBottom:5}} className='btn btn-default' onClick={this.props.addGroupContent}><span className='fa fa-plus'></span> Add Group Content</button>
                </div>


                <FlipMove duration={350} easing="ease-out" staggerDurationBy='30'>
                  {this.props.content.map((content)=>{
                    let Editor = '';
                    switch(content.type){
                    case 'common':
                      Editor = (<CommonContentEditor
                        content={content}
                        delete={()=>{this.props.delContent(content.id);} }
                        moveContent={(direction)=>{ this.props.moveContent(content.id, direction); } }
                        save={(editorContent)=>{
                          this.props.updateCommonContentText(content.id, editorContent);
                        }}><span>{content.type}</span></CommonContentEditor>);
                      break;
                    case 'per_recipient':
                      Editor = <PerRecipientContentEditor
                        content={content}
                        recipients={this.props.recipients}
                        delete={()=>{this.props.delContent(content.id);} }
                        moveContent={(direction)=>{ this.props.moveContent(content.id, direction); } }
                        save={(editorContent, recipient)=>{
                          this.props.updatePerRecipientContent(content.id, editorContent, recipient);
                        }}></PerRecipientContentEditor>;
                      break;
                    case 'group':
                      Editor = <GroupContentEditor
                        content={content}
                        recipients={this.props.recipients}
                        delete={()=>{this.props.delContent(content.id);} }
                        moveContent={(direction)=>{ this.props.moveContent(content.id, direction); } }
                        updateRecipients={(recipients)=>{ this.props.updateGroupContentRecipients(content.id, recipients); } }
                        save={(editorContent)=>{
                          this.props.updateGroupContentText(content.id, editorContent);
                        }}></GroupContentEditor>;
                      break;
                    default: '';
                    }
                    return <div key={content.id}>{Editor}</div>;
                  })}
                </FlipMove>
            </Tab>

            <Tab eventKey={2} title="Preview">
              <Preview content={this.props.content} recipients={this.props.recipients}/>
            </Tab>

          </Tabs>

          <EmailSender show={this.state.showModal} subject={this.props.mailing.subject} content={this.props.content} recipients={this.props.recipients} onDone={()=>{this.setState({showModal: false}); }} />


      </div>
    );
  }

}

ContentManager.propTypes = {
  content: React.PropTypes.array,
  recipients: React.PropTypes.array,
  mailing: React.PropTypes.object,
  addCommonContent: React.PropTypes.func,
  addPerRecipientContent: React.PropTypes.func,
  updatePerRecipientContent: React.PropTypes.func,
  updateCommonContentText: React.PropTypes.func,
  addGroupContent: React.PropTypes.func,
  updateGroupContentText: React.PropTypes.func,
  updateGroupContentRecipients: React.PropTypes.func,
  delContent: React.PropTypes.func,
  moveContent: React.PropTypes.func
};


export default ContentManager;
