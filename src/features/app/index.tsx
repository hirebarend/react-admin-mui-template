import React, { useEffect, useState } from 'react';
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
import { getApiClient } from '../../api-client';

export function AppRoute() {
  const { isAuthenticated, isLoading, loginWithRedirect, user } = useAuth0();

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

  useEffect(() => {
    (async () => {
      if (user && user.email && user.family_name && user.given_name) {
        const accessToken: string =
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJnb29nbGUtb2F1dGgyfDEwMjg1NzE5MTU3ODI5ODk0NzgxOCJ9.bcjXs3eiRx846cwJBCUQe9Veuih0Co32PXDQGem9VRs';

        const apiClient = await getApiClient(accessToken);

        const campaignCode: string | null =
          localStorage.getItem('campaignCode');

        if (!campaignCode) {
          return;
        }

        await apiClient.createConversion(
          campaignCode,
          user.given_name,
          user.family_name,
          user.email,
          'sign_up'
        );
      }
    })();
  }, [user]);

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
