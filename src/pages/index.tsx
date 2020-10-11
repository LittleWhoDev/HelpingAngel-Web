import React from 'react';
import Link from 'next/link';
import { Box } from '@material-ui/core';

const Home: React.FC<{}> = () => (
  <Box
    display="flex"
    alignItems="center"
    justifyContent="center"
    flexDirection="column"
  >
    <h1>Helping Angel</h1>
    <Link href="/login">
      <a href="/login">Login</a>
    </Link>
    <Link href="/register">
      <a href="/register">Register</a>
    </Link>
    <Link href="/map">
      <a href="/map">Map</a>
    </Link>
  </Box>
);

export default Home;
