import React from 'react';

class FocusToEditInput extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      editing: false
    };
  }

  render(){
    if(this.state.editing){
      return <input
        className={this.props.inputClassName}
        style={this.props.inputStyle}
        ref={(input)=>{this.inputbox = input;} }
        onChange={(event)=>{ this.props.onChange(event.target.value); } }
        type={this.props.type}
        title={this.props.editPlaceHolder}
        placeholder={this.props.editPlaceHolder}
        value={ this.props.value }
        onBlur={()=>{this.setState({editing: false});}}
        onKeyUp={(event)=>{ if (event.key === 'Enter'){ this.setState({editing: false}); }}}

        />;
    } else {
      return <span
          className={this.props.textClassName}
          style={this.props.textStyle}
          title='Click to edit.'
          onClick={()=>{ this.setState({editing: true},()=>{this.inputbox.focus();});}}>
            { this.props.value===''?this.props.viewPlaceHolder:this.props.value }
        </span>;
    }
  }
}

FocusToEditInput.propTypes = {
  value: React.PropTypes.oneOfType([React.PropTypes.string,React.PropTypes.number]),
  inputClassName: React.PropTypes.string,
  textClassName: React.PropTypes.string,
  inputStyle: React.PropTypes.object,
  textStyle: React.PropTypes.object,
  type: React.PropTypes.oneOf(['text', 'password', 'number']),
  onChange: React.PropTypes.func.isRequired,
  editPlaceHolder: React.PropTypes.string,
  viewPlaceHolder: React.PropTypes.string
};

FocusToEditInput.defaultProps = {
  inputClassName: '',
  textClassName: '',
  inputStyle: {},
  textStyle: {},
  type: 'text',
  editPlaceHolder: 'Type here to edit.',
  viewPlaceHolder: 'Click here to edit.'
};

export default FocusToEditInput;
