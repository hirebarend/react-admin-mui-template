import React from 'react';
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
import { findWebhooksMock } from '../../api';
import { Webhook } from '../../types';

export function Webhooks() {
  const useQueryResult = useQuery(
    'webhooks',
    async () => await findWebhooksMock()
  );

  return (
    <Container>
      <Typography component="div" gutterBottom variant="h4">
        Webhooks
      </Typography>

      <Stack direction="row" justifyContent="space-between" spacing={2}>
        <Box>
          <Typography component="div" gutterBottom variant="subtitle1">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et
            mauris a libero interdum tincidunt sed et mi.
          </Typography>
        </Box>
        <Button variant="outlined">Create webhook</Button>
      </Stack>

      <TableContainer component={Paper} sx={{ marginY: '1rem' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>URL</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {useQueryResult.data?.map((x: Webhook, index: number) => (
              <TableRow
                key={index}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {x.name}
                </TableCell>
                <TableCell>{x.status}</TableCell>
                <TableCell>{x.url}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
