import { Field, Formik } from 'formik';
import Router from 'next/router';
import * as React from 'react';
import { Button, Form } from 'reactstrap';
import { ForgotPasswordComponent } from '../generated/apolloComponents';
import InputField from './field/InputField';

export interface ForgotPasswordFormProps {}

export default class ForgotPasswordForm extends React.Component<
  ForgotPasswordFormProps,
  {}
> {
  public render() {
    return (
      <ForgotPasswordComponent>
        {forgotPassword => (
          <Formik
            onSubmit={async values => {
              const response = await forgotPassword({
                variables: values
              });
              console.log(response);
              Router.push('/check-email');
            }}
            initialValues={{
              email: ''
            }}
          >
            {({ values, handleSubmit }) => (
              <Form onSubmit={handleSubmit}>
                <Field
                  name="email"
                  type="email"
                  placeholder=""
                  value={values.email}
                  component={InputField}
                  required
                  id="emailField"
                  label="E-mail"
                />
                <Button color="primary" type="submit">
                  Reset password
                </Button>
              </Form>
            )}
          </Formik>
        )}
      </ForgotPasswordComponent>
    );
  }
}
