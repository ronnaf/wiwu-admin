import React from 'react'
import { Form, Select } from 'antd'
import * as PropTypes from 'prop-types'

const { Item } = Form
const { Option } = Select

const GenericSelect = ({
  name,
  label,
  options,
  values,
  errors,
  touched,
  isSubmitting,
  handleBlur,
  setFieldValue,
  ...rest
}) => {
  return (
    <Item
      label={label}
      help={errors[name] && touched[name] ? errors[name] : ''}
      validateStatus={errors[name] && touched[name] ? 'error' : ''}>
      <Select
        {...rest}
        name={name}
        disabled={isSubmitting}
        onBlur={handleBlur}
        onChange={value => setFieldValue(name, value)}
        value={values[name]}>
        {options.map(({ value, text }, index) => (
          <Option value={value} key={index}>
            {text}
          </Option>
        ))}
      </Select>
    </Item>
  )
}

GenericSelect.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
  values: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  touched: PropTypes.object.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  handleBlur: PropTypes.func.isRequired,
  setFieldValue: PropTypes.func.isRequired
}

export default GenericSelect
