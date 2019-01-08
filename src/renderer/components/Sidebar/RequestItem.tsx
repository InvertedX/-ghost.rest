// import { Button, Card, Elevation } from "@blueprintjs/core";
import { Intent, Spinner } from "@blueprintjs/core";
import { inject, observer } from "mobx-react";
import * as React from "react";
import styled from "styled-components";
// import { IRequest } from "../../../shared/models";
import { RequestStore } from "../../store/RequestStore";

const RequestContainer = styled("div")<{ selected?:boolean }>`
  color: ${(props) => props.theme.white};
  margin-bottom: 6px;
  margin-top: 6px;
  padding: 6px;
  cursor: pointer;
  padding-left: 4px;
  display: flex;
  border-left: 2px solid ${(props) => (props.selected ? "red" : "transperant")};
  flex-direction: row;
  align-items: center;
  :hover {
    background: #3c4451;
  }
`;

const Status = styled.div`
  margin-right: 8px;
  flex: 1;
  margin-left: 8px;
  text-transform: capitalize;
`;

const StyledSpinner = styled(Spinner)`
  margin-right: 2px;
  margin-left: 8px;
  flex: 1;
  align-items: flex-end;
  text-transform: capitalize;
`;

const Url = styled("p")<{ [x:string]:any }>`
  margin-right: 2px;
  flex: 3;
  white-space: nowrap;
  overflow: hidden;
  margin-bottom: 0;
  text-overflow: ellipsis;
  align-items: flex-start;
  text-transform: capitalize;
`;

@inject("requestStore")
@observer
class RequestItem extends React.Component<
  { request?:any; requestStore?:RequestStore },
  {}
> {
  public render() {
    const { method, url } = this.props.request!;
    return (
      <RequestContainer selected={true}>
        <Status>{method}</Status>
        <Url title="TEST " >{url}</Url>
        <StyledSpinner intent={Intent.SUCCESS} size={19} />
      </RequestContainer>
    );
  }

  // private gotResponse():boolean {
  //   const { responses } = this.props.requestStore!;
  //   return (
  //     responses.find((item) => item.id === this.props.request!.id) !== undefined
  //   );
  // }
}

export default RequestItem;
