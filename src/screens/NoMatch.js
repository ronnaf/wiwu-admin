import React from 'react'
import { Result } from 'antd'

const NoMatch = () => {
  return (
    <div style={styles.wrapper}>
      <Result
        status='404'
        title='404: Page not found'
        subTitle='Sorry, the page you visited does not exist.'
      />
    </div>
  )
}

const styles = {
  wrapper: {
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
}

export default NoMatch
