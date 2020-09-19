import { stringToUserRole } from '@/api/user';
import Login from '@/components/Login';
import Register from '@/components/Register';
import Selector from '@/components/Selector';
import useMultiform from '@/hooks/multiform';
import React, { useState } from 'react';

const Home: React.FC<{}> = () => {
  const [role, setRole] = useState('');
  const { step, next, prev } = useMultiform({
    steps: [
      <Selector
        choices={['donor', 'requester']}
        callback={(choice) => {
          setRole(choice);
          next();
        }}
      />,
      <>
        <Login />
        <button
          type="button"
          onClick={() => {
            next();
          }}
        >
          No account? Register
        </button>
      </>,
      <>
        <Register role={stringToUserRole(role)} />
        <button
          type="button"
          onClick={() => {
            prev();
          }}
        >
          Login
        </button>
      </>,
    ],
  });

  return (
    <div>
      {role !== '' ? `you selected ${role}` : null}
      {role === 'donor' ? (
        <button type="button">Anonymous login?</button>
      ) : null}
      {step}
    </div>
  );
};

export default Home;
