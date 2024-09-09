import { Button } from '@mui/material'
import React from 'react'

const Contact = () => {
  return (
    <div class='contactui'>
        <Button
                  sx={{color:"yellow",fontSize:"40px"}}
                  variant="outlined"
                  color="primary"
                  href="https://www.linkedin.com/in/saraung-babu/" // Replace with your LinkedIn profile link
                >
                  Connect on LinkedIn
                </Button><br />
      <a href="mailto:saraungbabu@gmail.com">Email : saraungbabu@gmail.com</a>
    </div>
  )
}

export default Contact
