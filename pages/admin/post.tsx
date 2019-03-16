import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ApolloClient } from 'apollo-boost';
import Router from 'next/router';
import React from 'react';
import { ApolloConsumer } from 'react-apollo';
import { FormattedMessage } from 'react-intl';
import Button from 'reactstrap/lib/Button';
import PostForm, { EditorProps } from '../../components/admin/PostForm';
import Layout from '../../containers/admin/Layout';
import {
  CreatePostMutation,
  PostByIdPost
} from '../../generated/apolloComponents';
import { createPostMuttation } from '../../graphql/post/mutations/createPost';
import { editPostMutation } from '../../graphql/post/mutations/editPost';
import { postByIdQuery } from '../../graphql/post/queries/postById';
import Context from '../../interfaces/Context';

export type Props = {
  router: any;
} & PostByIdPost;

export interface State extends EditorProps {
  id: string | null;
}

class EditPost extends React.Component<Props, State> {
  static async getInitialProps({ apolloClient, query: { id } }: Context) {
    if (!id) {
      return {
        id: null
      };
    }
    const post = await apolloClient.query({
      query: postByIdQuery,
      variables: { id }
    });
    if (!post || post.loading || !post.data) {
      return {};
    }
    return {
      id,
      ...post.data.post
    };
  }

  constructor(props: Props) {
    super(props);
    this.state = {
      id: props.id,
      title: props.title || '',
      content: props.content || '',
      slug: props.slug || ''
    };
    this.save = this.save.bind(this);
    this.changeUrl = this.changeUrl.bind(this);
  }

  changeUrl(result: CreatePostMutation) {
    if (!result.createPost) {
      return;
    }
    const id = result.createPost.id;
    this.setState(result.createPost);

    Router.push(
      {
        pathname: '/admin/post',
        query: { id }
      },
      '/admin/post/' + id,
      { shallow: true }
    );
  }

  save(values: EditorProps, client: ApolloClient<any>) {
    const { id } = this.state;
    if (id) {
      return client.mutate({
        mutation: editPostMutation,
        variables: {
          data: {
            id,
            ...values
          }
        }
      });
    }
    return client.mutate({
      mutation: createPostMuttation,
      variables: {
        data: {
          ...values
        }
      }
    });
  }

  render() {
    const { title, content, slug } = this.state;

    return (
      <Layout>
        <Button
          outline
          size="sm"
          color="primary"
          className="mb-3"
          onClick={() => Router.push('/admin/posts')}
        >
          <FontAwesomeIcon className="mr-2" icon="angle-left" />
          <FormattedMessage id="back" defaultMessage="Back" />
        </Button>
        <ApolloConsumer>
          {client => (
            <PostForm
              slug={slug}
              title={title}
              content={content}
              onSave={this.changeUrl}
              save={(values: EditorProps) => this.save(values, client)}
            />
          )}
        </ApolloConsumer>
      </Layout>
    );
  }
}

export default EditPost;
