import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ApolloClient } from 'apollo-boost';
import Router from 'next/router';
import React from 'react';
import { ApolloConsumer } from 'react-apollo';
import { FormattedMessage, InjectedIntl } from 'react-intl';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import Button from 'reactstrap/lib/Button';
import PostForm, { EditorProps } from '../../components/admin/PostForm';
import Layout from '../../containers/admin/Layout';
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
}

class EditPage extends React.Component<Props, State> {
  static async getInitialProps({
    apolloClient,
    query: { id },
    ...ctx
  }: Context) {
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
      redirect(ctx, '/admin/page');
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
      modal: false
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
          pathname: '/admin/page',
          query: { id }
        },
        '/admin/page/' + id,
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
      Router.push('/admin/pages');
    }
  }

  render() {
    const { title, content, slug, id } = this.state;
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
          outline
          size="sm"
          color="primary"
          className="mb-3"
          onClick={() => Router.push('/admin/pages')}
        >
          <FontAwesomeIcon className="mr-2" icon="angle-left" />
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
              <Modal isOpen={this.state.modal} toggle={this.toggle}>
                <ModalHeader toggle={this.toggle}>
                  <FormattedMessage
                    id="delete_page_title"
                    defaultMessage="Delete page"
                  />
                </ModalHeader>
                <ModalBody>
                  <FormattedMessage
                    id="delete_page_message"
                    defaultMessage="Are you sure you want to remove the {title} page?"
                    values={{ title: <strong>{title}</strong> }}
                  />
                </ModalBody>
                <ModalFooter>
                  <Button
                    color="danger"
                    onClick={() => this.onDeleteHandler(client)}
                  >
                    <FontAwesomeIcon className="mr-2" icon="trash-alt" />
                    <FormattedMessage id="delete" defaultMessage="Delete" />
                  </Button>{' '}
                  <Button color="secondary" onClick={this.toggle}>
                    <FontAwesomeIcon className="mr-2" icon="times" />
                    <FormattedMessage id="cancel" defaultMessage="Cancel" />
                  </Button>
                </ModalFooter>
              </Modal>
            </>
          )}
        </ApolloConsumer>
      </Layout>
    );
  }
}

export default withIntl(EditPage);
