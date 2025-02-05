import { create } from 'zustand';

interface LoginFormState {
  id: BigInt;
  username: string;
  password: string;
  email: string;
  accessToken: string;
  setField: (field: string, value: string) => void;
}

const initialValues = {
  id: '',
  username: '',
  password: '',
  email: '',
  accessToken: '',
}

const useAuthStore = create((set) => ({
  isLoggedIn: false,
  values: initialValues,
  setValues: (userData: any) => set({
    values: { ...initialValues, ...userData }
  }),
  clear: () => set({values: initialValues}),
  setIsLoggedIn: (isLoggedIn: boolean) => set({ isLoggedIn }),
}));

export default useAuthStore;