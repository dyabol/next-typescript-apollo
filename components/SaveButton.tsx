import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { Button } from 'reactstrap';

export interface Props {
  loading?: boolean;
  complete?: boolean;
}

export interface State {}

export default class SaveButton extends React.Component<Props, State> {
  public render() {
    const { complete, loading } = this.props;
    if (complete) {
      return (
        <Button color="success" disabled>
          <FontAwesomeIcon className="mr-2" icon="check" />
          <FormattedMessage id="saved" defaultMessage="Saved" />
        </Button>
      );
    } else if (loading) {
      return (
        <Button color="secondary" disabled>
          <FontAwesomeIcon className="mr-2" icon="circle-notch" spin />
          <FormattedMessage id="loading" defaultMessage="Loading" />
        </Button>
      );
    } else {
      return (
        <Button type="submit" color="primary">
          <FontAwesomeIcon className="mr-2" icon="save" />
          <FormattedMessage id="save" defaultMessage="Save" />
        </Button>
      );
    }
  }
}
