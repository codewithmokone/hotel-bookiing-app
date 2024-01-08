import { Box, TextField } from '@mui/material'
import React from 'react'

function InputComponent({ name, type, value, onChange, placeholder,width }) {

  const inputStyle = {
    border: '1px solid #ccc',
    borderRadius: '4px',
    // Add any other styles here
  };

  return (
    <Box
      sx={{
        marginLeft:2,
        backgroundColor:'white',
      }}
    >
      <TextField 
        fullWidth
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        style={inputStyle}
        required
        size='small'
      />
      {/* <input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        style={inputStyle}
        required
      /> */}
    </Box>
  )
}

export default InputComponent