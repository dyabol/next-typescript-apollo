import { Field, Formik } from 'formik';
import * as React from 'react';
import InputField from '../containers/field/InputField';
import Layout from '../containers/Layout';
import {
  RegisterComponent,
  RegisterInput
} from '../generated/apolloComponents';

export type Props = {
  values: RegisterInput;
};

export default class Post extends React.Component<Props, {}> {
  public render() {
    return (
      <Layout>
        <h1>Register form</h1>
        <RegisterComponent>
          {register => (
            <Formik
              validateOnBlur={false}
              validateOnChange={false}
              onSubmit={async (data, { setErrors }) => {
                try {
                  const response = await register({
                    variables: {
                      data
                    }
                  });
                  console.log(response);
                } catch (err) {
                  if (err.graphQLErrors) {
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
                  }
                }
              }}
              initialValues={{
                email: '',
                password: '',
                firstName: '',
                lastName: ''
              }}
            >
              {({ values, handleSubmit }) => (
                <form onSubmit={handleSubmit}>
                  <Field
                    name="firstName"
                    placeholder="firstName"
                    value={values.firstName}
                    component={InputField}
                    required
                    autoFocus
                  />
                  <Field
                    name="lastName"
                    placeholder="lastName"
                    value={values.lastName}
                    component={InputField}
                    required
                  />
                  <Field
                    name="email"
                    type="email"
                    placeholder="email"
                    value={values.email}
                    component={InputField}
                    required
                  />
                  <Field
                    name="password"
                    type="password"
                    placeholder="password"
                    value={values.password}
                    component={InputField}
                    required
                  />
                  <button type="submit">submit</button>
                </form>
              )}
            </Formik>
          )}
        </RegisterComponent>
      </Layout>
    );
  }
}
