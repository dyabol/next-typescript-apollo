import { Button, Icon, Modal } from 'antd';
import { ApolloClient } from 'apollo-boost';
import Router from 'next/router';
import React from 'react';
import { ApolloConsumer } from 'react-apollo';
import { FormattedMessage, InjectedIntl } from 'react-intl';
import Layout from '../../components/Layout';
import PostForm, { EditorProps } from '../../components/PostForm';
import {
  CreatePageMutation,
  EditPageMutation,
  PageByIdPage
} from '../../generated/apolloComponents';
import { createPageMutation } from '../../graphql/post/mutations/createPost';
import { deletePageMutation } from '../../graphql/post/mutations/deletePost';
import { editPageMutation } from '../../graphql/post/mutations/editPost';
import { pageByIdQuery } from '../../graphql/post/queries/postById';
import Context from '../../interfaces/Context';
import redirect from '../../lib/redirect';
import withIntl from '../../lib/withIntl';

export type Props = {
  router: any;
  intl: InjectedIntl;
} & PageByIdPage;

export interface State extends EditorProps {
  id: string | null;
  modal: boolean;
  confirmLoading: boolean;
}

class EditPage extends React.Component<Props, State> {
  static async getInitialProps(context: Context) {
    const {
      apolloClient,
      query: { id },
      ...ctx
    } = context;

    if (!id) {
      return {};
    }
    const page = await apolloClient.query({
      query: pageByIdQuery,
      variables: { id }
    });
    if (!page || page.loading) {
      return {};
    }
    if (!page || !page.data || !page.data.page) {
      redirect(ctx, '/page');
      return {};
    }
    return {
      ...page.data.page
    };
  }

  constructor(props: Props) {
    super(props);
    this.state = {
      id: props.id,
      title: props.title || '',
      content: props.content || '',
      slug: props.slug || '',
      modal: false,
      confirmLoading: false
    };
    this.save = this.save.bind(this);
    this.changeUrl = this.changeUrl.bind(this);
    this.onDeleteHandler = this.onDeleteHandler.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  changeUrl(result: CreatePageMutation & EditPageMutation) {
    const obj = result.createPage || result.editPage;

    this.setState({
      id: obj.id,
      title: obj.title,
      content: obj.content,
      slug: obj.slug
    });

    if (result && result.createPage) {
      const id = result.createPage.id;
      Router.push(
        {
          pathname: '/page',
          query: { id }
        },
        '/page/' + id,
        { shallow: true }
      );
    }
  }

  save(values: EditorProps, client: ApolloClient<any>) {
    const { id } = this.state;
    var result;
    if (id) {
      result = client.mutate({
        mutation: editPageMutation,
        variables: {
          data: {
            id,
            ...values
          }
        }
      });
    } else {
      result = client.mutate({
        mutation: createPageMutation,
        variables: {
          data: {
            ...values
          }
        }
      });
    }
    client.resetStore();
    return result;
  }

  async onDeleteHandler(client: ApolloClient<any>) {
    const result = await client.mutate({
      mutation: deletePageMutation,
      variables: {
        id: this.state.id
      }
    });
    if (result.data && result.data.deletePage) {
      client.resetStore();
      Router.push('/pages');
    }
  }

  render() {
    const { title, content, slug, id, confirmLoading } = this.state;
    const { intl } = this.props;
    const pageTitle = id
      ? intl.formatMessage({
          id: 'edit_page',
          defaultMessage: 'Edit page'
        })
      : intl.formatMessage({
          id: 'create_page',
          defaultMessage: 'Create page'
        });
    return (
      <Layout title={pageTitle}>
        <Button
          size="small"
          style={{ marginBottom: '16px' }}
          onClick={() => Router.push('/pages')}
        >
          <Icon type="left" />
          <FormattedMessage id="back" defaultMessage="Back" />
        </Button>
        <h1>{pageTitle}</h1>
        <ApolloConsumer>
          {client => (
            <>
              <PostForm
                onDelete={this.toggle}
                deleteButton={id ? true : false}
                slug={slug}
                title={title}
                content={content}
                onSave={this.changeUrl}
                save={(values: EditorProps) => this.save(values, client)}
              />
              <Modal
                title={
                  <FormattedMessage
                    id="delete_page_title"
                    defaultMessage="Delete page"
                  />
                }
                okText={<FormattedMessage id="delete" />}
                okType="danger"
                cancelText={
                  <FormattedMessage id="cancel" defaultMessage="Cancel" />
                }
                visible={this.state.modal}
                onOk={() => this.onDeleteHandler(client)}
                confirmLoading={confirmLoading}
                onCancel={this.toggle}
              >
                <FormattedMessage
                  id="delete_page_message"
                  defaultMessage="Are you sure you want to remove the {title} page?"
                  values={{ title: <strong>{title}</strong> }}
                />
              </Modal>
            </>
          )}
        </ApolloConsumer>
      </Layout>
    );
  }
}

export default withIntl(EditPage);
