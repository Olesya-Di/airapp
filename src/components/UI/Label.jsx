import React from 'react'

const Label = ({htmlFor, labelText}) => {
  return (
    <label htmlFor={htmlFor}>{labelText}</label>
  )
}

export default Label;
