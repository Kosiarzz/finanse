import { create } from 'zustand';
import { loginUser } from '../api/auth/auth';
import { router } from 'expo-router';
import useUserStore from './userStore';

const useAuthStore = create((set) => ({
  form: {
    username: '',
    password: ''
  },
  errors: {},
  isSubmitting: false,
  isLoggedIn: false,
  setForm: (field, value) => set((state) => ({
    form: { ...state.form, [field]: value }
  })),
  setErrors: (errors) => set({ errors }),
  setIsSubmitting: (isSubmitting) => set({ isSubmitting }),
  setIsLoggedIn: (isLoggedIn) => set({ isLoggedIn }),
  submit: async () => {
    set({ isSubmitting: true });
    try {
      const response = await loginUser(useAuthStore.getState().form);
      console.log('Login successful', response);
      useUserStore.getState().setUser({
        accessToken: response.accessToken,
        id: response.id,
        username: response.username,
        tutorialCompleted: Boolean(response.tutorialCompleted)
      });
      set({ isLoggedIn: true });
      set({ errors: {} });
      router.replace("/home");
    } catch (error) {
      console.error('Login failed', error);
      if (error.response && error.response.data.errors) {
        set({ errors: error.response.data.errors });
      }
    } finally {
      set({ isSubmitting: false });
    }
  }
}));

export default useAuthStore;
