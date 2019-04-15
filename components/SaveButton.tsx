import { Button, Icon } from "antd";
import * as React from "react";
import { FormattedMessage } from "react-intl";

export interface IProps {
  loading?: boolean;
  complete?: boolean;
  className?: string;
  style?: { [key: string]: string };
}

export default class SaveButton extends React.Component<IProps, {}> {
  public render() {
    const { complete, style, className } = this.props;
    if (complete) {
      return (
        <Button disabled style={style} className={className}>
          <Icon type="check" />
          <FormattedMessage id="saved" defaultMessage="Saved" />
        </Button>
      );
    } else {
      return (
        <Button
          type="primary"
          htmlType="submit"
          style={style}
          className={className}
        >
          <Icon type="save" />
          <FormattedMessage id="save" defaultMessage="Save" />
        </Button>
      );
    }
  }
}
