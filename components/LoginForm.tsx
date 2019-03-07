import { Field, Formik } from 'formik';
import Router from 'next/router';
import * as React from 'react';
import { Button, Form } from 'reactstrap';
import { LoginComponent } from '../generated/apolloComponents';
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
