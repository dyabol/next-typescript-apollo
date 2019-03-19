import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import IconButton from './IconButton';

export interface Props {
  loading?: boolean;
  complete?: boolean;
  className?: string;
}

export interface State {}

export default class SaveButton extends React.Component<Props, State> {
  public render() {
    const { complete, loading, className } = this.props;
    if (complete) {
      return (
        <IconButton icon="check" color="success" disabled className={className}>
          <FormattedMessage id="saved" defaultMessage="Saved" />
        </IconButton>
      );
    } else if (loading) {
      return (
        <IconButton
          icon="circle-notch"
          color="secondary"
          disabled
          className={className}
          spin
        >
          <FormattedMessage id="loading" defaultMessage="Loading" />
        </IconButton>
      );
    } else {
      return (
        <IconButton
          icon="save"
          color="primary"
          className={className}
          type="submit"
        >
          <FormattedMessage id="save" defaultMessage="Save" />
        </IconButton>
      );
    }
  }
}
