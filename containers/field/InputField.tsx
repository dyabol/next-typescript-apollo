import { FieldProps } from 'formik';
import React, { DetailedHTMLProps, InputHTMLAttributes } from 'react';

type InputProps = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

const InputField = ({
  field,
  form: { errors, touched },
  ...props
}: FieldProps & InputProps) => {
  const errorMassage = touched[field.name] && errors[field.name];
  return (
    <div>
      <input {...field} {...props} />
      {errorMassage && <div style={{ color: 'red' }}>{errorMassage}</div>}
    </div>
  );
};

export default InputField;
