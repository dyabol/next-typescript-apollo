import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { RouterProps, withRouter } from 'next/router';
import * as React from 'react';

interface NavItemProps {
  href: string;
  as?: string;
  prefetch?: boolean;
  icon?: IconProp;
  router: RouterProps;
  className?: string;
  children: React.ReactNode;
}

function NavItem(props: NavItemProps) {
  const { className, children, router, icon, prefetch, href, as } = props;
  const classes = className ? className : 'nav-item';
  const pathname = props.as ? props.as : props.href;
  const itemClass =
    router.pathname === pathname ? classes + ' active' : classes;
  return (
    <li className={itemClass}>
      <Link href={href} as={as} prefetch={prefetch}>
        <a className="nav-link">
          {icon && <FontAwesomeIcon icon={icon} />}
          <span>{children}</span>
        </a>
      </Link>
    </li>
  );
}

export default withRouter(NavItem);
