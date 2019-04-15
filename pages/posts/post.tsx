import { Button, Icon, Modal } from "antd";
import { ApolloClient } from "apollo-boost";
import Router from "next/router";
import React from "react";
import { ApolloConsumer } from "react-apollo";
import { FormattedMessage, InjectedIntl } from "react-intl";
import Layout from "../../components/Layout";
import PostForm, { IEditorProps } from "../../components/PostForm";
import {
  CreatePostMutation,
  EditPostMutation,
  PostByIdPost
} from "../../generated/apolloComponents";
import { createPostMutation } from "../../graphql/post/mutations/createPost";
import { deletePostMutation } from "../../graphql/post/mutations/deletePost";
import { editPostMutation } from "../../graphql/post/mutations/editPost";
import { postByIdQuery } from "../../graphql/post/queries/postById";
import IContext from "../../interfaces/Context";
import redirect from "../../lib/redirect";
import withIntl from "../../lib/withIntl";

export type Props = {
  router: any;
  intl: InjectedIntl;
} & PostByIdPost;

export interface IState extends IEditorProps {
  id: string | null;
  modal: boolean;
  confirmLoading: boolean;
}

class EditPost extends React.Component<Props, IState> {
  public static async getInitialProps(context: IContext) {
    const {
      apolloClient,
      query: { id },
      ...ctx
    } = context;

    if (!id) {
      return {};
    }
    const post = await apolloClient.query({
      query: postByIdQuery,
      variables: { id }
    });
    if (!post || post.loading) {
      return {};
    }
    if (!post || !post.data || !post.data.post) {
      redirect(ctx, "/post");
      return {};
    }
    return {
      ...post.data.post
    };
  }

  constructor(props: Props) {
    super(props);
    this.state = {
      id: props.id,
      title: props.title || "",
      content: props.content || "",
      slug: props.slug || "",
      modal: false,
      confirmLoading: false
    };
    this.save = this.save.bind(this);
    this.changeUrl = this.changeUrl.bind(this);
    this.onDeleteHandler = this.onDeleteHandler.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  public toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  public changeUrl(result: CreatePostMutation & EditPostMutation) {
    const obj = result.createPost || result.editPost;

    this.setState({
      id: obj.id,
      title: obj.title,
      content: obj.content,
      slug: obj.slug
    });

    if (result && result.createPost) {
      const id = result.createPost.id;
      Router.push(
        {
          pathname: "/posts/post",
          query: { id }
        },
        "/posts/post/" + id,
        { shallow: true }
      );
    }
  }

  public save(values: IEditorProps, client: ApolloClient<any>) {
    const { id } = this.state;
    let result;
    if (id) {
      result = client.mutate({
        mutation: editPostMutation,
        variables: {
          data: {
            id,
            ...values
          }
        }
      });
    } else {
      result = client.mutate({
        mutation: createPostMutation,
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

  public async onDeleteHandler(client: ApolloClient<any>) {
    this.setState({
      confirmLoading: true
    });
    const result = await client.mutate({
      mutation: deletePostMutation,
      variables: {
        id: this.state.id
      }
    });
    if (result.data && result.data.deletePost) {
      await client.resetStore();
      Router.push("/posts");
    }
  }

  public render() {
    const { title, content, slug, id, confirmLoading } = this.state;
    const { intl } = this.props;
    const postTitle = id
      ? intl.formatMessage({
          id: "edit_post",
          defaultMessage: "Edit post"
        })
      : intl.formatMessage({
          id: "create_post",
          defaultMessage: "Create post"
        });
    return (
      <Layout title={postTitle}>
        <Button
          size="small"
          style={{ marginBottom: "16px" }}
          onClick={() => Router.push("/posts")}
        >
          <Icon type="left" />
          <FormattedMessage id="back" defaultMessage="Back" />
        </Button>
        <h1>{postTitle}</h1>
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
                save={(values: IEditorProps) => this.save(values, client)}
              />
              <Modal
                title={
                  <FormattedMessage
                    id="delete_post_title"
                    defaultMessage="Delete post"
                  />
                }
                okText={
                  <FormattedMessage id="delete" defaultMessage="Delete" />
                }
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
                  id="delete_post_message"
                  defaultMessage="Are you sure you want to remove the {title} post?"
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

export default withIntl(EditPost);

/*
<Modal isOpen={this.state.modal} toggle={this.toggle}>
                <ModalHeader toggle={this.toggle}>
                  <FormattedMessage
                    id="delete_post_title"
                    defaultMessage="Delete post"
                  />
                </ModalHeader>
                <ModalBody>
                  <FormattedMessage
                    id="delete_post_message"
                    defaultMessage="Are you sure you want to remove the {title} post?"
                    values={{ title: <strong>{title}</strong> }}
                  />
                </ModalBody>
                <ModalFooter>
                  <IconButton
                    color="danger"
                    onClick={() => this.onDeleteHandler(client)}
                    icon="trash-alt"
                  >
                    <FormattedMessage id="delete" defaultMessage="Delete" />
                  </IconButton>{' '}
                  <IconButton
                    color="secondary"
                    onClick={this.toggle}
                    icon="times"
                  >
                    <FormattedMessage id="cancel" defaultMessage="Cancel" />
                  </IconButton>
                </ModalFooter>
              </Modal>
              */
