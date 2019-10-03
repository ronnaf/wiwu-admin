import React from 'react'
import PropTypes from 'prop-types'

const Logo = ({ height }) => (
  <img
    style={{ height: height }}
    alt='logo'
    src={require('../assets/images/wiwu-logo.png')}
  />
)

Logo.propTypes = {
  height: PropTypes.number.isRequired
}

export default Logo
