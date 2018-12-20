import "brace";
// tslint:disable-next-line:no-submodule-imports
import "brace/mode/json";
// tslint:disable-next-line:no-submodule-imports
// import "brace/theme/eclipse";
import * as React from "react";
import AceEditor from "react-ace";
// tslint:disable-next-line:no-submodule-imports:disable-next-line:no-implicit-dependencies
import "../../theme/ace_onedark.jlib";

const code = `
{
  "slideshow": {
    "author": "Yours Truly",
    "date": "date of publication",
    "slides": [
      {
        "title": "Wake up to WonderWidgets!",
        "type": "all"
      },
      {
        "title": "Wake up to WonderWidgets!",
        "type": "all"
      },
      {
        "title": "Wake up to WonderWidgets!",
        "type": "all"
      },
      {
        "title": "Wake up to WonderWidgets!",
        "type": "all"
      },
      {
        "title": "Wake up to WonderWidgets!",
        "type": "all"
      },
      {
        "title": "Wake up to WonderWidgets!",
        "type": "all"
      },
      {
        "title": "Wake up to WonderWidgets!",
        "type": "all"
      },
      {
        "title": "Wake up to WonderWidgets!",
        "type": "all"
      },
      {
        "title": "Wake up to WonderWidgets!",
        "type": "all"
      },
      {
        "title": "Wake up to WonderWidgets!",
        "type": "all"
      },
      {
        "title": "Wake up to WonderWidgets!",
        "type": "all"
      },
      {
        "title": "Wake up to WonderWidgets!",
        "type": "all"
      },
      {
        "title": "Wake up to WonderWidgets!",
        "type": "all"
      },
      {
        "title": "Wake up to WonderWidgets!",
        "type": "all"
      },
      {
        "items": [
          "Why <em>WonderWidgets</em> are great",
          "Who <em>buys</em> WonderWidgets"
        ],
        "title": "Overview",
        "type": "all"
      }
    ],
    "title": "Sample Slide Show"
  }
}`;
class Editor extends React.Component<any, { dimensions:any }> {
  private editor:any;
  constructor(props:any) {
    super(props);
    this.onResize = this.onResize.bind(this);
    this.onEditorLoaded = this.onEditorLoaded.bind(this);
  }

  public componentDidMount() {
    window.addEventListener("resize", this.onResize);
  }
  public componentWillMount() {
    window.removeEventListener("resize", this.onResize);
  }
  public onResize() {
    if (this.editor) {
      this.editor.resize();
    }
  }

  public resize(contentRect:any) {
    console.log("resiu", contentRect);
  }

  public render() {
    return (
      <AceEditor
        mode="json"
        style={{ paddingBottom: 12 }}
        onLoad={this.onEditorLoaded}
        height="90vh"
        width={"auto"}
        value={code}
        theme="one-dark"
        name="editor"
        editorProps={{ $blockScrolling: false, showPrintMargin: false }}
      />
    );
  }
  private onEditorLoaded(editor:any) {
    this.editor = editor;
    editor.setShowPrintMargin(false);
  }
}

export default Editor;
