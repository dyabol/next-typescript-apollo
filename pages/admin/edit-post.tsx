import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Field, Formik } from 'formik';
import Router from 'next/router';
import React from 'react';
import { FormattedMessage, InjectedIntl } from 'react-intl';
import { Alert, Form, FormGroup, Label } from 'reactstrap';
import Button from 'reactstrap/lib/Button';
import MyEditor from '../../components/Editor';
import InputField from '../../components/field/InputField';
import SaveButton from '../../components/SaveButton';
import Layout from '../../containers/admin/Layout';
import {
  EditPostComponent,
  PostByIdPost
} from '../../generated/apolloComponents';
import { postByIdQuery } from '../../graphql/post/queries/postById';
import Context from '../../interfaces/Context';
import withIntl from '../../lib/withIntl';

export type Props = {
  intl: InjectedIntl;
} & PostByIdPost;

export type State = {
  showAlert: boolean;
  loading: boolean;
  complete: boolean;
};

class EditPost extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      showAlert: false,
      loading: false,
      complete: false
    };
    this.dismissAlert = this.dismissAlert.bind(this);
    this.showAlert = this.showAlert.bind(this);
  }

  dismissAlert() {
    this.setState({
      showAlert: false
    });
  }

  showAlert() {
    this.setState({
      showAlert: true
    });
  }

  setLoading() {
    this.dismissAlert();
    this.setState({ complete: false, loading: true });
  }

  setComplete() {
    this.setState({ complete: true, loading: false });
  }

  setIdle() {
    this.setState({ complete: false, loading: false });
  }

  showError() {
    this.showAlert();
  }

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
    const { title, content, slug, intl } = this.props;
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
        <Alert
          color="danger"
          isOpen={this.state.showAlert}
          toggle={this.dismissAlert}
        >
          <FormattedMessage id="post_saved" defaultMessage="Post saved." />
        </Alert>
        <EditPostComponent>
          {editPost => (
            <Formik
              validateOnBlur={false}
              initialValues={{ title, content, slug }}
              onSubmit={async values => {
                this.setLoading();
                const result = await editPost({
                  variables: {
                    data: {
                      id: this.props.id,
                      ...values
                    }
                  }
                });
                this.setComplete();
                console.log(result);
              }}
              validate={_ => {
                this.setIdle();
              }}
            >
              {({ values, handleSubmit, setFieldValue }) => (
                <Form onSubmit={handleSubmit}>
                  <Field
                    name="title"
                    type="title"
                    placeholder=""
                    value={values.title}
                    component={InputField}
                    required
                    id="titleField"
                    label={intl.formatMessage({
                      id: 'title',
                      defaultMessage: 'Title'
                    })}
                    autoFocus
                    autoComplete="off"
                  />
                  <Field
                    name="slug"
                    type="emaslugil"
                    placeholder=""
                    value={values.slug}
                    component={InputField}
                    required
                    id="emailField"
                    label={intl.formatMessage({
                      id: 'slug',
                      defaultMessage: 'Slug'
                    })}
                    autoComplete="off"
                  />
                  <FormGroup>
                    <Label>
                      <FormattedMessage id="content" defaultMessage="Content" />
                    </Label>
                    <MyEditor
                      content={content}
                      onChange={value => setFieldValue('content', value)}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Button type="reset" color="secondary" className="mr-2">
                      <FontAwesomeIcon className="mr-2" icon="times" />
                      <FormattedMessage id="reset" defaultMessage="Reset" />
                    </Button>
                    <SaveButton
                      loading={this.state.loading}
                      complete={this.state.complete}
                    />
                  </FormGroup>
                </Form>
              )}
            </Formik>
          )}
        </EditPostComponent>
      </Layout>
    );
  }
}

export default withIntl(EditPost);
