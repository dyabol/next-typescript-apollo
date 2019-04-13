import { Button } from "antd";
import Router from "next/router";
import React from "react";
import { FormattedMessage, InjectedIntl } from "react-intl";
import Layout from "../components/Layout";
import PostsTable from "../components/PostsTable";
import { PostsComponent } from "../generated/apolloComponents";
import withAuth from "../lib/withAuth";
import withIntl from "../lib/withIntl";

export interface IProps {
  intl: InjectedIntl;
}
export interface IStats {
  skip: number;
  take: number;
}

class Posts extends React.Component<IProps, IStats> {
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
      id: "posts",
      defaultMessage: "Posts"
    });

    return (
      <Layout title={title}>
        <div style={{ marginBottom: "16px" }}>
          <Button
            onClick={() => Router.push("/posts/post")}
            type="primary"
            icon="plus"
            size="large"
          >
            <FormattedMessage id="new_post" defaultMessage="New post" />
          </Button>
        </div>
        <PostsComponent
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
                url="/posts/post"
                total={data && data.postsCount}
                data={data && data.posts}
                loading={loading}
              />
            );
          }}
        </PostsComponent>
      </Layout>
    );
  }
}

export default withIntl(withAuth(Posts));
