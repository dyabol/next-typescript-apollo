import { Field, Formik } from 'formik';
import * as React from 'react';
import { Button, Form } from 'reactstrap';
import { RegisterComponent } from '../generated/apolloComponents';
import InputField from './field/InputField';

export interface RegisterFormProps {}

export default class RegisterForm extends React.Component<
  RegisterFormProps,
  {}
> {
  public render() {
    return (
      <RegisterComponent>
        {register => (
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
            onSubmit={async (values, { setErrors }) => {
              try {
                const response = await register({
                  variables: {
                    data: {
                      firstName: values.firstName,
                      lastName: values.lastName,
                      email: values.lastName,
                      password: values.password
                    }
                  }
                });
                console.log(response);
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
              password_repeat: '',
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
                  label="Jméno"
                />
                <Field
                  name="lastName"
                  placeholder=""
                  value={values.lastName}
                  component={InputField}
                  required
                  id="lastNameField"
                  label="Příjmení"
                />
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
                  Registrovat
                </Button>
              </Form>
            )}
          </Formik>
        )}
      </RegisterComponent>
    );
  }
}
