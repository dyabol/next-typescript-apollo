import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as React from 'react';
import { Button } from 'reactstrap';

export interface IconButtonProps {
  onClick?: () => void;
  icon: IconProp;
  color?: string;
  disabled?: boolean;
  className?: string;
  spin?: boolean;
  type?: string;
  size?: string;
  outline?: boolean;
}

export default class IconButton extends React.Component<IconButtonProps, any> {
  public render() {
    const {
      onClick,
      icon,
      color,
      children,
      disabled,
      className,
      spin,
      type,
      size,
      outline
    } = this.props;
    return (
      <Button
        outline={outline}
        size={size}
        color={color}
        className={`btn-icon-split ${className}`}
        onClick={onClick}
        disabled={disabled}
        spin={spin}
        type={type || 'button'}
      >
        <span className="icon text-white-50">
          <FontAwesomeIcon icon={icon} />
        </span>
        <span className="text">{children}</span>
      </Button>
    );
  }
}
