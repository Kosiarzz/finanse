import { create } from 'zustand';
import { registerUser } from '../api/auth/auth';

const registerStore = create((set) => ({
  form: {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    termsAccepted: false
  },
  errors: {},
  isSubmitting: false,
  setForm: (field, value) => set((state) => ({
    form: { ...state.form, [field]: value }
  })),
  setErrors: (errors) => set({ errors }),
  setIsSubmitting: (isSubmitting) => set({ isSubmitting }),
  submit: async () => {
    set({ isSubmitting: true });
    try {
      const response = await registerUser(registerStore.getState().form);
      console.log('Register successful', response);
      // Handle successful login like redirect or token storage
      console.log("REGISETER ERROR:"+JSON.stringify(response.data, null, 2));
      set({ errors: {} });
    } catch (error) {
      console.error('Register failed', error);
      if (error.response && error.response.data.errors) {
        set({ errors: error.response.data.errors });
        console.log("REGISETER ERROR:"+JSON.stringify(error.response.data.errors, null, 2));
      }
    } finally {
      set({ isSubmitting: false });
    }
  }
}));

export default registerStore;
