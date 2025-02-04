import { create } from 'zustand';

interface LoginFormState {
  username: string;
  password: string;
  errors: {
    username?: string;
    password?: string;
  };
  setField: (field: string, value: string) => void;
  setErrors: (errors: LoginFormState['errors']) => void;
}

const initialValues = {
 username: '',
 password: '',
}

const useAuthStore = create<LoginFormState>((set) => ({
  errors: {},
  values: initialValues,
  setField: (field, value) => set(state => ({ ...state, [field]: value })),
  setErrors: (errors) => set({ errors }),
  clear: () => set({values: initialValues})
}));

export default useAuthStore;