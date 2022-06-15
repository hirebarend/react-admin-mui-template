import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Container, Grid, Typography } from '@mui/material';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export function Home() {
  const labels = ['6 am', '8 am', '10 am', '12 pm', '2 pm', '4 pm', '6 pm'];

  const data = {
    labels,
    datasets: [
      {
        backgroundColor: '#a170e0',
        data: [15, 10, 18, 22, 13, 18, 15],
        label: '',
      },
    ],
  };

  return (
    <Container>
      <Typography component="div" gutterBottom variant="h4">
        Dashboard
      </Typography>
      <Typography component="div" gutterBottom variant="subtitle1">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </Typography>

      <Grid container spacing={2}>
        <Grid item md={6} sm={12} xs={12}>
          <Bar
            data={data}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: 'top' as const,
                },
                title: {
                  display: true,
                  text: 'Referrers',
                },
              },
            }}
          />
        </Grid>
        <Grid item md={6} sm={12} xs={12}>
          <Bar
            data={data}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: 'top' as const,
                },
                title: {
                  display: true,
                  text: 'Conversions',
                },
              },
            }}
          />
        </Grid>
      </Grid>
    </Container>
  );
}
