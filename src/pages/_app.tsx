import { withAuthenticatedRequests } from '@/hooks/auth';
import React from 'react';

interface Props {
  Component: React.ComponentType;
  pageProps: any;
}

const App: React.FC<Props> = ({ Component, pageProps }) => (
  <Component {...pageProps} />
);

export default withAuthenticatedRequests(App);
