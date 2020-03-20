import React from 'react';
import { useField } from 'formik';

export const Textarea = ({ label, ...props }) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input> and also replace ErrorMessage entirely.
  const [field, meta] = useField(props);
  return (
    <>
     <div className="inputGroup">
      <label htmlFor={props.id || props.name}>{label}</label>
      <textarea className="textarea" {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
     </div>
    </>
  );
};

export default Textarea;