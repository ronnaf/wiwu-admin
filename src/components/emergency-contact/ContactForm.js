import React from 'react'
import { Formik, FieldArray } from 'formik'
import { Form, Input, Button } from 'antd'
import * as PropTypes from 'prop-types'

import AddressSearchInput from './AddressSearchInput'
import GenericInput from '../GenericInput'
import GenericSelect from '../GenericSelect'
import GenericTextArea from '../GenericTextArea'

import { ContactSchema } from '../../schema/contact.schema'

const ContactForm = ({ onSubmitHandler, initialValues }) => {
  return (
    <div style={styles.formWrapper}>
      <Formik
        initialValues={initialValues}
        validationSchema={ContactSchema}
        onSubmit={(values, formikBag) => {
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
                label='Name'
                name='name'
                placeholder='e.g. - Iloilo Mission Hospital'
                values={values}
                errors={errors}
                touched={touched}
                isSubmitting={isSubmitting}
                handleChange={handleChange}
                handleBlur={handleBlur}
              />
              <AddressSearchInput
                values={values}
                errors={errors}
                touched={touched}
                handleBlur={handleBlur}
                setFieldValue={setFieldValue}
                isSubmitting={isSubmitting}
              />
              <GenericSelect
                required
                label='Department'
                name='department'
                options={[
                  { value: 'medical', text: 'Medical' },
                  { value: 'police', text: 'Police' },
                  { value: 'fire', text: 'Fire' }
                ]}
                values={values}
                errors={errors}
                touched={touched}
                isSubmitting={isSubmitting}
                handleBlur={handleBlur}
                setFieldValue={setFieldValue}
              />
              <GenericTextArea
                label='Notes (Optional)'
                name='notes'
                rows={2}
                values={values}
                errors={errors}
                touched={touched}
                isSubmitting={isSubmitting}
                handleBlur={handleBlur}
                handleChange={handleChange}
              />
              <Form.Item
                label='Phone Number(s)'
                required
                help={
                  errors.numbers &&
                  touched.numbers &&
                  typeof errors.numbers === 'string'
                    ? errors.numbers
                    : ''
                }
                validateStatus={
                  errors.numbers &&
                  touched.numbers &&
                  typeof errors.numbers === 'string'
                    ? 'error'
                    : ''
                }
                style={styles.input}>
                <FieldArray
                  name='numbers'
                  render={arrayHelpers => (
                    <div>
                      {values.numbers.map((number, index) => (
                        <div
                          key={index}
                          style={{
                            width: '100%',
                            display: 'flex',
                            marginBottom: '2px'
                          }}>
                          <Form.Item
                            style={{
                              width: '100%',
                              margin: '0px'
                            }}
                            help={
                              errors.numbers &&
                              touched.numbers &&
                              touched.numbers[index] &&
                              errors.numbers[index]
                                ? errors.numbers[index]
                                : ''
                            }
                            validateStatus={
                              errors.numbers &&
                              touched.numbers &&
                              touched.numbers[index] &&
                              errors.numbers[index]
                                ? 'error'
                                : ''
                            }
                            hasFeedback>
                            <Input
                              name={`numbers.${index}`}
                              style={styles.input}
                              placeholder='e.g. - 333-8484 or 09123456789'
                              disabled={isSubmitting}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={number}
                            />
                          </Form.Item>
                          <Button
                            shape='circle'
                            type='dashed'
                            icon='close'
                            disabled={isSubmitting}
                            style={{ float: 'right', marginLeft: '10px' }}
                            onClick={() => arrayHelpers.remove(index)}
                          />
                        </div>
                      ))}
                      <Button
                        type='dashed'
                        disabled={isSubmitting}
                        onClick={() => arrayHelpers.push('')}>
                        Add Number
                      </Button>
                    </div>
                  )}
                />
              </Form.Item>
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

ContactForm.propTypes = {
  onSubmitHandler: PropTypes.func.isRequired,
  initialValues: PropTypes.object
}

export default ContactForm
