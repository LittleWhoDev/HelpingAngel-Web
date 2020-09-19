import { RegisterDTO } from '@/dtos/login';
import { register as doRegister } from '@/api/login';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { UserRole } from '@/api/user';

interface Props {
  role: UserRole;
}

const Register: React.FC<Props> = ({ role }) => {
  const [error, setError] = useState(undefined as undefined | string);
  const { register, handleSubmit, watch } = useForm<RegisterDTO>();
  const onSubmit = handleSubmit(async (formData) => {
    try {
      await doRegister(formData);
    } catch (_) {
      setError('Could not register');
    }
  });
  const password = watch('password');
  const confirmPassword = watch('confirmPassword');

  return (
    <>
      {error !== undefined ? error : null}
      <form onSubmit={onSubmit}>
        Username: <input ref={register} name="username" />
        First name: <input ref={register} name="firstName" />
        Last name: <input ref={register} name="lastName" />
        Email: <input ref={register} name="email" type="email" />
        Password: <input ref={register} name="password" type="password" />
        Confirm password:{' '}
        <input
          ref={register({
            validate: () =>
              password === confirmPassword || 'Passwords must match',
          })}
          name="confirmPassword"
          type="password"
        />
        <input
          hidden
          ref={register}
          name="role"
          type="number"
          value={role}
          readOnly
        />
        <button type="submit">Register</button>
      </form>
    </>
  );
};
export default Register;
