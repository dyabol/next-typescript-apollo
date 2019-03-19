import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import * as React from 'react';

interface BrandProps {}

const Brand: React.FunctionComponent<BrandProps> = () => {
  return (
    <Link href="/admin">
      <a className="sidebar-brand d-flex align-items-center justify-content-center">
        <div className="sidebar-brand-icon">
          <FontAwesomeIcon icon="bolt" size="2x" />
        </div>
        <div className="sidebar-brand-text mx-3">
          Hrom<sup>CMS</sup>
        </div>
      </a>
    </Link>
  );
};

export default Brand;
