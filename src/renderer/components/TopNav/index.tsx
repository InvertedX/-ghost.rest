import {
  AnchorButton,
  Button,
  ButtonGroup,
  Classes,
  Dialog,
  FormGroup,
  InputGroup,
  Intent,
  Position,
  Toaster,
} from "@blueprintjs/core";
import { inject, observer } from "mobx-react";
import * as React from "react";
import styled from "styled-components";
import { StoreRoot } from "../../store";

const TopSection = styled.div`
  border-bottom: 1px solid ${(props) => props.theme.secondary};
  background-color: ${(props) => props.theme.main};
  height: 60px;
  display: flex;
`;
const Container = styled.div`
  display: flex;
  flex: 1;
  margin-right: 12px;
  flex-direction: row;
  justify-content: space-between;
  align-content: center;
`;

const OverFlowTextContainer = styled.span`
  display: inline;
  overflow: hidden;
  justify-content: center;
  text-overflow: ellipsis;
`;

interface IStatusProps {
  status:boolean;
  onClick:() => void;
}
function Status(props:IStatusProps) {
  return (
    <Button
      onClick={props.onClick}
      intent={props.status ? Intent.SUCCESS : Intent.DANGER}
      icon="full-circle"
    >
      {props.status ? "Running" : "Stopped"}
    </Button>
  );
}
@inject("appState")
@observer
class TopNav extends React.Component<
  { appState?:StoreRoot },
  { dialogState:boolean }
> {
  public state = {
    dialogState: false,
  };
  private toaster:Toaster;
  private target:string = "";
  private local:string = "";

  private refHandlers = {
    toaster: (ref:Toaster) => (this.toaster = ref),
  };

  public render() {
    const { running, currentTarget } = this.props.appState!.serverHandler;
    return (
      <TopSection>
        <Container>
          <ButtonGroup className="bp3-dark" minimal={true}>
            <Button rightIcon="edit" onClick={this.openDialog}>
              <b>Target Server: </b>{" "}
              <OverFlowTextContainer>
                {currentTarget.url}
                {currentTarget.port === 80 ? "" : currentTarget.port}
              </OverFlowTextContainer>
            </Button>
            <Status onClick={this.startOrStop} status={running} />
          </ButtonGroup>
          <ButtonGroup className="bp3-dark" minimal={true}>
            <Button rightIcon="edit">Target Server</Button>
            <Button icon="full-circle">Functions</Button>
            <AnchorButton rightIcon="caret-down">Options</AnchorButton>
            <Button icon="cog" />
          </ButtonGroup>
        </Container>

        <Dialog
          className="bp3-dark"
          canOutsideClickClose={true}
          hasBackdrop={false}
          usePortal={true}
          isOpen={this.state.dialogState}
          onClose={this.handleClose}
          title="Edit server"
        >
          <div className={Classes.DIALOG_BODY}>
            <FormGroup
              label="Target Server"
              labelFor="text-target"
              labelInfo="(required)"
            >
              <InputGroup
                onChange={this.setTarget}
                id="text-target"
                placeholder="http://httpbin.org"
              />
            </FormGroup>

            <FormGroup
              label="Local Server"
              labelFor="text-locl"
              labelInfo="(required)"
            >
              <InputGroup
                id="text-locl"
                onChange={this.serLocal}
                placeholder="http://localhost:6200"
              />
            </FormGroup>
          </div>
          <div className={Classes.DIALOG_FOOTER}>
            <div className={Classes.DIALOG_FOOTER_ACTIONS}>
              <Button
                intent={Intent.WARNING}
                minimal={true}
                onClick={this.handleClose}
              >
                Close
              </Button>

              <AnchorButton
                intent={Intent.SUCCESS}
                minimal={true}
                onClick={this.saveTarget}
              >
                Save
              </AnchorButton>
            </div>
          </div>
        </Dialog>
        <Toaster
          usePortal={true}
          position={Position.BOTTOM_RIGHT}
          ref={this.refHandlers.toaster}
        >
          {/* "Toasted!" will appear here after clicking button. */}
        </Toaster>
      </TopSection>
    );
  }

  public handleClose = () => {
    this.setState({ dialogState: !this.state.dialogState });
  }

  public setTarget = (event:React.FormEvent<HTMLInputElement>) => {
    if (event.currentTarget != null) {
      this.target = event.currentTarget.value;
    }
  }

  public serLocal = (event:React.FormEvent<HTMLInputElement>) => {
    if (event.currentTarget != null) {
      this.local = event.currentTarget.value;
    }
  }

  public maketoast = () => {
    this.toaster.show({
      message: "Server started successfully",
      intent: Intent.SUCCESS,
      icon: "endorsed",
      timeout: 2000,
    });
  }

  public openDialog = () => {
    this.setState({ dialogState: true });
  }

  public saveTarget = () => {
    const target = new URL(this.target);
    const localServer = new URL(this.local);
    this.props.appState!.serverHandler.setCurrentTarget({
      port: localServer.port === "" ? 5200 : parseInt(localServer.port, 10),
      url: target.href,
    });
    this.startOrStop();
  }

  private startOrStop = () => {
    if (this.props.appState!.serverHandler.running) {
      this.props.appState!.serverHandler.stopServer();
    }
    this.props.appState!.serverHandler.startServer(() => {
      if (this.state.dialogState) {
        this.handleClose();
      }
      this.toaster.show({
        intent: Intent.SUCCESS,
        message: "Server started successfully" + this.local,
      });
    });
  }
}

export default TopNav;
