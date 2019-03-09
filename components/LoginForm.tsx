import { Field, Formik } from 'formik';
import Link from 'next/link';
import Router from 'next/router';
import * as React from 'react';
import { Button, Form, FormGroup } from 'reactstrap';
import { LoginComponent, MeQuery } from '../generated/apolloComponents';
import { meQuery } from '../graphql/user/queries/me';
import InputField from './field/InputField';

export interface LoginFormProps {}

export default class LoginForm extends React.Component<LoginFormProps, {}> {
  public emailInput = React.createRef<HTMLInputElement>();

  constructor(props: LoginFormProps) {
    super(props);
    this.focusTextInput = this.focusTextInput.bind(this);
  }

  focusTextInput() {
    this.emailInput.current!.focus();
  }

  public render() {
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
              console.log(result);
              if (result && result.data && !result.data.login) {
                setErrors({
                  email: 'Bed login or password'
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
                  label="E-mail"
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
                  label="Heslo"
                />
                <FormGroup>
                  <Link href="/forgot-password">
                    <a>Forgot password</a>
                  </Link>
                </FormGroup>
                <Button color="primary" type="submit">
                  Přihlásit
                </Button>
              </Form>
            )}
          </Formik>
        )}
      </LoginComponent>
    );
  }
}
