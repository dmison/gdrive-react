import React from 'react';
import {Link} from 'react-router';
// import FocusToEditInput from '../FocusToEditInput.jsx';
import './RecipientsGlobalList.scss';

class RecipientsGlobalList extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      hideUnused: true,
      hovered: {}
    };
  }

  render() {

    // get dupes
    const duplicates = this.props.recipients.filter((r)=>{
      return r.detail === this.state.hovered.detail;
    }).map((r)=> { return r.id;} );

    return (
      <div>
        <h4>Global Recipient List</h4>
        <div>
          <input readOnly style={{borderBottom: '1px solid lightgrey'}} type='checkbox' checked={this.state.hideUnused} onClick={()=>{ this.setState({hideUnused: !this.state.hideUnused}); }} /> Hide unused
          {this.state.hideUnused?<span> ({this.props.recipients.filter((r)=>{
            return r.mailings.length === 0;}).length} hidden)</span>:''}
        </div>

        <hr/>

        <ul className='RecipientsGlobalList'>

          {this.props.recipients.filter((r)=>{ return !this.state.hideUnused || r.mailings.length > 0; }).map((r)=>{
            const isDuplicate = duplicates.length > 1 && duplicates.filter((d)=> { return d === r.id; }).length > 0;
            return (
              <li className={`recipient ${isDuplicate?'duplicate':''}`} key={r.id} onMouseOver={()=>{ this.setState({hovered: r}); }} onMouseOut={()=>{ this.setState({hovered: {}}); }}>
                <span className='detail'>{r.detail}</span>
                {r.mailings.length > 0? ` (${r.mailings.length} mailing${r.mailings.length===1?'':'s'})`:'' }
                <span className='btn btn-danger btn-xs btn-default delete' style={{visibility: r.mailings.length === 0 && this.state.hovered.id === r.id? 'visible':'hidden'}}><a onClick={()=>{
                  if(window.confirm('Deleting a recipient here is unrecoverable.  Are you sure?')){
                    this.props.purgeRecipient(r.id);
                  }
                }}>delete</a></span>
                <span className='merge btn-info btn btn-xs btn-default ' style={{visibility: isDuplicate?'visible':'hidden'}}><a onClick={()=>{
                  if(window.confirm('Merging recipients is unrecoverable.  Are you sure?')){
                    this.props.mergeRecipients(r, this.props.recipients.filter((recipient)=>{
                      return r.id !== recipient.id && r.detail === recipient.detail;
                    }));
                  }
                }}>merge {duplicates.length}</a></span>
                <ul>
                  {r.mailings.map((m)=>{ return <li className='mailing' key={m.id}><Link to={`mailings/${m.id}`}>{m.name}</Link></li>; })}
                  </ul>
              </li>
            );
          })}

        </ul>

      </div>
    );
  }

}

RecipientsGlobalList.propTypes = {
  recipients: React.PropTypes.array,
  purgeRecipient: React.PropTypes.func,
  mergeRecipients: React.PropTypes.func
};

export default RecipientsGlobalList;

//style={isHovered? hovered: nothovered} key={r.id} onMouseOver={()=>{ this.setState({hovered: r.id}); }} onMouseOut={()=>{ this.setState({hovered: ''}); }}

// {this.props.recipients.filter((r)=>{
//   return !this.state.hideUnused || r.mailings.length > 0;
// }).map((r)=>{
//   const adupe = duplicates.filter((d)=>{ return d === r.id; }).length > 0;
//   return <li className='recipient' key={r.id} onMouseOver={()=>{this.setState({hovered: r});}} >
//     {r.detail} {r.mailings.length > 0? `(${r.mailings.length})` : ''}
//     <span style={{float:'right', marginLeft: '15px'}}><a onClick={()=>{}}>del</a></span>
//     <span style={adupe?{float:'right', marginLeft: '15px'}:{display:'none'}}><a onClick={()=>{}}>merge</a></span>
//     <ul>
//       {r.mailings.map((m)=>{ return <li key={m.id}><Link to={`mailings/${m.id}`}>{m.name}</Link></li>; })}
//     </ul>
//     </li>;
// })}
