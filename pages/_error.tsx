import Link from 'next/link';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import AdminLayout from '../components/admin/Layout';
import PageLayout from '../components/Layout';
import Context from '../interfaces/Context';

interface ErrorProps {
  statusCode: number;
  asPath: string;
}

class Error extends React.Component<ErrorProps, {}> {
  static getInitialProps({ res, err, asPath }: Context) {
    const statusCode = res ? res.statusCode : err ? err : null;
    return { statusCode, asPath };
  }

  render() {
    const { statusCode, asPath } = this.props;
    const title = `Hooops? ${statusCode}`;
    const isAdmin = asPath.startsWith('/admin/');
    const Layout = isAdmin ? AdminLayout : PageLayout;
    return (
      <Layout title={title}>
        <div className="container-fluid">
          <div className="text-center">
            <div className="error mx-auto" data-text={statusCode}>
              {statusCode}
            </div>
            <p className="lead text-gray-800 mb-5">
              <FormattedMessage
                id="page_not_found"
                defaultMessage="Page Not Found"
              />
            </p>
            <p className="text-gray-500 mb-0">
              <FormattedMessage
                id="matrix_glitch"
                defaultMessage="It looks like you found a glitch in the matrix..."
              />
            </p>
            {isAdmin ? (
              <Link href="/admin">
                <a>
                  <FormattedMessage
                    id="back_to_dashboard"
                    defaultMessage="← Back to Dashboard"
                  />
                </a>
              </Link>
            ) : (
              <Link href="/">
                <a>
                  <FormattedMessage
                    id="back_to_homepage"
                    defaultMessage="← Back to Homepage"
                  />
                </a>
              </Link>
            )}
          </div>
        </div>
      </Layout>
    );
  }
}

export default Error;
