import * as yup from 'yup'

const SignUpAdminSchema = yup.object().shape({
  phoneNumber: yup
    .string()
    .trim()
    .matches(/^(09)[0-9]{9}$/, 'Phone number is not valid')
    .required('Phone number is required'),
  emailAddress: yup
    .string()
    .trim()
    .email('Please enter a valid email address')
    .required('Email address is required'),
  password: yup
    .string()
    .required('Password is required')
    .min(
      8,
      'The password you entered is too short. Must be atleast 8 characters'
    )
    .matches(
      /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])(?!.* ).{8,}$/,
      'Password must contain a lowercase letter, an uppercase letter, a number and one of the following characters: !@#$&*'
    ),
  firstName: yup
    .string()
    .trim()
    .required('First name is required'),
  lastName: yup
    .string()
    .trim()
    .required('Last name is required'),
  adminKey: yup
    .string()
    .trim()
    .required('Admin key is required')
})

const EditAdminSchema = yup.object().shape({
  phoneNumber: yup
    .string()
    .trim()
    .matches(/^(09)[0-9]{9}$/, 'Phone number is not valid')
    .required('Phone number is required'),
  emailAddress: yup
    .string()
    .trim()
    .email('Please enter a valid email address')
    .required('Email address is required'),
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required')
})

const SignInAdminSchema = yup.object().shape({
  emailAddress: yup
    .string()
    .trim()
    .email('Please enter a valid email address')
    .required('Email address is required'),
  password: yup.string().required('Password is required')
})

export { SignUpAdminSchema, SignInAdminSchema, EditAdminSchema }
