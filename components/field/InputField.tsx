import { Form, Input } from 'antd';
import { FieldProps } from 'formik';
import React from 'react';
const FormItem = Form.Item;

type Props = {
  label?: string;
  ref?:
    | string
    | ((instance: Input | null) => void)
    | React.RefObject<Input>
    | null
    | undefined;
  innerRef?:
    | string
    | ((instance: Input | null) => void)
    | React.RefObject<Input>
    | null
    | undefined;
};

const InputField = ({
  field,
  form: { errors, touched },
  ...props
}: FieldProps & Props) => {
  const errorMassage = touched[field.name] && errors[field.name];
  var inputProps = { ...props };
  inputProps.ref = inputProps.innerRef;
  delete inputProps.innerRef;
  return (
    <FormItem
      label={props.label}
      validateStatus={errorMassage ? 'error' : ''}
      help={errorMassage}
    >
      <Input {...field} {...inputProps} />
    </FormItem>
  );
};

export default InputField;
