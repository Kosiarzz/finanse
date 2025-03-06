import * as yup from 'yup';

const passwordRule = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-])/;
const nameRule = /^[a-zA-Z0-9_.-\s]*$/;

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
    .required('Account is required'),
  date: yup
    .string()
});

export type TransactionForm = yup.InferType<typeof transactionFormSchema>;

export const transactionBillFormSchema = yup.object({
  name: yup
    .string()
    .required('Name is required') //można zmienić później na automatycznego name
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
  shop: yup
    .string()
    .matches(
      nameRule,
      'Shop can only contain letters, numbers, underscores, dots, and hyphens.',
    )
    .min(2)
    .max(50)
    .label('Sklep'),
  city: yup
    .string()
    .matches(
      nameRule,
      'City can only contain letters, numbers, underscores, dots, and hyphens.',
    )
    .min(2)
    .max(80)
    .label('Miasto'),
  photo: yup
    .string()
    .label('Photo'),
  account_id: yup
    .number()
    .min(1)
    .required('Account is required'),
  date: yup
    .string(),
  purchases: yup.array().of(
      yup.object().shape({
        name: yup.string().required("Nazwa produktu jest wymagana"),
        price: yup.string()
          .matches(/^\d+(\.\d{1,2})?$/, "Podaj poprawną cenę")
          .required("Cena jest wymagana"),
        quantity: yup.string()
          .matches(/^\d+$/, "Podaj poprawną ilość")
          .required("Ilość jest wymagana"),
        discount: yup.string(), //.matches(/^\d*$/, "Zniżka powinna być liczbą"
        unit: yup.string().required("Podaj jednostkę"),
        category: yup.string(),
      })
    ),
});

export type transactionBillForm = yup.InferType<typeof transactionBillFormSchema>;
