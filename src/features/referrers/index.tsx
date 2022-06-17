import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import moment from 'moment';
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
import { findReferrers } from '../../api';
import { Referrer } from '../../types';
import { Loader } from '../../components';

export function Referrers() {
  const { getAccessTokenSilently, getIdTokenClaims } = useAuth0();

  const [accessToken, setAccessToken] = useState(null as string | null);

  useEffect(() => {
    getAccessTokenSilently()
      .then(() => getIdTokenClaims())
      .then((x) => setAccessToken(x?.__raw || null));
  }, []);

  const useQueryResultReferrers = useQuery(
    'findReferrers',
    async () => await findReferrers(accessToken),
    {
      enabled: accessToken ? true : false,
    }
  );

  return (
    <Container>
      <Typography component="div" gutterBottom variant="h4">
        Referrers
      </Typography>

      <Stack direction="row" justifyContent="space-between" spacing={2}>
        <Box>
          <Typography component="div" gutterBottom variant="subtitle1">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et
            mauris a libero interdum tincidunt sed et mi.
          </Typography>
        </Box>
        <Button disabled={true} variant="contained">
          Create referrer
        </Button>
      </Stack>

      {useQueryResultReferrers.isLoading ? (
        <Loader></Loader>
      ) : (
        <TableContainer component={Paper} sx={{ marginY: '1rem' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Created At</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {useQueryResultReferrers.data?.map(
                (x: Referrer, index: number) => (
                  <TableRow
                    key={index}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {x.id}
                    </TableCell>
                    <TableCell>{moment(x.createdAt).format('llll')}</TableCell>
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
