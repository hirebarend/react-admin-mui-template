import React from 'react';
import { Container, LinearProgress } from '@mui/material';

export function Loader() {
  return (
    <Container maxWidth="xl" sx={{ paddingY: '1rem' }}>
      <LinearProgress />
    </Container>
  );
}
