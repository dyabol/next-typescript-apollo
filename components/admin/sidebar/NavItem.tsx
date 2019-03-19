import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { RouterProps, withRouter } from 'next/router';
import * as React from 'react';
import { NavItem } from 'reactstrap';

interface NavItemProps {
  href: string;
  as?: string;
  prefetch?: boolean;
  icon?: IconProp;
  router: RouterProps;
  children: React.ReactNode;
}

function SidebarNavItem(props: NavItemProps) {
  const { children, router, icon, prefetch, href, as } = props;
  const pathname = props.as ? props.as : props.href;
  const active = router.pathname === pathname;
  return (
    <NavItem className={active ? 'active' : ''}>
      <Link href={href} as={as} prefetch={prefetch}>
        <a className="nav-link">
          {icon && <FontAwesomeIcon icon={icon} />}
          <span>{children}</span>
        </a>
      </Link>
    </NavItem>
  );
}

export default withRouter(SidebarNavItem);
