import { Box } from '@mui/material'
import React from 'react'

function InputComponent({ name, type, value, onChange, placeholder }) {
  return (
    <Box
      sx={{
        width: { xs: 300, sm:500, md:750 },
        borderWidth: 2,
      }}
    >
      <input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required
      />
    </Box>

  )
}

export default InputComponent