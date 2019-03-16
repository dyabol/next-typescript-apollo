import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Router from 'next/router';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import Button from 'reactstrap/lib/Button';
import PostForm, { FuncInput } from '../../components/admin/PostForm';
import Layout from '../../containers/admin/Layout';
import { CreatePostComponent } from '../../generated/apolloComponents';

export type Props = {};

export type State = {};

class NewPost extends React.Component<Props, State> {
  render() {
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
        <CreatePostComponent>
          {createPost => (
            <PostForm
              slug=""
              title=""
              content=""
              id=""
              func={(values: FuncInput) => {
                return createPost({
                  variables: {
                    data: {
                      ...values
                    }
                  }
                });
              }}
            />
          )}
        </CreatePostComponent>
      </Layout>
    );
  }
}

export default NewPost;
