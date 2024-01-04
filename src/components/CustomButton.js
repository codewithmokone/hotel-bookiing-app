import { Button } from '@mui/material'
import React from 'react'


function CustomButton({ children, color, variant }) {
  return (
    <Button sx={{ backgroundColor: '#0088a9', marginTop: 5, marginBottom: 5 }} variant={variant} color={color}>
      {children}
    </Button>
  )
}

export default CustomButton
