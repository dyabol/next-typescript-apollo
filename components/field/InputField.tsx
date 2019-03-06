import { FieldProps } from 'formik';
import React from 'react';
import { FormFeedback, FormGroup, Input, Label } from 'reactstrap';

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
  const validation = errorMassage ? { invalid: true } : { invalid: false };
  return (
    <FormGroup>
      {props.label && <Label for={props.id}>{props.label}</Label>}
      <Input {...validation} {...field} {...props} />
      {errorMassage && <FormFeedback>{errorMassage}</FormFeedback>}
    </FormGroup>
  );
};

export default InputField;
