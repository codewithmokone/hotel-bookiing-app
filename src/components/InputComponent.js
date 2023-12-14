import { Box } from '@mui/material'
import React from 'react'

function InputComponent({ name, type, value, onChange, placeholder,width }) {

  const inputStyle = {
    width: width || '200px', // Default width if not provided
    height: "40px",
    // padding: '8px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    // Add any other styles here
  };

  return (
    <Box
      sx={{
        width: { xs: width, sm:width, md:width },
        marginLeft:2,
        borderWidth: 2,
      }}
    >
      <input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        style={inputStyle}
        required
      />
    </Box>
  )
}

export default InputComponent