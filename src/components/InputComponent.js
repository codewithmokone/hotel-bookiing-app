import { Box } from '@mui/material'
import React from 'react'

function InputComponent({ name, type, value, onChange, placeholder }) {
  return (
    <Box
      sx={{
        width: { xs: 300, sm:150, md:750 },
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
        className="w-[150px]"
        required
      />
    </Box>
  )
}

export default InputComponent