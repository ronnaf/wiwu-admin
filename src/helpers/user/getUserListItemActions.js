import React from 'react'
import { Icon, Tooltip, Popconfirm } from 'antd'

import { changeUserStatus } from '../../actions/user/changeUserStatus.action'
import { statuses } from '../../constants/User'

export const getUserListItemActions = (user, dispatch, setDrawerVisbility) => {
  const activeUserActions = [
    <Icon
      type='info-circle'
      style={{ fontSize: 18 }}
      onClick={() => setDrawerVisbility(true)}
    />,
    <Tooltip placement='left' title='Archive User'>
      <Popconfirm
        placement='top'
        title='Are you sure you want to archive this user?'
        onConfirm={() => dispatch(changeUserStatus(user.id, statuses.ARCHIVED))}
        okText='Yes'
        cancelText='No'>
        <Icon type='history' style={{ fontSize: 18 }} />
      </Popconfirm>
    </Tooltip>,
    <Tooltip placement='left' title='Block User'>
      <Popconfirm
        placement='top'
        title='Are you sure you want to block this user?'
        onConfirm={() => dispatch(changeUserStatus(user.id, statuses.BLOCKED))}
        okText='Yes'
        cancelText='No'>
        <Icon type='stop' style={{ fontSize: 18 }} />
      </Popconfirm>
    </Tooltip>
  ]

  const inactiveUserActions = [
    <Tooltip placement='left' title='Activate User'>
      <Popconfirm
        placement='top'
        title='Are you sure you want to activate this user?'
        onConfirm={() => dispatch(changeUserStatus(user.id, statuses.ACTIVE))}
        okText='Yes'
        cancelText='No'>
        <Icon type='undo' style={{ fontSize: 18 }} />
      </Popconfirm>
    </Tooltip>
  ]

  switch (user.status) {
    case statuses.ACTIVE:
      return activeUserActions
    case statuses.ARCHIVED:
      return inactiveUserActions
    case statuses.BLOCKED:
      return inactiveUserActions
    default:
      return []
  }
}
