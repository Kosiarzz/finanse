import * as yup from 'yup';

const passwordRule = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-])/;
const nameRule = /^[a-zA-Z0-9_.-]*$/;

export const transactionFormSchema = yup.object({
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
  amount: yup
    .number()
    .min(-9999999)
    .max(9999999)
    .required('Amount is required'),
  is_expenditure: yup
    .boolean(),
  account_id: yup
    .number()
    .min(1)
    .required('Account is required')
});

export type TransactionForm = yup.InferType<typeof transactionFormSchema>;
