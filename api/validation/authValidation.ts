import * as yup from 'yup';

const passwordRule = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-])/;
const usernameRule = /^[a-zA-Z0-9_.-]*$/;

const emailOrUsernameValidator = yup
  .string()
  .test(
    'email-or-username',
    'Must be a valid email or username',
    function (value) {
      if (!value) {
        return this.createError({
          path: this.path,
          message: 'E-mail or username is required',
        });
      }

      const isEmail = value.includes('@');

      if (isEmail) {
        return (
          yup.string().email().isValidSync(value) ||
          this.createError({
            path: this.path,
            message: 'Must be a valid email',
          })
        );
      }
      return (
        yup
          .string()
          .matches(usernameRule, 'Smth')
          .min(5)
          .max(30)
          .isValidSync(value) ||
        this.createError({
          path: this.path,
          message: 'Must be a valid username',
        })
      );
    },
  );

export const loginFormSchema = yup.object({
  username: yup.string().required(),
  password: yup.string().required(),
});

export type LoginForm = yup.InferType<typeof loginFormSchema>;

export const registerFormSchema = yup.object({
  username: yup
    .string()
    .required('Username is required')
    .matches(
      usernameRule,
      'Username can only contain letters, numbers, underscores, dots, and hyphens.',
    )
    .min(5)
    .max(30)
    .label('Username'),
  email: yup
    .string()
    .email('E-mail should have valid format')
    .max(255)
    .required('E-mail is required'),
  firstName: yup.string().min(2).max(128).label('First Name'),
  lastName: yup.string().min(2).max(128).label('Last Name'),
  password: yup
    .string()
    .required('Password is required')
    .matches(passwordRule, {
      message:
        'Password should have at least eight characters, at least one uppercase letter, one lowercase letter, one digit, and one special character',
    })
    .min(8)
    .max(255),
  confirmPassword: yup
    .string()
    .required('Repeat your password')
    .oneOf([yup.ref('password')], 'Passwords must match'),
  termsAccepted: yup.boolean().required(),
  newsletterAccepted: yup.boolean(),
});

export type RegisterForm = yup.InferType<typeof registerFormSchema>;

export const verifyCodeSchema = yup.object({
  code: yup.string().length(6, 'All code values must be provided').required(),
});

export type VerifyForm = yup.InferType<typeof verifyCodeSchema>;

export const forgotPasswordSchema = yup.object({
  emailOrUsername: emailOrUsernameValidator
    .required()
    .label('Email or username'),
});

export type ForgotPasswordForm = yup.InferType<typeof forgotPasswordSchema>;

export const resetPasswordSchema = yup.object({
  password: yup
    .string()
    .required('Password is required')
    .matches(passwordRule, {
      message:
        'Password should have at least eight characters, at least one uppercase letter, one lowercase letter, one digit, and one special character',
    })
    .min(8)
    .max(255),
  confirmPassword: yup
    .string()
    .required('Repeat your password')
    .oneOf([yup.ref('password')], 'Passwords must match'),
});

export type ResetPasswordForm = yup.InferType<typeof resetPasswordSchema>;
