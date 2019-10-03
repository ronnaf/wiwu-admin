import React from 'react'
import { Button, Form } from 'antd'
import { Formik } from 'formik'
import { Helmet } from 'react-helmet'
import { useDispatch } from 'react-redux'

import GenericInput from '../GenericInput'

import { signIn } from '../../actions/admin/signIn.action'

import { SignInAdminSchema } from '../../schema/admin.schema'

const initialValues = {
  emailAddress: '',
  password: ''
}

const SignInTab = () => {
  const dispatch = useDispatch()

  return (
    <div style={{ marginTop: '16px' }}>
      <Helmet>
        <title>Sign in - wiwu admin</title>
      </Helmet>

      <Formik
        initialValues={initialValues}
        validationSchema={SignInAdminSchema}
        onSubmit={async (values, { setSubmitting }) => {
          await dispatch(signIn(values))
          setSubmitting(false)
        }}>
        {({
          values,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          errors,
          dirty,
          touched
        }) => (
          <Form
            onSubmit={handleSubmit}
            layout='vertical'
            autoComplete='off'
            hideRequiredMark
            style={styles.form}>
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
            <Form.Item style={styles.buttonWrapper}>
              <Button
                block
                size='large'
                type='primary'
                htmlType='submit'
                disabled={!dirty}
                loading={isSubmitting}>
                SIGN IN
              </Button>
            </Form.Item>
          </Form>
        )}
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

export default SignInTab
