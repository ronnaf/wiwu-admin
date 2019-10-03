import React from 'react'
import { Formik } from 'formik'
import { departments } from '../../constants/User'
import { Form, Button } from 'antd'
import * as PropTypes from 'prop-types'

import GenericInput from '../GenericInput'
import GenericSelect from '../GenericSelect'

const { FIREMEN, MEDICAL, POLICE } = departments

const ResponderForm = ({ onSubmitHandler, initialValues, schema }) => {
  return (
    <div style={styles.formWrapper}>
      <Formik
        initialValues={initialValues}
        validationSchema={schema}
        onSubmit={async (values, formikBag) => {
          onSubmitHandler(values, formikBag)
        }}>
        {({
          values,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          setFieldValue,
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
                label='First Name'
                name='firstName'
                placeholder='e.g. - Juan'
                values={values}
                errors={errors}
                touched={touched}
                isSubmitting={isSubmitting}
                handleChange={handleChange}
                handleBlur={handleBlur}
              />
              <GenericInput
                required
                label='Last Name'
                name='lastName'
                placeholder='e.g. - Dela Cruz'
                values={values}
                errors={errors}
                touched={touched}
                isSubmitting={isSubmitting}
                handleChange={handleChange}
                handleBlur={handleBlur}
              />
              <GenericInput
                required
                label='Phone Number'
                name='phoneNumber'
                placeholder='e.g. - 09123456789'
                values={values}
                errors={errors}
                touched={touched}
                isSubmitting={isSubmitting}
                handleChange={handleChange}
                handleBlur={handleBlur}
              />
              <GenericSelect
                required
                label='Department'
                name='department'
                options={[
                  { value: MEDICAL, text: MEDICAL },
                  { value: POLICE, text: POLICE },
                  { value: FIREMEN, text: FIREMEN }
                ]}
                values={values}
                errors={errors}
                touched={touched}
                isSubmitting={isSubmitting}
                handleBlur={handleBlur}
                setFieldValue={setFieldValue}
              />
              {initialValues.emailAddress !== undefined && (
                <GenericInput
                  required
                  label='Email Address'
                  name='emailAddress'
                  placeholder='e.g. - juan.delacruz@gmail.com'
                  values={values}
                  errors={errors}
                  touched={touched}
                  isSubmitting={isSubmitting}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                />
              )}
              {initialValues.emailAddress !== undefined && (
                <GenericInput
                  required
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
              )}
              <Form.Item style={styles.buttonWrapper}>
                <Button
                  type='primary'
                  htmlType='submit'
                  shape='round'
                  style={styles.button}
                  disabled={!dirty}
                  loading={isSubmitting}>
                  Submit Details
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
  button: {
    width: '150px',
    marginTop: '15px'
  },
  form: {
    textAlign: 'left',
    width: '500px'
  },
  buttonWrapper: {
    textAlign: 'center',
    margin: '0px'
  },
  formWrapper: {
    display: 'flex',
    justifyContent: 'center'
  }
}

ResponderForm.propTypes = {
  onSubmitHandler: PropTypes.func.isRequired,
  initialValues: PropTypes.object,
  schema: PropTypes.object.isRequired
}

export default ResponderForm
