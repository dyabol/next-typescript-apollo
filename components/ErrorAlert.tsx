import { Alert } from "antd";
import * as React from "react";
import { InjectedIntl } from "react-intl";
import { parseGraphQlError } from "../lib/error";
import withIntl from "../lib/withIntl";

export interface IProps {
  error: any | null;
  intl: InjectedIntl;
  onDismiss?: () => void;
}

export interface IState {
  collapse: boolean;
}

class ErrorAlert extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = { collapse: false };
    this.onDissmisHandler = this.onDissmisHandler.bind(this);
  }

  public toggle() {
    this.setState(state => ({ collapse: !state.collapse }));
  }

  public onDissmisHandler() {
    this.setState({
      collapse: false
    });
    if (this.props.onDismiss) {
      this.props.onDismiss();
    }
  }

  public getError() {
    const { error } = this.props;
    if (error.graphQLErrors && error.graphQLErrors.length > 0) {
      return parseGraphQlError(error.graphQLErrors);
    }
    return { message: error.message, stack: error.stack };
  }

  public render() {
    const { error, intl } = this.props;
    if (error) {
      const { message, stack } = this.getError();
      console.error(stack);
      return (
        <Alert
          type="error"
          message={intl.formatMessage({
            id: "error",
            defaultMessage: "Error"
          })}
          description={message}
          showIcon
        />
      );
    }
    return null;
  }
}

export default withIntl(ErrorAlert);
