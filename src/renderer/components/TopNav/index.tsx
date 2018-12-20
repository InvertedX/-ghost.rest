import { AnchorButton, Button, ButtonGroup, Classes, Dialog, FormGroup, InputGroup, Intent, Position, Toaster } from "@blueprintjs/core";
import * as React from "react";
import styled from "styled-components";

const TopSection = styled.div`
  border-bottom: 1px solid ${(props) => props.theme.secondary};
  background-color: ${(props) => props.theme.main};
  height: 60px;
  display: flex;
`;
const Container = styled.div`
  display: flex;
  flex:1;
  margin-right:12px;
  flex-direction: row;
  justify-content: space-between;
  align-content: center; `;

const OverFlowTextContainer = styled.span`
  display:inline;
  overflow:hidden;
  justify-content:center;
  text-overflow: ellipsis;
`;

class TopNav extends React.PureComponent<{}, { dialogState: boolean }> {
  public state = {
    dialogState: false,
  };
  private toaster:Toaster;
  private refHandlers = {
    toaster: (ref:Toaster) => this.toaster = ref,
  };

  public render() {
    return (

      <TopSection>
        <Container>
          <ButtonGroup className="bp3-dark" minimal={true}>
            <Button rightIcon="edit" onClick={this.openDialog}>
              <b>Target Server: </b> <OverFlowTextContainer>https://blueprintjs.com/docs/#core/components/text</OverFlowTextContainer>
            </Button>
            <Button onClick={this.maketoast} intent={Intent.DANGER} icon="full-circle">Running</Button>
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
          icon="edit"
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
              <InputGroup id="text-target" placeholder="Placeholder text" />
            </FormGroup>

            <FormGroup
              label="Local Server"
              labelFor="text-locl"
              labelInfo="(required)"
            >
              <InputGroup id="text-locl" placeholder="Placeholder text" />
            </FormGroup>
          </div>
          <div className={Classes.DIALOG_FOOTER}>
            <div className={Classes.DIALOG_FOOTER_ACTIONS}>

              <Button intent={Intent.WARNING} minimal={true} onClick={this.handleClose}>Close</Button>

              <AnchorButton
                intent={Intent.SUCCESS}
                minimal={true}
                href="https://www.palantir.com/palantir-foundry/"
                target="_blank"
              >
                Save
              </AnchorButton>
            </div>
          </div>

        </Dialog>
        <Toaster usePortal={true} position={Position.BOTTOM_RIGHT} ref={this.refHandlers.toaster}>
          {/* "Toasted!" will appear here after clicking button. */}
        </Toaster>
      </TopSection >
    );
  }

  public handleClose = () => {
    this.setState({ dialogState: !this.state.dialogState });
  }

  public maketoast = () => {
    this.toaster.show({ message: "Server started successfully", intent : Intent.SUCCESS, icon:"endorsed", timeout:2000 });
  }

  public openDialog = () => {
    this.setState({ dialogState: true });
  }

}

export default TopNav;
