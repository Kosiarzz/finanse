import * as yup from 'yup';

const passwordRule = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-])/;
const nameRule = /^[a-zA-Z0-9_.-\s]*$/;

export const accountFormSchema = yup.object({
  name: yup
    .string()
    .required('Name is required')
    .matches(
      nameRule,
      'Name can only contain letters, numbers, underscores, dots, and hyphens.',
    )
    .min(3)
    .max(50)
    .label('Name'),
  saldo: yup
    .number()
    .min(-9999999)
    .max(9999999)
});

export type AccountForm = yup.InferType<typeof accountFormSchema>;