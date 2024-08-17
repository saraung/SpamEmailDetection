import { AppBar, Box, Button, IconButton, Toolbar, Typography } from '@mui/material'
import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import HomeIcon from '@mui/icons-material/Home';
const Navbar = () => {
  return (
    <div>
       <Box sx={{flexGrow:1}}>
        <AppBar sx={{height:70,backgroundColor:'black'}}>
           <Toolbar>
           <IconButton edge="start" color="inherit" component={Link} to="/">
          <HomeIcon />
        </IconButton>
           {/* <Typography variant="h1" component="div" sx={{ flexGrow: 1,fontSize:100,fontSize:50 }}>
                Spam Detector
            </Typography> */}
            <h1 style={{flexGrow: 1}}> Spam Detector</h1>
            <Button ><Link to={"/s"} style={{textDecoration :"none",color:"white"}}>Contact</Link></Button>
           </Toolbar>
        </AppBar>
       </Box>
    </div>
  )
}

export default Navbar
