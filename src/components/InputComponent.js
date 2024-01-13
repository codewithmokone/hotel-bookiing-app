import { Box, TextField } from '@mui/material'
import React from 'react'

function InputComponent({ name, type, value, onChange, placeholder,theme }) {

  if(theme === 'primary'){
    return (
      <Box
        sx={{
          // marginLeft:2,
          backgroundColor:'white',
          width:580,
          marginBottom:2,
        }}
      >
        <TextField 
          fullWidth
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
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

  return (
    <Box
      sx={{
        marginLeft:2,
        backgroundColor:'white',
      }}
    >
      <TextField 
        // fullWidth
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        // style={inputStyle}
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