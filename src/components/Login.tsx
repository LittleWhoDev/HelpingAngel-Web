import { login } from '@/api/login';
import { LoginDTO } from '@/dtos/login';
import { storeItem } from '@/state/persistent';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

const Login: React.FC<{}> = () => {
  const [error, setError] = useState(undefined as undefined | string);
  const { register, handleSubmit } = useForm<LoginDTO>();
  const onSubmit = handleSubmit(async (formData) => {
    try {
      const resp = await login(formData);
      storeItem('token', resp.data.token);
    } catch (_) {
      setError('Could not login');
    }
  });

  return (
    <>
      {error !== undefined ? error : null}
      <form onSubmit={onSubmit}>
        Username: <input ref={register} name="username" />
        Password: <input ref={register} name="password" type="password" />
        <button type="submit">Login</button>
      </form>
    </>
  );
};
export default Login;
