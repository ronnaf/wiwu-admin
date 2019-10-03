import * as yup from 'yup'

/* 
TODO: fix validation schema
*/
const ContactSchema = yup.object().shape({
  name: yup
    .string()
    .trim()
    .required('Name is required'),
  address: yup
    .string()
    .trim()
    .required('Address is required'),
  department: yup
    .string()
    .trim()
    .required('Department is required'),
  numbers: yup
    .array()
    .min(1, 'Atleast one phone number is required')
    .of(
      yup
        .string()
        .trim()
        .required('Empty phone number is not allowed.')
        .matches(
          /^(09)[0-9]{9}$|^[0-9]{3}-[0-9]{4}$/,
          'Phone number is not valid'
        )
    )
})

export { ContactSchema }
