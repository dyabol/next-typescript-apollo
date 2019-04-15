import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { RouterProps, UrlLike, withRouter } from "next/router";

interface IProps {
  className?: string;
  children: string;
  href: string | UrlLike;
  router: RouterProps;
  as?: string;
  prefetch?: boolean;
  icon?: IconProp;
}

function MenuLink(props: IProps) {
  const { className, children, router, icon } = props;
  const classes = className ? className : "nav-link";
  const pathname = props.as ? props.as : props.href;
  const linkClass =
    router.pathname === pathname ? classes + " active" : classes;

  return (
    <Link href={props.href} as={props.as} prefetch={props.prefetch}>
      <a className={linkClass}>
        {icon && <FontAwesomeIcon className="mr-2" icon={icon} />}
        {children}
      </a>
    </Link>
  );
}

export default withRouter(MenuLink);
