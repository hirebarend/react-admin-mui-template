import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import {
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { findCustomersMock } from '../../api';
// import { Customer } from '../../types';
import { Loader } from '../../components';

export function CustomersView() {
  const { user } = useAuth0();

  const params = useParams();

  console.log(params);

  const useQueryResultCustomer = useQuery(
    'findCustomers[0]',
    async () => (await findCustomersMock(user?.sub || ''))[0],
    {
      enabled: user ? true : false,
    }
  );

  if (!useQueryResultCustomer.data) {
    return <Loader></Loader>;
  }

  return (
    <Container>
      <Typography component="div" gutterBottom variant="h4">
        Customers ({useQueryResultCustomer.data.emailAddress})
      </Typography>

      <Stack direction="row" justifyContent="space-between" spacing={2}>
        <Box>
          <Typography component="div" gutterBottom variant="subtitle1">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et
            mauris a libero interdum tincidunt sed et mi.
          </Typography>
        </Box>
        <Button color="error" variant="contained">
          Delete
        </Button>
      </Stack>

      <Paper sx={{ marginY: '1rem', padding: '2rem' }}>
        <Box component="form">
          <Grid container spacing={2}>
            <Grid item md={6} sm={12} xs={12}>
              <FormControl fullWidth sx={{ marginBottom: '1rem' }}>
                <TextField
                  disabled={true}
                  // error={errors.name ? true : false}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  // inputProps={{ ...register('name', { required: true }) }}
                  label="Email Address"
                  variant="outlined"
                  value={useQueryResultCustomer.data.emailAddress}
                />
              </FormControl>
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item md={6} sm={12} xs={12}>
              <FormControl fullWidth sx={{ marginBottom: '1rem' }}>
                <TextField
                  disabled={true}
                  // error={errors.name ? true : false}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  // inputProps={{ ...register('name', { required: true }) }}
                  label="First Name"
                  variant="outlined"
                  value={useQueryResultCustomer.data.firstName}
                />
              </FormControl>
            </Grid>
            <Grid item md={6} sm={12} xs={12}>
              <FormControl fullWidth sx={{ marginBottom: '1rem' }}>
                <TextField
                  disabled={true}
                  // error={errors.name ? true : false}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  // inputProps={{ ...register('name', { required: true }) }}
                  label="Last Name"
                  variant="outlined"
                  value={useQueryResultCustomer.data.lastName}
                />
              </FormControl>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
}
