import { FormField } from './FormField';

interface FormProps {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  children: React.ReactNode;
}

export const Form: React.FC<FormProps> & {
  Field: typeof FormField;
  SubmitButton: typeof SubmitButton;
} = ({ onSubmit, children }) => {
  return <form onSubmit={onSubmit}>{children}</form>;
};

const SubmitButton: React.FC<{ text: string }> = ({ text }) => (
  <button
    type="submit"
    className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
  >
    {text}
  </button>
);

Form.Field = FormField;
Form.SubmitButton = SubmitButton;
