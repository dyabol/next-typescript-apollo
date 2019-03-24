import { Field, Formik, FormikActions } from 'formik';
import React from 'react';
import { FormattedMessage, InjectedIntl } from 'react-intl';
import { Form, FormGroup, Label } from 'reactstrap';
import { parseGraphQlValidationError } from '../lib/error';
import withIntl from '../lib/withIntl';
import { convertToSlug } from '../utils/url';
import MyEditor from './Editor';
import ErrorAlert from './ErrorAlert';
import InputField from './field/InputField';
import IconButton from './IconButton';
import SaveButton from './SaveButton';

export interface EditorProps {
  title: string;
  content: string;
  slug: string;
}

export interface Props extends EditorProps {
  intl: InjectedIntl;
  deleteButton?: boolean;
  onDelete?: () => void;
  onSave?: (values: any) => void;
  save: (values: EditorProps) => any;
}

export type State = {
  loading: boolean;
  complete: boolean;
  error: string | null;
};

class PostForm extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      loading: false,
      complete: false,
      error: null
    };
    this.onSubmitHandler = this.onSubmitHandler.bind(this);
    this.hideError = this.hideError.bind(this);
    this.setIdle = this.setIdle.bind(this);
  }

  setLoading() {
    this.setState({ complete: false, loading: true, error: null });
  }

  setComplete() {
    this.setState({ complete: true, loading: false });
  }

  setIdle() {
    this.setState({ complete: false, loading: false });
  }

  showError(err: string) {
    this.setState({
      error: err
    });
  }

  hideError() {
    this.setState({
      error: null
    });
  }

  async onSubmitHandler(
    values: EditorProps,
    { setErrors }: FormikActions<EditorProps>
  ) {
    const { intl, save, onSave } = this.props;
    this.setLoading();
    try {
      const result = await save(values);
      if (result && result.data) {
        this.setComplete();
        if (onSave) {
          onSave(result.data);
        }
      } else {
        throw new Error(
          intl.formatMessage({
            id: 'something_went_wrong',
            defaultMessage: 'Something went wrong.'
          })
        );
      }
    } catch (err) {
      this.setIdle();
      const valErrors = parseGraphQlValidationError(err);
      if (valErrors) {
        setErrors(valErrors);
      } else {
        this.showError(err);
      }
    }
  }

  public render() {
    const { title, content, slug, intl, deleteButton, onDelete } = this.props;
    return (
      <div className="post-form">
        <ErrorAlert onDismiss={this.hideError} error={this.state.error} />
        <Formik
          enableReinitialize
          validateOnBlur={false}
          initialValues={{ title, slug, content }}
          onSubmit={this.onSubmitHandler}
          validate={this.setIdle}
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
                onChange={(e: React.ChangeEvent<any>) => {
                  const value = e.target.value;
                  setFieldValue('title', value);
                  setFieldValue('slug', convertToSlug(value));
                }}
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
                <SaveButton
                  className="mr-3"
                  loading={this.state.loading}
                  complete={this.state.complete}
                />
                {deleteButton && (
                  <IconButton
                    onClick={onDelete}
                    icon="trash-alt"
                    color="danger"
                  >
                    <FormattedMessage id="delete" defaultMessage="Delete" />
                  </IconButton>
                )}
              </FormGroup>
            </Form>
          )}
        </Formik>
      </div>
    );
  }
}

export default withIntl(PostForm);
