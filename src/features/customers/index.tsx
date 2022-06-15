import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import {
  Box,
  Button,
  Container,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { findCustomers } from '../../api';
import { Customer } from '../../types';
import { Loader } from '../../components';

export function Customers() {
  const { user } = useAuth0();

  const navigate = useNavigate();

  const useQueryResultCustomers = useQuery(
    'findCustomers',
    async () => await findCustomers(user?.sub || ''),
    {
      enabled: user ? true : false,
    }
  );

  return (
    <Container>
      <Typography component="div" gutterBottom variant="h4">
        Customers
      </Typography>

      <Stack direction="row" justifyContent="space-between" spacing={2}>
        <Box>
          <Typography component="div" gutterBottom variant="subtitle1">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et
            mauris a libero interdum tincidunt sed et mi.
          </Typography>
        </Box>
        <Button disabled={true} variant="contained">
          Create customer
        </Button>
      </Stack>

      {useQueryResultCustomers.isLoading ? (
        <Loader></Loader>
      ) : (
        <TableContainer component={Paper} sx={{ marginY: '1rem' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Email Address</TableCell>
                <TableCell>Full Name</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {useQueryResultCustomers.data?.map(
                (x: Customer, index: number) => (
                  <TableRow
                    key={index}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {x.id}
                    </TableCell>
                    <TableCell>{x.emailAddress}</TableCell>
                    <TableCell>
                      {x.firstName} {x.lastName}
                    </TableCell>
                    <TableCell align="right">
                      <Button
                        onClick={() => navigate(`/customers/${x.id}`)}
                        variant="outlined"
                      >
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                )
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
}

export * from './view';
