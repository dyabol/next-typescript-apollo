import { Button, Form } from 'antd';
import FormItem from 'antd/lib/form/FormItem';
import { Field, Formik } from 'formik';
import Link from 'next/link';
import Router from 'next/router';
import * as React from 'react';
import { InjectedIntl } from 'react-intl';
import { LoginComponent, MeQuery } from '../generated/apolloComponents';
import { meQuery } from '../graphql/user/queries/me';
import withIntl from '../lib/withIntl';
import InputField from './field/InputField';

export interface LoginFormProps {
  intl: InjectedIntl;
}

class LoginForm extends React.Component<LoginFormProps, {}> {
  public emailInput = React.createRef<HTMLInputElement>();

  constructor(props: LoginFormProps) {
    super(props);
    this.focusTextInput = this.focusTextInput.bind(this);
  }

  focusTextInput() {
    this.emailInput.current!.focus();
  }

  public render() {
    const { intl } = this.props;
    return (
      <LoginComponent>
        {login => (
          <Formik
            initialValues={{
              email: '',
              password: ''
            }}
            onSubmit={async (values, { setErrors }) => {
              const result = await login({
                variables: {
                  email: values.email,
                  password: values.password
                },
                update: (cache, { data }) => {
                  if (!data || !data.login) {
                    return;
                  }
                  cache.writeQuery<MeQuery>({
                    query: meQuery,
                    data: {
                      __typename: 'Query',
                      me: data.login
                    }
                  });
                }
              });
              if (result && result.data && !result.data.login) {
                setErrors({
                  email: intl.formatMessage({
                    id: 'wrong_email_or_password',
                    defaultMessage: 'Wrong email or password.'
                  })
                });
                this.focusTextInput();
                return;
              }
              Router.push('/');
            }}
          >
            {({ values, handleSubmit }) => (
              <Form onSubmit={handleSubmit}>
                <Field
                  innerRef={this.emailInput}
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
                  autoFocus
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
                <FormItem>
                  <Link href="/forgot-password">
                    <a>
                      {intl.formatMessage({
                        id: 'forgot_password',
                        defaultMessage: 'Forgot password'
                      })}
                    </a>
                  </Link>
                </FormItem>
                <FormItem>
                  <Button type="primary" htmlType="submit">
                    {intl.formatMessage({
                      id: 'login',
                      defaultMessage: 'Login'
                    })}
                  </Button>
                </FormItem>
              </Form>
            )}
          </Formik>
        )}
      </LoginComponent>
    );
  }
}

export default withIntl(LoginForm);
