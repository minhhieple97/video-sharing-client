import React from 'react';
import { useFormContainer } from '../../components/form/FormContainer';
import { Form } from '../../components/form/Form';
import { Loading } from '../../components/ui/Loading';

export const AuthForm: React.FC = () => {
  const { formState, handleChange, handleSubmit, error, isLogin, toggleForm, isLoading } =
    useFormContainer({
      email: '',
      password: '',
      confirmPassword: '',
    });
  if (isLoading) return <Loading></Loading>;
  return (
    <div className="max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-5">{isLogin ? 'Login' : 'Register'}</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Field
          type="email"
          name="email"
          label="Email"
          value={formState.email}
          onChange={handleChange}
        />
        <Form.Field
          type="password"
          name="password"
          label="Password"
          value={formState.password}
          onChange={handleChange}
        />
        {!isLogin && (
          <Form.Field
            type="password"
            required
            name="confirmPassword"
            label="Confirm Password"
            value={formState.confirmPassword}
            onChange={handleChange}
          />
        )}
        <Form.SubmitButton text={isLogin ? 'Login' : 'Register'} />
      </Form>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      <p className="mt-4 text-center">
        {isLogin ? "Don't have an account? " : 'Already have an account? '}
        <button onClick={toggleForm} className="text-blue-500 hover:text-blue-700 font-semibold">
          {isLogin ? 'Register' : 'Login'}
        </button>
      </p>
    </div>
  );
};
