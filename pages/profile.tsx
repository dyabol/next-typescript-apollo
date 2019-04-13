import React from "react";
import { FormattedMessage, InjectedIntl } from "react-intl";
import Layout from "../components/Layout";
import Avatar from "../components/profile/Avatar";
import { MeComponent } from "../generated/apolloComponents";
import withAuth from "../lib/withAuth";
import withIntl from "../lib/withIntl";

export interface IProps {
  intl: InjectedIntl;
}

class Profile extends React.Component<IProps, {}> {
  public render() {
    const { intl } = this.props;
    const title = intl.formatMessage({
      id: "profile",
      defaultMessage: "Profile"
    });

    return (
      <Layout title={title}>
        <h1>{title}</h1>
        <MeComponent>
          {({ data }) => {
            if (data && data.me) {
              return (
                <div>
                  <h2>{data.me.fullName}</h2>
                  <Avatar avatar={data.me.avatar} className="mt-3 mb-3" />
                  <table>
                    <tbody>
                      <tr>
                        <th>
                          <FormattedMessage id="id" defaultMessage="#" />
                        </th>
                        <td>{data.me.id}</td>
                      </tr>
                      <tr>
                        <th>
                          <FormattedMessage
                            id="first_name"
                            defaultMessage="First name"
                          />
                        </th>
                        <td>{data.me.firstName}</td>
                      </tr>
                      <tr>
                        <th>
                          <FormattedMessage
                            id="last_name"
                            defaultMessage="Last name"
                          />
                        </th>
                        <td>{data.me.lastName}</td>
                      </tr>
                      <tr>
                        <th>
                          <FormattedMessage
                            id="email"
                            defaultMessage="E-mail"
                          />
                        </th>
                        <td>{data.me.email}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              );
            }
            return null;
          }}
        </MeComponent>
      </Layout>
    );
  }
}

export default withIntl(withAuth(Profile));
