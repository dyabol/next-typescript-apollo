import { Field, Formik } from 'formik';
import Router from 'next/router';
import * as React from 'react';
import { InjectedIntl } from 'react-intl';
import { Button, Form } from 'reactstrap';
import { ForgotPasswordComponent } from '../generated/apolloComponents';
import withIntl from '../lib/withIntl';
import InputField from './field/InputField';

export interface ForgotPasswordFormProps {
  intl: InjectedIntl;
}

class ForgotPasswordForm extends React.Component<ForgotPasswordFormProps, {}> {
  public render() {
    const { intl } = this.props;
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
                  label={intl.formatMessage({
                    id: 'email',
                    defaultMessage: 'E-email'
                  })}
                />
                <Button color="primary" type="submit">
                  {intl.formatMessage({
                    id: 'reset_password',
                    defaultMessage: 'Reset password'
                  })}
                </Button>
              </Form>
            )}
          </Formik>
        )}
      </ForgotPasswordComponent>
    );
  }
}

export default withIntl(ForgotPasswordForm);
