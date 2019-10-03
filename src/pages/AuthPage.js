import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Card, Row, Col, Tabs } from 'antd'

import SignInTab from '../components/authentication/SignInTab'
import SignUpTab from '../components/authentication/SignUpTab'
import Logo from '../components/Logo'

import { getActiveKey } from '../helpers/common/getActiveKey'

const { TabPane } = Tabs

const AuthScreen = ({ history, location, match }) => {
  const [activeKey, setActiveKey] = useState(getActiveKey(location))

  return (
    <Row style={styles.row} type='flex' justify='center' align='middle'>
      <Col xs={20} sm={12} md={10} lg={8} xl={8} xxl={7}>
        <div style={styles.logoWrapper}>
          <Logo height={120} />
        </div>
        <Card bordered={false} style={styles.card}>
          <Tabs
            activeKey={activeKey}
            onTabClick={key => {
              setActiveKey(key)
              history.push(`${match.url}/${key}`)
            }}
            tabBarStyle={styles.tabBar}
            tabBarGutter={15}>
            <TabPane tab='SIGN IN' key='sign-in'>
              <SignInTab />
            </TabPane>
            <TabPane tab='SIGN UP' key='sign-up'>
              <SignUpTab />
            </TabPane>
          </Tabs>
        </Card>
      </Col>
    </Row>
  )
}

AuthScreen.propTypes = {
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired
}

const styles = {
  logoWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  card: {
    marginTop: -10,
    backgroundColor: '#f5f5f5'
  },
  tabBar: {
    fontWeight: 'bold',
    textAlign: 'left'
  },
  row: {
    height: '100vh'
  }
}

export default AuthScreen
