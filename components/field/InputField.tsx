import { Form, Input } from "antd";
import { FieldProps } from "formik";
import React from "react";
const FormItem = Form.Item;

interface IProps {
  label?: string;
  required?: boolean;
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
}

const InputField = ({
  field,
  form: { errors, touched },
  ...props
}: FieldProps & IProps) => {
  const errorMassage = touched[field.name] && errors[field.name];
  const inputProps = { ...props };
  inputProps.ref = inputProps.innerRef;
  delete inputProps.innerRef;
  return (
    <FormItem
      label={props.label}
      validateStatus={errorMassage ? "error" : ""}
      help={errorMassage}
      required={props.required}
    >
      <Input {...field} {...inputProps} />
    </FormItem>
  );
};

export default InputField;
