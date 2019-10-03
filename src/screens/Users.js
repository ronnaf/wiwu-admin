import React from 'react'
import { Layout } from 'antd'

import UserList from '../components/user/UserList'
import UserListHeader from '../components/user/UserListHeader'
import { Helmet } from 'react-helmet'

const Users = () => {
  return (
    <Layout.Content style={styles.content}>
      <Helmet>
        <title>Users - wiwu admin</title>
      </Helmet>

      <UserListHeader />
      <UserList />
    </Layout.Content>
  )
}

const styles = {
  content: {
    height: '100%',
    overflowY: 'auto'
  }
}

export default Users
