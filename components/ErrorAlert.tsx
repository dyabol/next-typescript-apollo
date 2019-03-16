import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { Alert, Button, Collapse } from 'reactstrap';
import { parseGraphQlError } from '../lib/error';

export interface Props {
  error: any | null;
  onDismiss?: () => void;
}

export interface State {
  collapse: boolean;
}

export default class ErrorAlert extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = { collapse: false };
    this.onDissmisHandler = this.onDissmisHandler.bind(this);
  }

  toggle() {
    this.setState(state => ({ collapse: !state.collapse }));
  }

  onDissmisHandler() {
    this.setState({
      collapse: false
    });
    if (this.props.onDismiss) {
      this.props.onDismiss();
    }
  }

  getError() {
    const { error } = this.props;
    if (error.graphQLErrors && error.graphQLErrors.length > 0) {
      return parseGraphQlError(error.graphQLErrors);
    }
    return { message: error.message, stack: error.stack };
  }

  public render() {
    const { error } = this.props;
    if (error) {
      const { message, stack } = this.getError();
      return (
        <Alert
          color="danger"
          isOpen={error ? true : false}
          toggle={this.onDissmisHandler}
        >
          {message}
          <Button
            className="ml-3"
            outline
            color="danger"
            size="sm"
            onClick={this.toggle}
          >
            <FormattedMessage id="detail" defaultMessage="Detail" />
          </Button>
          <Collapse className="mt-3" isOpen={this.state.collapse}>
            <pre>{stack}</pre>
          </Collapse>
        </Alert>
      );
    }
    return null;
  }
}
