import { Button } from '@mui/material'
import React from 'react'

function ButtonComponent({label, theme}) {
    if (theme === "primary") {
        return (
            <Button
              sx={{ 
                width: 60, 
                height: 55, 
                marginTop: 5, 
                borderRadius: 10, 
                backgroundColor: 'green', 
                color: 'white' 
              }}
              
            >{label}</Button>
        )
      }
      return (
        <Button>{label}</Button>
      )
}

export default ButtonComponent