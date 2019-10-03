import * as yup from 'yup'

const CreateAlertSchema = yup.object().shape({
  message: yup.string().required('Alert message is required')
})

export { CreateAlertSchema }
