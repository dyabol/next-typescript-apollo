import { Form, Input } from 'antd';
import { FieldProps } from 'formik';
import React from 'react';
const FormItem = Form.Item;

type Props = {
  id: string;
  label?: string;
};

const InputField = ({
  field,
  form: { errors, touched },
  ...props
}: FieldProps & Props) => {
  const errorMassage = touched[field.name] && errors[field.name];
  return (
    <FormItem
      label={props.label}
      validateStatus={errorMassage ? 'error' : ''}
      help={errorMassage}
    >
      <Input {...field} {...props} />
    </FormItem>
  );
};

export default InputField;
