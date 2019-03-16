import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Router from 'next/router';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import Button from 'reactstrap/lib/Button';
import PostForm, { FuncInput } from '../../components/admin/PostForm';
import Layout from '../../containers/admin/Layout';
import {
  EditPostComponent,
  PostByIdPost
} from '../../generated/apolloComponents';
import { postByIdQuery } from '../../graphql/post/queries/postById';
import Context from '../../interfaces/Context';

export type Props = {} & PostByIdPost;

export type State = {};

class EditPost extends React.Component<Props, State> {
  static async getInitialProps({ apolloClient, query: { id } }: Context) {
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

  render() {
    const { id, title, content, slug } = this.props;
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
        <EditPostComponent>
          {editPost => (
            <PostForm
              slug={slug}
              title={title}
              content={content}
              id={id}
              func={(values: FuncInput) => {
                return editPost({
                  variables: {
                    data: {
                      id: this.props.id,
                      ...values
                    }
                  }
                });
              }}
            />
          )}
        </EditPostComponent>
      </Layout>
    );
  }
}

export default EditPost;
