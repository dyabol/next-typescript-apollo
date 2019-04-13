import { Button } from "antd";
import Router from "next/router";
import React from "react";
import { FormattedMessage, InjectedIntl } from "react-intl";
import Layout from "../components/Layout";
import PostsTable from "../components/PostsTable";
import { PagesComponent } from "../generated/apolloComponents";
import withAuth from "../lib/withAuth";
import withIntl from "../lib/withIntl";

export interface IProps {
  intl: InjectedIntl;
}
export interface IStats {
  skip: number;
  take: number;
}

class Pages extends React.Component<IProps, IStats> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      skip: 0,
      take: 10
    };
  }

  public render() {
    const { intl } = this.props;
    const title = intl.formatMessage({
      id: "pages",
      defaultMessage: "Pages"
    });

    return (
      <Layout title={title}>
        <div style={{ marginBottom: "16px" }}>
          <Button
            onClick={() => Router.push("/pages/page")}
            type="primary"
            icon="plus"
            size="large"
          >
            <FormattedMessage id="new_page" defaultMessage="New page" />
          </Button>
        </div>
        <PagesComponent
          variables={{
            skip: this.state.skip,
            take: this.state.take
          }}
        >
          {({ loading, error, data }) => {
            if (error) {
              throw error;
            }
            return (
              <PostsTable
                onPagination={(page: number) =>
                  this.setState({
                    skip: this.state.take * (page - 1)
                  })
                }
                url="/pages/page"
                total={data && data.pagesCount}
                data={data && data.pages}
                loading={loading}
              />
            );
          }}
        </PagesComponent>
      </Layout>
    );
  }
}

export default withIntl(withAuth(Pages));
