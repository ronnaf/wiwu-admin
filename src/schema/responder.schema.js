import * as yup from 'yup'

const CreateResponderSchema = yup.object().shape({
  phoneNumber: yup
    .string()
    .matches(/^(09)[0-9]{9}$/, 'Phone number is not valid')
    .required('Phone number is required'),
  emailAddress: yup
    .string()
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
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  department: yup.string().required('Department is required')
})

const EditResponderSchema = yup.object().shape({
  phoneNumber: yup
    .string()
    .matches(/^(09)[0-9]{9}$/, 'Phone number is not valid')
    .required('Phone number is required'),
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  department: yup.string().required('Department is required')
})

export { CreateResponderSchema, EditResponderSchema }
