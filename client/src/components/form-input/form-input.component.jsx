import React from "react";

import "./form-input.styles.scss";

const FormInput = ({ handleChange, label, ...otherProps }) => {
  return (
    <div className='group'>
      {// if developer pass a label,we will generate one, vice versa
      label ? (
        <label
          className={`${
            otherProps.value.length ? "shrink" : ""
          } form-input-label`}
        >
          {label}
        </label>
      ) : null}
      <input className='form-input' onChange={handleChange} {...otherProps} />
    </div>
  );
};

export default FormInput;
