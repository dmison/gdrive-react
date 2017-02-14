import React from 'react';
// import ReactDOM from 'react-dom';
import {Link} from 'react-router';
import './MailingsManager.scss';

class MailingsManager extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      adding: false,
      newName: ''
    };
  }

  render(){

    return (

      <div>
        <h3>Mailings</h3>
        {this.state.adding ?
          <AddNewMailingControl
            save={(name)=>{ this.props.addMailing(name); this.setState({ adding: false});}}
            cancel={()=>{ this.setState({ adding: false}); }} /> :
          <button onClick={()=>{ this.setState({ adding: true});}} className='btn btn-default'>
            <i className='fa fa-plus' aria-hidden='true'></i> Add New Mailing
          </button>}

        <ul style={{paddingLeft: 20, marginTop: 15, width: 450}}>
          {this.props.mailings.map((mailing)=>{
            const name = (mailing.name === '')?
              <span style={{backgroundColor: '#ff6666'}}>No name supplied.</span> :
              <span>{mailing.name}</span>;

            return (
              <li className='mailing-list-item' key={mailing.id}>
                <Link to={`mailings/${mailing.id}`}>{name}</Link>
                <i onClick={()=>{
                  if(window.confirm('Deleting a mailing is unrecoverable.  Are you sure?')){
                    this.props.delMailing(mailing.id);
                  }
                }} className='mailingDel fa fa-times ' style={{color: '#982d22'}} aria-hidden='true' title='delete mailing'></i>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }

}

MailingsManager.propTypes = {
  mailings: React.PropTypes.array,
  addMailing: React.PropTypes.func,
  delMailing: React.PropTypes.func
};

class AddNewMailingControl extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      name: ''
    };
  }

  componentDidMount(){
    this.nameEditBox.focus();
  }

  render(){
    return (
      <div>
        <input ref={(input)=>{ this.nameEditBox = input; }} type='text' value={this.state.name} onChange={(event)=>{ this.setState({name:event.target.value}); }} />
        <button onClick={()=>{this.props.save(this.state.name);}}>Save</button>
        <button onClick={this.props.cancel}>Cancel</button>
      </div>
    );
  }

}

AddNewMailingControl.propTypes = {
  save: React.PropTypes.func,
  cancel: React.PropTypes.func
};

export default MailingsManager;
