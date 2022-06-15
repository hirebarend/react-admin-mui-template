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
import { Dashboard, Menu } from '@mui/icons-material';
import { useNavigate, Outlet } from 'react-router-dom';
import { APP } from '../../configuration';

export function AppRoute() {
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
    <>
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
                  navigate('/app');

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
                  navigate('/app/referrers');

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
                  navigate('/app/customers');

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
                  navigate('/app/rewards');

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
                  navigate('/app/webhooks');

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
                  navigate('/app');

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
                  navigate('/app');

                  if (isMobile) {
                    setDrawerOpen(false);
                  }
                }}
              >
                <ListItemIcon>
                  <Dashboard />
                </ListItemIcon>
                <ListItemText primary="Refer a friend" />
              </ListItem>
            </List>
            <Divider />
            <List>
              <ListItem
                button
                onClick={() => {
                  navigate('/app');

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
          <Outlet />
        </Box>
      </Box>
    </>
  );
}
