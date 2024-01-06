import React from 'react'
import { Typography } from '@mui/material'

function CustomTypography({ variant, text, color,theme }) {
    if(theme === 'heading'){
        return (
            <Typography sx={{ marginTop: 3, marginBottom: 3, fontWeight:'bold' }} variant='h6' color='#0088a9'>
                {text}
            </Typography>
        )
    }else if(theme === 'subheading'){
        return (
            <Typography sx={{ marginTop: 5, marginBottom: 3, color:'#0088a9', fontWeight:'bold' }} variant='subtitle1' color={color}>
                {text}
            </Typography>
        )
    }else{
        return (
            <Typography sx={{ marginTop: 5, marginBottom: 3 }} variant='subtitle1' color={color}>
                {text}
            </Typography>
        )
    }
    
}

export default CustomTypography
