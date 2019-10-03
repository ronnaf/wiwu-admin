import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Layout, Menu, Icon } from 'antd'
import { useDispatch, useSelector } from 'react-redux'

import { signOut } from '../actions/admin/signOut.action'
import { roles } from '../constants/User'

import Logo from './Logo'

const adminMenuItems = [
  {
    key: 'emergency-responders',
    icon: 'safety',
    title: 'Emergency Responders'
  },
  { key: 'emergency-contacts', icon: 'phone', title: 'Emergency Contacts' },
  { key: 'emergency-alerts', icon: 'alert', title: 'Emergency Alerts' },
  {
    key: 'user-verification',
    icon: 'check-circle',
    title: 'User Verification'
  },
  { key: 'users', icon: 'team', title: 'Users' },
  { key: 'settings', icon: 'user', title: 'Settings' }
]

const responderMenuItems = [
  { key: 'emergency-contacts', icon: 'phone', title: 'Emergency Contacts' },
  { key: 'emergency-requests', icon: 'alert', title: 'Emergency Requests' },
  {
    key: 'emergency-requests-v2',
    icon: 'alert',
    title: 'Emergency Requests v2'
  },
  { key: 'settings', icon: 'user', title: 'Settings' }
]

const Sidebar = ({ history, match, activeKey }) => {
  const dispatch = useDispatch()
  const { role } = useSelector(state => state.admin.current)
  const menuItems = role === roles.ADMIN ? adminMenuItems : responderMenuItems
  const [collapsed, toggleCollapse] = useState(false)
  const [selectedKeys, setSelectedKeys] = useState(activeKey)

  return (
    <Layout.Sider
      collapsible
      width={220}
      collapsed={collapsed}
      onCollapse={() => toggleCollapse(!collapsed)}>
      <div style={styles.logoWrapper}>
        <Logo height={70} />
      </div>
      <Menu
        theme='dark'
        mode='inline'
        style={styles.menu}
        selectedKeys={selectedKeys || null}>
        {menuItems.map(({ key, icon, title }) => (
          <Menu.Item
            key={key}
            onClick={() => {
              history.push(`${match.url}/${key}`)
              setSelectedKeys([key])
            }}>
            <Icon type={icon} />
            <span>{title}</span>
          </Menu.Item>
        ))}
        <Menu.Item key='logout' onClick={() => dispatch(signOut())}>
          <Icon type='poweroff' />
          <span>Logout</span>
        </Menu.Item>
      </Menu>
    </Layout.Sider>
  )
}

Sidebar.propTypes = {
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired
}

const styles = {
  logoWrapper: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    margin: '25px 0px 15px 0px'
  },
  menu: {
    textAlign: 'left'
  }
}

export default Sidebar
