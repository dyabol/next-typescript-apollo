import { Button, Form } from 'antd';
import { Field, Formik, FormikActions } from 'formik';
import Router from 'next/router';
import * as React from 'react';
import { InjectedIntl } from 'react-intl';
import { registerMutation } from '../graphql/user/mutations/register';
import { parseGraphQlValidationError } from '../lib/error';
import withIntl from '../lib/withIntl';
import InputField from './field/InputField';

export interface FieldType {
  email: string;
  password: string;
  repeat_password: string;
  firstName: string;
  lastName: string;
}
export interface Props {
  intl: InjectedIntl;
}

class RegisterForm extends React.Component<Props, {}> {
  initialValues = {
    email: '',
    password: '',
    repeat_password: '',
    firstName: '',
    lastName: ''
  };

  constructor(props: Props) {
    super(props);
    this.onValidateHandler = this.onValidateHandler.bind(this);
    this.onSubmitHandler = this.onSubmitHandler.bind(this);
  }

  onValidateHandler(values: FieldType) {
    const { intl } = this.props;
    let errors: { [key: string]: string } = {};
    if (values.password != values.repeat_password) {
      errors.repeat_password = intl.formatMessage({
        id: 'passwords_do_not_match',
        defaultMessage: 'Passwords do not match.'
      });
    }
    return errors;
  }

  async onSubmitHandler(
    values: FieldType,
    { setErrors }: FormikActions<FieldType>
  ) {
    try {
      const response = await registerMutation({
        variables: {
          data: {
            firstName: values.firstName,
            lastName: values.lastName,
            email: values.email,
            password: values.password
          }
        }
      });
      console.log(response);
      Router.push('/check-email');
    } catch (err) {
      const valErrors = parseGraphQlValidationError(err);
      if (valErrors) {
        setErrors(valErrors);
      } else {
        throw err;
      }
    }
  }

  public render() {
    const { intl } = this.props;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      }
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0
        },
        sm: {
          span: 16,
          offset: 8
        }
      }
    };
    return (
      <Formik
        validateOnBlur={true}
        validateOnChange={true}
        validate={this.onValidateHandler}
        onSubmit={this.onSubmitHandler}
        initialValues={this.initialValues}
      >
        {({ values, handleSubmit }) => (
          <Form {...formItemLayout} onSubmit={handleSubmit}>
            <Field
              name="firstName"
              placeholder=""
              value={values.firstName}
              component={InputField}
              required
              autoFocus
              id="firstNameField"
              label={intl.formatMessage({
                id: 'first_name',
                defaultMessage: 'First name'
              })}
            />
            <Field
              name="lastName"
              placeholder=""
              value={values.lastName}
              component={InputField}
              required
              id="lastNameField"
              label={intl.formatMessage({
                id: 'last_name',
                defaultMessage: 'Last name'
              })}
            />
            <Field
              name="email"
              type="email"
              placeholder=""
              value={values.email}
              component={InputField}
              required
              id="emailField"
              label={intl.formatMessage({
                id: 'email',
                defaultMessage: 'E-mail'
              })}
            />
            <Field
              name="password"
              type="password"
              placeholder=""
              value={values.password}
              component={InputField}
              required
              id="passwordField"
              label={intl.formatMessage({
                id: 'password',
                defaultMessage: 'Password'
              })}
            />
            <Field
              name="repeat_password"
              type="password"
              placeholder=""
              value={values.repeat_password}
              component={InputField}
              required
              id="repeatPasswordField"
              label={intl.formatMessage({
                id: 'repeat_password',
                defaultMessage: 'Repeat password'
              })}
            />
            <Form.Item {...tailFormItemLayout}>
              <Button type="primary" htmlType="submit">
                {intl.formatMessage({
                  id: 'register',
                  defaultMessage: 'Register'
                })}
              </Button>
            </Form.Item>
          </Form>
        )}
      </Formik>
    );
  }
}

export default withIntl(RegisterForm);
