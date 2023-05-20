import React from "react";
import { Typography, Box, useTheme, IconButton } from "@mui/material";
import { tokens } from "../theme";



import { useContext } from "react";
import { ColorModeContext } from "../theme";
import { InputBase } from "@mui/material";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import SearchIcon from "@mui/icons-material/Search";
import { useProSidebar } from "react-pro-sidebar";



const Header = ({ title, subtitle }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const { toggleSidebar, broken, rtl } = useProSidebar();

  return (
    <Box sx={{width: '100%'}} display="flex" justifyContent="space-between">
    <Box display="flex">
      {broken && !rtl && (
        <IconButton
          sx={{ margin: "0 6 0 2" }}
          onClick={() => toggleSidebar()}
        >
          <MenuOutlinedIcon />
        </IconButton>
      )}
       <Box mb="10px">
        <Typography
          variant="h2"
          color={colors.grey[100]}
          fontWeight="bold"
          sx={{ mb: "5px" }}
        >
          {title}
        </Typography>
        <Typography variant="h5" color={colors.greenAccent[400]}>
          {subtitle}
        </Typography>
      </Box>
    </Box>
    <Box display="flex" mb="10px">
      <IconButton onClick={colorMode.toggleColorMode}>
        {theme.palette.mode === "dark" ? (
          
         <LightModeOutlinedIcon />
        ) : (
          <DarkModeOutlinedIcon />
        )}
      </IconButton>
      <IconButton>
        <NotificationsOutlinedIcon />
      </IconButton>
      <IconButton>
        <SettingsOutlinedIcon />
      </IconButton>
      <IconButton>
        <PersonOutlinedIcon />
      </IconButton>
      {broken && rtl && (
        <IconButton
          sx={{ margin: "0 6 0 2" }}
          onClick={() => toggleSidebar()}
        >
          <MenuOutlinedIcon />
        </IconButton>
      )}
    </Box>
  </Box>
  );
};

export default Header;
