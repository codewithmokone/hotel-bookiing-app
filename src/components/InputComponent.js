import React from 'react'

function InputComponent({type, value, onChange, placeholder}) {
  return (
    <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder} 
    />
  )
}

export default InputComponent