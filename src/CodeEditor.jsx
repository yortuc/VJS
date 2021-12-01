import React from 'react'
import "./CodeEditor.css"

// import Editor from "@monaco-editor/react";

import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-xcode";

export default class CodeEditor extends React.Component {
  constructor(props){
    super(props)
  }
  applyCode(){
    this.props.onCodeApplyClicked(this.editor.editor.getValue())
  }
  render() {
    return this.props.visible ? (
      <div id="codeView">
        <h3>{this.props.name}</h3>
        <AceEditor
          ref={(editor) => this.editor=editor}
          placeholder="Placeholder Text"
          mode="javascript"
          theme="xcode"
          name="blah2"
          // onLoad={this.onChange}
          // onChange={this.onChange}
          fontSize={14}
          height={250}
          showPrintMargin={true}
          showGutter={true}
          highlightActiveLine={true}
          value={this.props.code}
          setOptions={{
            enableBasicAutocompletion: true,
            enableLiveAutocompletion: true,
            enableSnippets: false,
            showLineNumbers: true,
            tabSize: 2,
          }}/>
        <div id="codeViewFooter">
            <button onClick={this.props.onHideCodeClicked}>Close</button>
            <button onClick={this.applyCode.bind(this)}>
              Apply
            </button>
        </div>
      </div>
    ) : (<></>);
  }
}