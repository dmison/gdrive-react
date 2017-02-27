import React from 'react';

import AceEditor from 'react-ace';

import 'brace/ext/language_tools';
import 'brace/mode/markdown';
import 'brace/mode/yaml';
import 'brace/mode/html';
import 'brace/theme/tomorrow';

class Editor extends React.Component {
  constructor(props){
    super(props);
  }

  shouldComponentUpdate(nextProps) {
    return (  (nextProps.content !== this.props.content) ||
              (nextProps.wrapEnabled !== this.props.wrapEnabled) );
  }

  render() {
    const name = `${this.props.mode}Editor`;

    const hardLines = this.props.content.split('\n').map((chars)=>{
      return chars.length > 90? chars.length/90 : 1;
    }).reduce((curr, prev)=>{
      return prev+curr;
    }, 0);

    return (
      <AceEditor
        name={name}
        height={`${(hardLines)*16+20}px`}
        mode={this.props.mode}
        theme={this.props.theme}
        width='90%'
        fontSize={12}
        onChange={(content)=>{ this.props.onChange(content); }}
        value={this.props.content}
        wrapEnabled={this.props.wrapEnabled}
        showPrintMargin={false}
        enableBasicAutocompletion={false}
        enableLiveAutocompletion={false}
      />
    );
  }
}

Editor.propTypes = {
  content: React.PropTypes.string,
  onChange: React.PropTypes.func,
  mode: React.PropTypes.string,
  theme: React.PropTypes.string,
  wrapEnabled: React.PropTypes.bool
};


export default Editor;
