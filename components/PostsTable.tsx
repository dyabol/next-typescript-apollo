import { Table } from 'antd';
import { PaginationConfig } from 'antd/lib/table';
import Link from 'next/link';
import * as React from 'react';
import { InjectedIntl } from 'react-intl';
import {
  PagesComponent,
  PostsComponent,
  PostsPosts,
  PostsUser
} from '../generated/apolloComponents';
import withIntl from '../lib/withIntl';

interface PostTableProps {
  intl: InjectedIntl;
  postType?: string;
}

interface PostTableState {
  skip: number;
  take: number;
}

class PostsTable extends React.Component<PostTableProps, PostTableState> {
  private posts: any = [];
  private pagination: PaginationConfig = {};

  constructor(props: PostTableProps) {
    super(props);
    this.state = {
      skip: 0,
      take: 10
    };
  }

  private handleTableChange = (pagination: PaginationConfig) => {
    console.log(pagination);
    if (pagination && pagination.current !== undefined) {
      this.pagination.current = pagination.current;
      this.setState({
        skip: this.state.take * (pagination.current - 1)
      });
    }
  };

  private getColumns() {
    const { intl } = this.props;
    return [
      {
        title: intl.formatMessage({
          id: 'title',
          defaultMessage: 'Title'
        }),
        dataIndex: 'title',
        key: 'title',
        render: (title: string, post: PostsPosts) => (
          <Link
            href={{
              pathname: '/posts/post',
              query: { id: post.id }
            }}
            as={'/posts/post/' + post.id}
          >
            <a>{title}</a>
          </Link>
        )
      },
      {
        title: intl.formatMessage({
          id: 'slug',
          defaultMessage: 'Slug'
        }),
        dataIndex: 'slug',
        key: 'slug'
      },
      {
        title: intl.formatMessage({
          id: 'author',
          defaultMessage: 'Author'
        }),
        dataIndex: 'user',
        key: 'author',
        render: (user: PostsUser) => {
          return user.fullName;
        }
      },
      {
        title: intl.formatMessage({
          id: 'updated',
          defaultMessage: 'Updated'
        }),
        dataIndex: 'updatedAt',
        key: 'updatedAt',
        render: (updated: string) => {
          return intl.formatRelative(updated);
        }
      },
      {
        title: intl.formatMessage({
          id: 'created',
          defaultMessage: 'Created'
        }),
        dataIndex: 'createdAt',
        key: 'createdAt',
        render: (created: string) => {
          return intl.formatRelative(created);
        }
      }
    ];
  }

  public render() {
    if (this.props.postType === 'page') {
      return (
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
            if (data && data.pages) {
              this.posts = data.pages;
              this.pagination.total = data.pagesCount;
            }
            return (
              <Table
                rowKey="id"
                columns={this.getColumns()}
                dataSource={this.posts}
                pagination={this.pagination}
                loading={loading}
                onChange={this.handleTableChange}
              />
            );
          }}
        </PagesComponent>
      );
    } else {
      return (
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
            if (data && data.posts) {
              this.posts = data.posts;
              this.pagination.total = data.postsCount;
            }
            return (
              <Table
                rowKey="id"
                columns={this.getColumns()}
                dataSource={this.posts}
                pagination={this.pagination}
                loading={loading}
                onChange={this.handleTableChange}
              />
            );
          }}
        </PostsComponent>
      );
    }
  }
}

export default withIntl(PostsTable);
