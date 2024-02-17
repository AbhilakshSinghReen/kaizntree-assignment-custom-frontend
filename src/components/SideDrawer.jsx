import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";

import {
  Home as HomeIcon,
  Category as CategoryIcon,
  Inventory as InventoryIcon,
  Build as BuildIcon,
  ViewStream as ViewStreamIcon,
  PrecisionManufacturing as PrecisionManufacturingIcon,
  Support as SupportIcon,
  PowerInput as PowerInputIcon,
  ViewModule as ViewModuleIcon,
  Assessment as AssessmentIcon,
  Help as HelpIcon,
  IntegrationInstructions as IntegrationInstructionsIcon,
  Logout as LogoutIcon,
  Person as PersonIcon,
} from "@mui/icons-material";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== "open" })(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function SideDrawer() {
  const theme = useTheme();
  const location = useLocation();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  // const []

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  if (urlsToHideDrawer.includes(location.pathname)) {
    return null;
  }

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            {process.env.REACT_APP_NAME}
          </Typography>
        </Toolbar>
      </AppBar>

      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {drawerPrimaryItems.map((item, index) => (
            <ListItem key={item.label} disablePadding sx={{ display: "block" }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                  backgroundColor: location.pathname === item.link ? "rgba(0, 0, 255, 0.15)" : "#FFFFFF",
                }}
                onClick={() => navigate(item.link)}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.label} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {drawerSecondaryItems.map((item, index) => (
            <ListItem key={item.label} disablePadding sx={{ display: "block" }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                  backgroundColor: location.pathname === item.link ? "rgba(0, 0, 255, 0.15)" : "#FFFFFF",
                }}
                onClick={() => navigate(item.link)}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.label} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </Box>
  );
}

const urlsToHideDrawer = ["/auth/login", "/auth/register"];
const drawerPrimaryItems = [
  {
    label: "Home",
    link: "/",
    icon: <HomeIcon />,
  },
  {
    label: "Items",
    link: "/items",
    icon: <CategoryIcon />,
  },
  {
    label: "Stock",
    link: "/stock",
    icon: <InventoryIcon />,
  },
  {
    label: "Builds",
    link: "/builds",
    icon: <BuildIcon />,
  },
  {
    label: "Customers",
    link: "/customers",
    icon: <SupportIcon />,
  },
  {
    label: "Sales Orders",
    link: "/sales-orders",
    icon: <ViewStreamIcon />,
  },
  {
    label: "Suppliers",
    link: "/suppliers",
    icon: <PowerInputIcon />,
  },
  {
    label: "Manufacturers",
    link: "/manufacturers",
    icon: <PrecisionManufacturingIcon />,
  },
  {
    label: "Purchase Orders",
    link: "/purchase-orders",
    icon: <ViewModuleIcon />,
  },
  {
    label: "Reports",
    link: "/reports",
    icon: <AssessmentIcon />,
  },
];
const drawerSecondaryItems = [
  {
    label: "Help!",
    link: "/help",
    icon: <HelpIcon />,
  },
  {
    label: "Integrations",
    link: "/integrations",
    icon: <IntegrationInstructionsIcon />,
  },
  {
    label: "Logout",
    link: "/logout",
    icon: <LogoutIcon />,
  },
  {
    label: "My Profile",
    link: "/profile",
    icon: <PersonIcon />,
  },
];
