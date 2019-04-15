import { Button, Form, Icon } from "antd";
import { Field, Formik, FormikActions } from "formik";
import React from "react";
import { FormattedMessage, InjectedIntl } from "react-intl";
import { parseGraphQlValidationError } from "../lib/error";
import withIntl from "../lib/withIntl";
import { convertToSlug } from "../utils/url";
import MyEditor from "./Editor";
import ErrorAlert from "./ErrorAlert";
import InputField from "./field/InputField";
import SaveButton from "./SaveButton";

const FormItem = Form.Item;

export interface IEditorProps {
  title: string;
  content: string;
  slug: string;
}

export interface IProps extends IEditorProps {
  intl: InjectedIntl;
  deleteButton?: boolean;
  onDelete?: () => void;
  onSave?: (values: any) => void;
  save: (values: IEditorProps) => any;
}

export interface IState {
  loading: boolean;
  complete: boolean;
  error: string | null;
}

class PostForm extends React.Component<IProps, IState> {
  constructor(props: IProps) {
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

  public setLoading() {
    this.setState({ complete: false, loading: true, error: null });
  }

  public setComplete() {
    this.setState({ complete: true, loading: false });
  }

  public setIdle() {
    this.setState({ complete: false, loading: false });
  }

  public showError(err: string) {
    this.setState({
      error: err
    });
  }

  public hideError() {
    this.setState({
      error: null
    });
  }

  public async onSubmitHandler(
    values: IEditorProps,
    { setErrors }: FormikActions<IEditorProps>
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
            id: "something_went_wrong",
            defaultMessage: "Something went wrong."
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
                  id: "title",
                  defaultMessage: "Title"
                })}
                autoFocus
                autoComplete="off"
                onChange={(e: React.ChangeEvent<any>) => {
                  const value = e.target.value;
                  setFieldValue("title", value);
                  setFieldValue("slug", convertToSlug(value));
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
                  id: "slug",
                  defaultMessage: "Slug"
                })}
                autoComplete="off"
              />
              <FormItem>
                <MyEditor
                  content={content}
                  onChange={value => setFieldValue("content", value)}
                />
              </FormItem>
              <FormItem>
                <SaveButton
                  style={{ marginRight: "16px" }}
                  loading={this.state.loading}
                  complete={this.state.complete}
                />
                {deleteButton && (
                  <Button onClick={onDelete} type="danger">
                    <Icon type="close" />
                    <FormattedMessage id="delete" defaultMessage="Delete" />
                  </Button>
                )}
              </FormItem>
            </Form>
          )}
        </Formik>
      </div>
    );
  }
}

export default withIntl(PostForm);
