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
import {
  Customers,
  CustomersView,
  Home,
  Referrers,
  Webhooks,
  WebhooksCreate,
} from './features';
import { APP } from './configuration';

export const THEME = createTheme({
  // palette: {
  //   primary: {
  //     main: '#7849ff',
  //   },
  //   secondary: {
  //     main: '#212124',
  //   },
  // },
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
              {APP.name}
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
                <ListItemText primary="Dashboard" />
              </ListItem>
              <ListItem
                button
                onClick={() => {
                  navigate('/referrers');

                  if (isMobile) {
                    setDrawerOpen(false);
                  }
                }}
              >
                <ListItemIcon>
                  <Dashboard />
                </ListItemIcon>
                <ListItemText primary="Referrers" />
              </ListItem>
              <ListItem
                button
                onClick={() => {
                  navigate('/customers');

                  if (isMobile) {
                    setDrawerOpen(false);
                  }
                }}
              >
                <ListItemIcon>
                  <Dashboard />
                </ListItemIcon>
                <ListItemText primary="Customers" />
              </ListItem>
              <ListItem
                button
                onClick={() => {
                  navigate('/rewards');

                  if (isMobile) {
                    setDrawerOpen(false);
                  }
                }}
              >
                <ListItemIcon>
                  <Dashboard />
                </ListItemIcon>
                <ListItemText primary="Rewards" />
              </ListItem>
            </List>
            <Divider />
            <List>
              <ListItem
                button
                onClick={() => {
                  navigate('/webhooks');

                  if (isMobile) {
                    setDrawerOpen(false);
                  }
                }}
              >
                <ListItemIcon>
                  <Dashboard />
                </ListItemIcon>
                <ListItemText primary="Webhooks" />
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
                <ListItemText primary="API docs" />
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
                <ListItemText primary="Tell a friend" />
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
                <ListItemText primary="Sign out" />
              </ListItem>
            </List>
          </Box>
        </Drawer>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Toolbar />
          <Routes>
            <Route element={<Home></Home>} path="/"></Route>
            <Route element={<Customers></Customers>} path="/customers"></Route>
            <Route
              element={<CustomersView></CustomersView>}
              path="/customers/:id"
            ></Route>
            <Route element={<Referrers></Referrers>} path="/referrers"></Route>
            <Route element={<Webhooks></Webhooks>} path="/webhooks"></Route>
            <Route
              element={<WebhooksCreate></WebhooksCreate>}
              path="/webhooks/create"
            ></Route>
          </Routes>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;
