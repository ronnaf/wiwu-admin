import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUsers } from '../../actions/user/getUsers.action'
import { List } from 'antd'

import UserListItem from './UserListItem'
import Spinner from '../Spinner'

const UserList = () => {
  const dispatch = useDispatch()
  const users = useSelector(state => state.admin.users)
  const filteredUsers = useSelector(state => state.admin.filteredUsers)
  const [fetching, setFetchingStatus] = useState(true)

  useEffect(() => {
    async function fetchData() {
      await dispatch(getUsers())
      setFetchingStatus(false)
    }

    fetchData()
  }, [])

  if (fetching) {
    return <Spinner tip='Fetching Users...' height={700} />
  }

  return (
    <div style={styles.listWrapper}>
      <List
        style={styles.list}
        itemLayout='horizontal'
        pagination={{ pageSize: 9, hideOnSinglePage: true, size: 'small' }}
        dataSource={filteredUsers || users}
        renderItem={user => {
          return <UserListItem user={user} />
        }}
      />
    </div>
  )
}

const styles = {
  listWrapper: {
    display: 'flex',
    justifyContent: 'center'
  },
  list: {
    width: '70%',
    textAlign: 'left'
  }
}

export default UserList
