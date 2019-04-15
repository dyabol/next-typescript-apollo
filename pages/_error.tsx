import Link from "next/link";
import React from "react";
import { FormattedMessage } from "react-intl";
import Layout from "../components/Layout";
import IContext from "../interfaces/Context";

interface IErrorProps {
  statusCode: number;
  asPath: string;
}

class Error extends React.Component<IErrorProps, {}> {
  public static getInitialProps({ res, err }: IContext) {
    const statusCode = res ? res.statusCode : err ? err : null;
    return { statusCode };
  }

  public render() {
    const { statusCode } = this.props;
    const title = `Hooops? ${statusCode}`;
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
            <Link href="/">
              <a>
                <FormattedMessage
                  id="back_to_dashboard"
                  defaultMessage="← Back to Dashboard"
                />
              </a>
            </Link>
          </div>
        </div>
      </Layout>
    );
  }
}

export default Error;
