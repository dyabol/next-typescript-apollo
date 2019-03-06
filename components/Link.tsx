import { withRouter } from 'next/router';

function Link({ children, router, href }: any) {
  const className = router.pathname === href ? 'nav-link active' : 'nav-link';

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    router.push(href);
  };

  return (
    <a href={href} onClick={handleClick} className={className}>
      {children}
    </a>
  );
}

export default withRouter(Link);
