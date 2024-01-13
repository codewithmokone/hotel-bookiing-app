import { Button } from '@mui/material'
import React from 'react'


function CustomButton({ text, variant,onClick }) {
  return (
    <Button sx={{ backgroundColor: '#0088a9', marginTop: 5, marginBottom: 5, width:150,height:40 }} variant={variant} onClick={onClick}>
      {text}
    </Button>
  )
}

export default CustomButton
