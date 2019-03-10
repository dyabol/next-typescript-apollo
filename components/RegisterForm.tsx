import { Field, Formik } from 'formik';
import Router from 'next/router';
import * as React from 'react';
import { InjectedIntl } from 'react-intl';
import { Button, Form } from 'reactstrap';
import { RegisterComponent } from '../generated/apolloComponents';
import withIntl from '../lib/withIntl';
import InputField from './field/InputField';

export interface RegisterFormProps {
  intl: InjectedIntl;
}

class RegisterForm extends React.Component<RegisterFormProps, {}> {
  public render() {
    const { intl } = this.props;
    return (
      <RegisterComponent>
        {register => (
          <Formik
            validateOnBlur={true}
            validateOnChange={true}
            validate={values => {
              let errors: { [key: string]: string } = {};
              if (values.password != values.repeat_password) {
                errors.repeat_password = intl.formatMessage({
                  id: 'passwords_do_not_match',
                  defaultMessage: 'Passwords do not match.'
                });
              }
              return errors;
            }}
            onSubmit={async (values, { setErrors }) => {
              try {
                const response = await register({
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
                if (err.graphQLErrors && err.graphQLErrors.length > 0) {
                  const errors: { [key: string]: string } = {};
                  err.graphQLErrors[0].extensions.exception.validationErrors.forEach(
                    (validationError: any) => {
                      Object.values(validationError.constraints).forEach(
                        (message: any) => {
                          errors[validationError.property] = message;
                        }
                      );
                    }
                  );
                  setErrors(errors);
                } else {
                  throw err;
                }
              }
            }}
            initialValues={{
              email: '',
              password: '',
              repeat_password: '',
              firstName: '',
              lastName: ''
            }}
          >
            {({ values, handleSubmit }) => (
              <Form onSubmit={handleSubmit}>
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
                <Button color="primary" type="submit">
                  {intl.formatMessage({
                    id: 'register',
                    defaultMessage: 'Register'
                  })}
                </Button>
              </Form>
            )}
          </Formik>
        )}
      </RegisterComponent>
    );
  }
}

export default withIntl(RegisterForm);
