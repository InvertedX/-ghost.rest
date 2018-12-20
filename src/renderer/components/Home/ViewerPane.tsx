import * as React from "react";
import SplitPane from "react-split-pane";
import Editor from "../Editor";

class ViewerPane extends React.PureComponent<
  { container:number; totalWidth:number },
  { left:number; right:number }
> {
  constructor(props:any) {
    super(props);
    console.log("WU", this.props.totalWidth);

    this.state = {
      left: this.props.totalWidth / 2,
      right: this.props.totalWidth / 2,
    };
  }

  public render() {
    return (
      <SplitPane
        split="vertical"
        minSize={this.props.container / 3}
        onChange={this.onResize}
        maxSize={this.props.container}
        defaultSize={"50%"}
      >
        <div style={{ paddingRight: 4 }}>
          {/* <div style={{ height: 80 }} /> */}
          <Editor width={this.state.left} />
        </div>
        <div>
          {/* <div style={{ height: 80 }} /> */}
          <Editor width={this.state.right} />
        </div>
      </SplitPane>
    );
  }
  private onResize = (size) => {
    // console.log("size", size, this.props.totalWidth);
    // console.log("left", this.props.totalWidth - size);
    this.setState({
      left: size,
      right: this.props.totalWidth - size,
    });
  }
}

export default ViewerPane;
