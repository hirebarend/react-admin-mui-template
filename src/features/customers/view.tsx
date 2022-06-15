import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import moment from 'moment';
import {
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { findConversions, findCustomer } from '../../api';
// import { Customer } from '../../types';
import { Loader } from '../../components';
import { Conversion } from '../../types';

export function CustomersView() {
  const { user } = useAuth0();

  const params = useParams();

  console.log(params);

  const useQueryResultCustomer = useQuery(
    ['findCustomer', params.id],
    async () => await findCustomer(user?.sub || '', params.id as string),
    {
      enabled: user ? true : false,
    }
  );

  const useQueryResultConversions = useQuery(
    ['findConversions', user?.sub, useQueryResultCustomer.data?.emailAddress],
    async () =>
      await findConversions(
        user?.sub || '',
        useQueryResultCustomer.data?.id || ''
      ),
    {
      enabled: useQueryResultCustomer.data ? true : false,
    }
  );

  if (!useQueryResultConversions.data || !useQueryResultCustomer.data) {
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

      <Typography component="div" gutterBottom variant="h5">
        Conversions
      </Typography>

      <TableContainer component={Paper} sx={{ marginY: '1rem' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Campaign</TableCell>
              <TableCell>Referrer</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Created At</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {useQueryResultConversions.data?.map(
              (x: Conversion, index: number) => (
                <TableRow
                  key={index}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell>
                    {x.campaign.name} ({x.campaign.code})
                  </TableCell>
                  <TableCell>{x.campaign.referrer.id}</TableCell>
                  <TableCell>{x.type}</TableCell>
                  <TableCell>{moment(x.createdAt).format('llll')}</TableCell>
                </TableRow>
              )
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
