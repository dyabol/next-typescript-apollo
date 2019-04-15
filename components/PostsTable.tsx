import { Table } from "antd";
import { PaginationConfig } from "antd/lib/table";
import Link from "next/link";
import * as React from "react";
import { InjectedIntl } from "react-intl";
import { PostsPosts, PostsUser } from "../generated/apolloComponents";
import withIntl from "../lib/withIntl";

interface IPostTableProps {
  intl: InjectedIntl;
  loading?: boolean;
  url: string;
  data: any;
  total: number;
  onPagination: (page: number) => void;
}

class PostsTable extends React.Component<IPostTableProps, {}> {
  private pagination: PaginationConfig = {};

  constructor(props: IPostTableProps) {
    super(props);
    this.pagination.total = props.total;
  }

  public render() {
    return (
      <Table
        rowKey="id"
        columns={this.getColumns()}
        dataSource={this.props.data}
        pagination={this.pagination}
        loading={this.props.loading}
        onChange={this.handleTableChange}
      />
    );
  }

  private handleTableChange = (pagination: PaginationConfig) => {
    if (pagination && pagination.current !== undefined) {
      this.pagination.current = pagination.current;
      this.props.onPagination(pagination.current);
    }
  };

  private getColumns() {
    const { intl, url } = this.props;
    return [
      {
        title: intl.formatMessage({
          id: "title",
          defaultMessage: "Title"
        }),
        dataIndex: "title",
        key: "title",
        render: (title: string, post: PostsPosts) => (
          <Link
            href={{
              pathname: url,
              query: { id: post.id }
            }}
            as={url + "/" + post.id}
          >
            <a>{title}</a>
          </Link>
        )
      },
      {
        title: intl.formatMessage({
          id: "slug",
          defaultMessage: "Slug"
        }),
        dataIndex: "slug",
        key: "slug"
      },
      {
        title: intl.formatMessage({
          id: "author",
          defaultMessage: "Author"
        }),
        dataIndex: "user",
        key: "author",
        render: (user: PostsUser) => {
          return user.fullName;
        }
      },
      {
        title: intl.formatMessage({
          id: "updated",
          defaultMessage: "Updated"
        }),
        dataIndex: "updatedAt",
        key: "updatedAt",
        render: (updated: string) => {
          return intl.formatRelative(updated);
        }
      },
      {
        title: intl.formatMessage({
          id: "created",
          defaultMessage: "Created"
        }),
        dataIndex: "createdAt",
        key: "createdAt",
        render: (created: string) => {
          return intl.formatRelative(created);
        }
      }
    ];
  }
}

export default withIntl(PostsTable);
