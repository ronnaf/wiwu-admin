import React from 'react'
import { Formik } from 'formik'
import { useDispatch } from 'react-redux'
import { Button, Form } from 'antd'

import GenericInput from '../GenericInput'

import { roles } from '../../constants/User'

import { SignUpAdminSchema } from '../../schema/admin.schema'

import { signUp } from '../../actions/admin/signUp.action'
import { Helmet } from 'react-helmet'

const initialValues = {
  emailAddress: '',
  password: '',
  firstName: '',
  lastName: '',
  phoneNumber: '',
  adminKey: ''
}

const SignUpTab = () => {
  const dispatch = useDispatch()

  return (
    <div style={{ marginTop: '16px' }}>
      <Helmet>
        <title>Sign up - wiwu admin</title>
      </Helmet>

      <Formik
        initialValues={initialValues}
        validationSchema={SignUpAdminSchema}
        onSubmit={async (values, { setSubmitting }) => {
          await dispatch(signUp({ ...values, role: roles.ADMIN }))
          setSubmitting(false)
        }}>
        {({
          values,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          errors,
          touched,
          dirty
        }) => {
          return (
            <Form
              onSubmit={handleSubmit}
              layout='vertical'
              autoComplete='off'
              hideRequiredMark
              style={styles.form}>
              <GenericInput
                required
                size='large'
                label='First Name'
                name='firstName'
                values={values}
                errors={errors}
                touched={touched}
                isSubmitting={isSubmitting}
                handleChange={handleChange}
                handleBlur={handleBlur}
              />
              <GenericInput
                required
                size='large'
                label='Last Name'
                name='lastName'
                values={values}
                errors={errors}
                touched={touched}
                isSubmitting={isSubmitting}
                handleChange={handleChange}
                handleBlur={handleBlur}
              />
              <GenericInput
                required
                size='large'
                label='Email Address'
                name='emailAddress'
                values={values}
                errors={errors}
                touched={touched}
                isSubmitting={isSubmitting}
                handleChange={handleChange}
                handleBlur={handleBlur}
              />
              <GenericInput
                required
                size='large'
                type='password'
                label='Password'
                name='password'
                values={values}
                errors={errors}
                touched={touched}
                isSubmitting={isSubmitting}
                handleChange={handleChange}
                handleBlur={handleBlur}
              />
              <GenericInput
                required
                size='large'
                label='Phone Number'
                name='phoneNumber'
                values={values}
                errors={errors}
                touched={touched}
                isSubmitting={isSubmitting}
                handleChange={handleChange}
                handleBlur={handleBlur}
              />
              <GenericInput
                required
                size='large'
                label='Admin Key'
                name='adminKey'
                values={values}
                errors={errors}
                touched={touched}
                isSubmitting={isSubmitting}
                handleChange={handleChange}
                handleBlur={handleBlur}
              />
              <Form.Item style={styles.buttonWrapper}>
                <Button
                  block
                  size={'large'}
                  type='primary'
                  htmlType='submit'
                  disabled={!dirty}
                  loading={isSubmitting}>
                  SIGN UP
                </Button>
              </Form.Item>
            </Form>
          )
        }}
      </Formik>
    </div>
  )
}

const styles = {
  form: {
    textAlign: 'left'
  },
  buttonWrapper: {
    textAlign: 'center',
    marginTop: '32px'
  }
}

export default SignUpTab
