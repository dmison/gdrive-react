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

    return (
      <AceEditor
        name={name}
        height={`${(this.props.content.split('\n').length)*16+20}px`}
        mode={this.props.mode}
        theme={this.props.theme}
        width='90%'
        fontSize={14}
        onChange={(content)=>{ this.props.onChange(content); }}
        value={this.props.content}
        wrapEnabled={this.props.wrapEnabled}
        showPrintMargin={false}
        enableBasicAutocompletion={true}
        enableLiveAutocompletion={true}
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
