import Link from 'next/link';
import { RouterProps, UrlLike, withRouter } from 'next/router';

type Props = {
  className?: string;
  children: string;
  href: string | UrlLike;
  router: RouterProps;
  as?: string;
  prefetch?: boolean;
};

function MenuLink(props: Props) {
  const { className, children, router } = props;
  const classes = className ? className : 'nav-link';
  const pathname = props.as ? props.as : props.href;
  const linkClass =
    router.pathname === pathname ? classes + ' active' : classes;

  return (
    <Link href={props.href} as={props.as} prefetch={props.prefetch}>
      <a className={linkClass}>{children}</a>
    </Link>
  );
}

export default withRouter(MenuLink);
