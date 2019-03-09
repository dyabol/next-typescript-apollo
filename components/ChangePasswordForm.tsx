import { Field, Formik } from 'formik';
import Router from 'next/router';
import * as React from 'react';
import { Button, Form } from 'reactstrap';
import { ChangePasswordComponent } from '../generated/apolloComponents';
import InputField from './field/InputField';

export interface ChangePasswordFormProps {
  token: string;
}

export default class ChangePasswordForm extends React.Component<
  ChangePasswordFormProps,
  {}
> {
  public render() {
    const { token } = this.props;
    return (
      <ChangePasswordComponent>
        {changePassword => (
          <Formik
            validateOnBlur={true}
            validateOnChange={true}
            validate={values => {
              let errors: { [key: string]: string } = {};
              if (values.password != values.password_repeat) {
                errors.password_repeat = 'Hesla se neshodují';
              }
              return errors;
            }}
            onSubmit={async values => {
              const response = await changePassword({
                variables: {
                  data: {
                    password: values.password,
                    token: token
                  }
                }
              });
              console.log(response);
              Router.push('/');
            }}
            initialValues={{
              password: '',
              password_repeat: ''
            }}
          >
            {({ values, handleSubmit }) => (
              <Form onSubmit={handleSubmit}>
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
                <Field
                  name="password_repeat"
                  type="password"
                  placeholder=""
                  value={values.password_repeat}
                  component={InputField}
                  required
                  id="passwordRepeatField"
                  label="Heslo znovu"
                />
                <Button color="primary" type="submit">
                  Change password
                </Button>
              </Form>
            )}
          </Formik>
        )}
      </ChangePasswordComponent>
    );
  }
}
