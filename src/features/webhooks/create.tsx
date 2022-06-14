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
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { Webhook } from '../../types';
import { createWebhook } from '../../api';

export function WebhooksCreate() {
  const { user } = useAuth0();

  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm();

  const navigate = useNavigate();

  const useMutationResult = useMutation(
    [],
    (webhook: Webhook) => createWebhook(user?.sub || '', webhook),
    {
      onSuccess: () => navigate('/webhooks'),
    }
  );

  return (
    <Container>
      <Typography component="div" gutterBottom variant="h4">
        Create Webhook
      </Typography>

      <Stack direction="row" justifyContent="space-between" spacing={2}>
        <Box>
          <Typography component="div" gutterBottom variant="subtitle1">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et
            mauris a libero interdum tincidunt sed et mi.
          </Typography>
        </Box>
        <Button onClick={() => navigate('/webhooks')} variant="outlined">
          Back to webhooks
        </Button>
      </Stack>

      <Paper sx={{ marginY: '1rem', padding: '2rem' }}>
        <Box
          component="form"
          onSubmit={handleSubmit((data) =>
            useMutationResult.mutate({
              id: '',
              name: data.name,
              status: 'active',
              url: data.url,
            })
          )}
        >
          <Grid container spacing={2}>
            <Grid item md={6} sm={12} xs={12}>
              <FormControl fullWidth sx={{ marginBottom: '1rem' }}>
                <TextField
                  error={errors.name ? true : false}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  inputProps={{ ...register('name', { required: true }) }}
                  label="Name"
                  variant="outlined"
                />
              </FormControl>
            </Grid>
            <Grid item md={6} sm={12} xs={12}>
              <FormControl fullWidth sx={{ marginBottom: '1rem' }}>
                <TextField
                  error={errors.url ? true : false}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  inputProps={{ ...register('url', { required: true }) }}
                  label="URL"
                  variant="outlined"
                />
              </FormControl>
            </Grid>
          </Grid>

          <Stack
            direction="row"
            justifyContent="flex-end"
            sx={{ marginTop: '1rem' }}
          >
            <Button
              disabled={useMutationResult.isLoading}
              variant="contained"
              type="submit"
            >
              Create webhook
            </Button>
          </Stack>
        </Box>
      </Paper>
    </Container>
  );
}
