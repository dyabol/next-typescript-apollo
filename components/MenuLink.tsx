import { RouterProps, withRouter } from 'next/router';

type Props = {
  className?: string;
  children: string;
  href: string;
  router: RouterProps;
  prefetch?: boolean;
};

function MenuLink({ className, children, router, href }: Props) {
  const classes = className ? className : 'nav-link';
  const linkClass = router.pathname === href ? classes + ' active' : classes;

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    router.push(href);
  };

  return (
    <a href={href} onClick={handleClick} className={linkClass}>
      {children}
    </a>
  );
}

export default withRouter(MenuLink);
