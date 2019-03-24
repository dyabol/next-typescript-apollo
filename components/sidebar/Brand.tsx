import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import * as React from 'react';

interface BrandProps {}

const Brand: React.FunctionComponent<BrandProps> = () => {
  return (
    <Link href="/">
      <a className="sidebar-brand d-flex align-items-center justify-content-center">
        <div className="sidebar-brand-icon">
          <FontAwesomeIcon color="#f6c23e" icon="bolt" size="2x" />
        </div>
        <div className="sidebar-brand-text mx-3">
          Perun <sup className="text-warning">CMS</sup>
        </div>
      </a>
    </Link>
  );
};

export default Brand;
