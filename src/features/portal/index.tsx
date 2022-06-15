import React from 'react';
import {
  Container,
  FormControl,
  IconButton,
  InputAdornment,
  List,
  ListItem,
  ListItemText,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import { useQuery } from 'react-query';
import { getPortalState } from '../../api';
import { Loader } from '../../components';
import { CopyAll } from '@mui/icons-material';

export function Portal() {
  const useQueryResult = useQuery(
    'getPortalState',
    async () => await getPortalState('TWDJ1')
  );

  if (!useQueryResult.data) {
    return <Loader></Loader>;
  }

  return (
    <Container maxWidth="sm">
      <Paper sx={{ padding: '2rem' }}>
        <Typography component="div" gutterBottom variant="h4">
          iKhokha Referral Program
        </Typography>
        <Typography component="div" gutterBottom variant="h6">
          Refer a friend. Get paid!
        </Typography>
        <Typography component="div" gutterBottom variant="subtitle1">
          Know more entrepreneurs? Use the share buttons on-screen to invite
          them to iKhokha with your unique referral link where they&apos;ll get
          a discount on their purchase. We&apos;ll give you R 500 for everyone
          that signs up, buys a card machine via your link and transacts over R
          1 000!
        </Typography>

        <FormControl fullWidth sx={{ marginY: '1rem' }}>
          <TextField
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton>
                    <CopyAll />
                  </IconButton>
                </InputAdornment>
              ),
              startAdornment: (
                <InputAdornment position="start">
                  https://refer.ikhokha.com/
                </InputAdornment>
              ),
            }}
            label="Referral Link"
            variant="filled"
            value={useQueryResult.data.campaign?.code}
          />
        </FormControl>

        <Typography component="div" gutterBottom variant="subtitle1">
          You have referred {useQueryResult.data.count} people
        </Typography>

        <List>
          {useQueryResult.data.conversions.map((x) => (
            <ListItem alignItems="flex-start" key={x.id}>
              <ListItemText
                primary={`${x.customer?.firstName} ${x.customer?.lastName}`}
                secondary={x.customer?.emailAddress}
              />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Container>
  );
}
