import React from 'react'
import { Form, Input } from 'antd'
import * as PropTypes from 'prop-types'

const { Item } = Form

const GenericInput = ({
  name,
  label,
  values,
  errors,
  touched,
  isSubmitting,
  handleChange,
  handleBlur,
  ...rest
}) => {
  return (
    <Item
      label={label}
      help={errors[name] && touched[name] ? errors[name] : ''}
      validateStatus={errors[name] && touched[name] ? 'error' : ''}
      hasFeedback>
      <Input
        {...rest}
        name={name}
        disabled={isSubmitting}
        onChange={handleChange}
        onBlur={handleBlur}
        value={values[name]}
      />
    </Item>
  )
}

GenericInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  values: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  touched: PropTypes.object.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  handleBlur: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired
}

export default GenericInput
