import React, { useState } from 'react'
import { Input, Radio } from 'antd'
import { useDispatch, useSelector } from 'react-redux'

import { searchUsers } from '../../actions/user/searchUsers.action'
import { filterUsers } from '../../actions/user/filterUsers.action'

const { Search } = Input

const UserListHeader = () => {
  const dispatch = useDispatch()
  const users = useSelector(state => state.admin.users)
  const [radioValue, setRadioValue] = useState('all')

  return (
    <div style={styles.wrapper}>
      <Search
        placeholder='Search users...'
        onSearch={value => dispatch(searchUsers(users, value))}
        style={{ width: 300 }}
      />
      <Radio.Group
        value={radioValue}
        buttonStyle='solid'
        onChange={e => {
          setRadioValue(e.target.value)
          dispatch(filterUsers(users, e.target.value))
        }}>
        <Radio.Button value='all'>
          <strong>All</strong>
        </Radio.Button>
        <Radio.Button value='active'>
          <strong>Active</strong>
        </Radio.Button>
        <Radio.Button value='blocked'>
          <strong>Blocked</strong>
        </Radio.Button>
        <Radio.Button value='archived'>
          <strong>Archived</strong>
        </Radio.Button>
      </Radio.Group>
    </div>
  )
}

const styles = {
  wrapper: {
    width: '70%',
    marginLeft: '15%',
    marginTop: 40,
    marginBottom: 20,
    display: 'flex',
    justifyContent: 'space-between'
  }
}

export default UserListHeader
