import React from 'react';
import {
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { DATA } from '../../data';

export function Home() {
  return (
    <Container>
      <Typography component="div" gutterBottom variant="h4">
        Home
      </Typography>
      <Typography component="div" gutterBottom variant="subtitle1">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </Typography>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Email Address</TableCell>
              <TableCell align="right">Full Name</TableCell>
              <TableCell align="right">Gender</TableCell>
              <TableCell align="right">Age</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {DATA.results.map((x, index: number) => (
              <TableRow
                key={index}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {x.email}
                </TableCell>
                <TableCell align="right">{`${x.name.title} ${x.name.first} ${x.name.last}`}</TableCell>
                <TableCell align="right">{x.gender}</TableCell>
                <TableCell align="right">{x.dob.age}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
