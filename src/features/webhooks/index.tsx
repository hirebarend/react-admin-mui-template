import React, { useEffect, useState } from 'react';
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
import { useMutation, useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { deleteWebhook, findWebhooks } from '../../api';
import { ConfirmationDialog } from '../../components';
import { Webhook } from '../../types';

export function Webhooks() {
  const { getAccessTokenSilently, getIdTokenClaims } = useAuth0();

  const [accessToken, setAccessToken] = useState(null as string | null);

  useEffect(() => {
    getAccessTokenSilently()
      .then(() => getIdTokenClaims())
      .then((x) => setAccessToken(x?.__raw || null));
  }, []);

  const navigate = useNavigate();

  const useQueryResult = useQuery(
    ['findWebhooks', accessToken],
    async () => await findWebhooks(accessToken),
    {
      enabled: accessToken ? true : false,
    }
  );

  const useMutationResult = useMutation(
    [],
    (webhook: Webhook) => deleteWebhook(accessToken, webhook.id),
    {
      onSuccess: () => useQueryResult.refetch(),
    }
  );

  const [confirmationDialogState, setConfirmationDialogState] = useState(
    null as { fn: () => Promise<void> } | null
  );

  return (
    <>
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
          <Button
            onClick={() => navigate('/app/webhooks/create')}
            variant="contained"
          >
            Create webhook
          </Button>
        </Stack>

        <TableContainer component={Paper} sx={{ marginY: '1rem' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>URL</TableCell>
                <TableCell></TableCell>
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
                  <TableCell align="right">
                    <Button
                      color="error"
                      disabled={useMutationResult.isLoading}
                      onClick={() =>
                        setConfirmationDialogState({
                          fn: () => useMutationResult.mutateAsync(x),
                        })
                      }
                      variant="contained"
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>

      <ConfirmationDialog
        onClose={(x: boolean) => {
          if (!confirmationDialogState) {
            return;
          }

          if (x) {
            confirmationDialogState.fn();
          }

          setConfirmationDialogState(null);
        }}
        open={confirmationDialogState ? true : false}
      ></ConfirmationDialog>
    </>
  );
}

export * from './create';
