import React from "react";
import FeatherIcon from "feather-icons-react";
import { useRouter } from 'next/router';
import Link from "next/link";
import {
  Box,
  Menu,
  Typography,
  ListItemButton,
  List,
  ListItemText,
  Button,
  Divider,
} from "@mui/material";
const ProfileDD = () => {
  const [anchorEl4, setAnchorEl4] = React.useState(null);
  const router = useRouter()

  const handleClick4 = (event) => {
    setAnchorEl4(event.currentTarget);
  };

  const handleClose4 = () => {
    setAnchorEl4(null);
  };

  const logout = () =>{
    localStorage.removeItem("myuser")
    router.push('/login')
  }
  return (
    <>
      <Button
        aria-label="menu"
        color="inherit"
        aria-controls="profile-menu"
        aria-haspopup="true"
        onClick={handleClick4}
      >
        <Box display="flex" alignItems="center">
          
          <Box
            sx={{
              display: {
                xs: "none",
                sm: "flex",
              },
              alignItems: "center",
            }}
          >
            <Typography
              color="textSecondary"
              variant="h5"
              fontWeight="400"
              sx={{ ml: 1 }}
            >
              Hi,
            </Typography>
            <Typography
              variant="h5"
              fontWeight="700"
              sx={{
                ml: 1,
              }}
            >
              SWAPNIL
            </Typography>
            <FeatherIcon icon="chevron-down" width="20" height="20" />
          </Box>
        </Box>
      </Button>
      <Menu
        id="profile-menu"
        anchorEl={anchorEl4}
        keepMounted
        open={Boolean(anchorEl4)}
        onClose={handleClose4}
        sx={{
          "& .MuiMenu-paper": {
            width: "385px",
          },
        }}
      >
        <Box>
          <Box p={2} pt={0}>
            <List
              component="nav"
              aria-label="secondary mailbox folder"
              onClick={handleClose4}
            >
              <ListItemButton>
                <Link href={"/myaccount"}><ListItemText primary="My Account" /></Link>
              </ListItemButton> 
            </List>
          </Box>
          <Divider />
          <Box p={2}>
            <Link href={"/login"} className="no-underline">
              <Button fullWidth variant="outlined" color="primary" onClick={logout}>
                Logout
              </Button>
            </Link>
          </Box>
        </Box>
      </Menu>
    </>
  );
};

export default ProfileDD;
