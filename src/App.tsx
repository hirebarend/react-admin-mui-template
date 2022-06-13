import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import {
  AppBar,
  Box,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Dashboard, Menu } from '@mui/icons-material';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { Home } from './features';

export const THEME = createTheme({
  palette: {
    primary: {
      main: '#7849ff',
    },
    secondary: {
      main: '#212124',
    },
  },
  typography: {
    fontFamily: ['Inter'].join(','),
  },
} as any);

function App() {
  const { isAuthenticated, isLoading, loginWithRedirect } = useAuth0();

  const navigate = useNavigate();

  const [drawerOpen, setDrawerOpen] = useState(false);

  const isMobile = window.screen.width < 576;

  const drawerWidth: number | undefined = isMobile
    ? undefined
    : window.screen.width / 5;

  if (!isLoading && !isAuthenticated) {
    loginWithRedirect();

    return <></>;
  }

  return (
    <ThemeProvider theme={THEME}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
        >
          <Toolbar>
            <IconButton
              aria-label="menu"
              color="inherit"
              edge="start"
              onClick={() => setDrawerOpen(!drawerOpen)}
              size="large"
              sx={{ marginRight: 2 }}
            >
              <Menu />
            </IconButton>
            <Typography component="div" noWrap variant="h6">
              My App
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          open={drawerOpen}
          variant={isMobile ? 'temporary' : 'permanent'}
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            ['& .MuiDrawer-paper']: {
              width: drawerWidth,
              boxSizing: 'border-box',
            },
          }}
        >
          <Toolbar />
          <Box sx={{ overflow: 'auto' }}>
            <List>
              <ListItem
                button
                onClick={() => {
                  navigate('/');

                  if (isMobile) {
                    setDrawerOpen(false);
                  }
                }}
              >
                <ListItemIcon>
                  <Dashboard />
                </ListItemIcon>
                <ListItemText primary="One" />
              </ListItem>
              <ListItem
                button
                onClick={() => {
                  navigate('/');

                  if (isMobile) {
                    setDrawerOpen(false);
                  }
                }}
              >
                <ListItemIcon>
                  <Dashboard />
                </ListItemIcon>
                <ListItemText primary="Two" />
              </ListItem>
              <ListItem
                button
                onClick={() => {
                  navigate('/');

                  if (isMobile) {
                    setDrawerOpen(false);
                  }
                }}
              >
                <ListItemIcon>
                  <Dashboard />
                </ListItemIcon>
                <ListItemText primary="Three" />
              </ListItem>
            </List>
            <Divider />
            <List>
              <ListItem
                button
                onClick={() => {
                  navigate('/');

                  if (isMobile) {
                    setDrawerOpen(false);
                  }
                }}
              >
                <ListItemIcon>
                  <Dashboard />
                </ListItemIcon>
                <ListItemText primary="Four" />
              </ListItem>
              <ListItem
                button
                onClick={() => {
                  navigate('/');

                  if (isMobile) {
                    setDrawerOpen(false);
                  }
                }}
              >
                <ListItemIcon>
                  <Dashboard />
                </ListItemIcon>
                <ListItemText primary="Five" />
              </ListItem>
              <ListItem
                button
                onClick={() => {
                  navigate('/');

                  if (isMobile) {
                    setDrawerOpen(false);
                  }
                }}
              >
                <ListItemIcon>
                  <Dashboard />
                </ListItemIcon>
                <ListItemText primary="Six" />
              </ListItem>
            </List>
            <Divider />
            <List>
              <ListItem
                button
                onClick={() => {
                  navigate('/');

                  if (isMobile) {
                    setDrawerOpen(false);
                  }
                }}
              >
                <ListItemIcon>
                  <Dashboard />
                </ListItemIcon>
                <ListItemText primary="Seven" />
              </ListItem>
              <ListItem
                button
                onClick={() => {
                  navigate('/');

                  if (isMobile) {
                    setDrawerOpen(false);
                  }
                }}
              >
                <ListItemIcon>
                  <Dashboard />
                </ListItemIcon>
                <ListItemText primary="Eight" />
              </ListItem>
              <ListItem
                button
                onClick={() => {
                  navigate('/');

                  if (isMobile) {
                    setDrawerOpen(false);
                  }
                }}
              >
                <ListItemIcon>
                  <Dashboard />
                </ListItemIcon>
                <ListItemText primary="Nine" />
              </ListItem>
            </List>
          </Box>
        </Drawer>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Toolbar />
          <Routes>
            <Route element={<Home></Home>} path="/"></Route>
          </Routes>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;
