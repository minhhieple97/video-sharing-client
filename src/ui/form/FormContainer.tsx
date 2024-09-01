import { useState } from 'react';
import { useLoading } from '../../hooks/useLoading';
import { loginUser, registerUser } from '../../services/api';
import { useAuth } from '../../hooks/useAuth';
import { saveUserToStorage } from '../../utils';

interface FormState {
  [key: string]: string;
}

export const useFormContainer = (initialState: FormState) => {
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [formState, setFormState] = useState<FormState>(initialState);
  const [error, setError] = useState<string | null>(null);
  const { setIsLoading } = useLoading();
  const { setUser } = useAuth();
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const user = await loginUser(email, password);
      setUser(user);
      saveUserToStorage(user);
    } catch (err) {
      setError('Login failed. Please check your credentials.');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const user = await registerUser(email, password);
      setUser(user);
      saveUserToStorage(user);
    } catch (err) {
      setError('Registration failed. Please try again.');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isRegistration = !isLogin;
    if (isRegistration) {
      if (formState.password !== formState.confirmPassword) {
        setError('Passwords do not match');
        return;
      }
      await register(formState.email, formState.password);
      return;
    }
    await login(formState.email, formState.password);
  };
  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return { formState, handleChange, handleSubmit, error, isLogin, toggleForm };
};
