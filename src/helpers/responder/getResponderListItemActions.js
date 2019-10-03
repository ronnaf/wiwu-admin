import React from 'react'
import { Icon, Tooltip, Popconfirm } from 'antd'

import { toggleEditModal } from '../../actions/responder/toggleEditModal.action'
import { setSelectedResponder } from '../../actions/responder/setSelectedResponder.action'
import { changeResponderStatus } from '../../actions/responder/changeResponderStatus.action'
import { statuses } from '../../constants/User'

export const getResponderListItemActions = (responder, dispatch) => {
  const activeResponderActions = [
    <Tooltip placement='left' title='Edit Responder'>
      <Icon
        type='edit'
        style={{ fontSize: 18 }}
        onClick={() => {
          dispatch(setSelectedResponder(responder))
          dispatch(toggleEditModal())
        }}
      />
    </Tooltip>,
    <Tooltip placement='left' title='Archive Responder'>
      <Popconfirm
        placement='top'
        title='Are you sure you want to archive this responder?'
        onConfirm={() =>
          dispatch(changeResponderStatus(responder.id, statuses.ARCHIVED))
        }
        okText='Yes'
        cancelText='No'>
        <Icon type='history' style={{ fontSize: 18 }} />
      </Popconfirm>
    </Tooltip>,
    <Tooltip placement='left' title='Block Responder'>
      <Popconfirm
        placement='top'
        title='Are you sure you want to block this responder?'
        onConfirm={() =>
          dispatch(changeResponderStatus(responder.id, statuses.BLOCKED))
        }
        okText='Yes'
        cancelText='No'>
        <Icon type='stop' style={{ fontSize: 18 }} />
      </Popconfirm>
    </Tooltip>
  ]

  const inactiveResponderActions = [
    <Tooltip placement='left' title='Activate Responder'>
      <Popconfirm
        placement='top'
        title='Are you sure you want to activate this responder?'
        onConfirm={() =>
          dispatch(changeResponderStatus(responder.id, statuses.ACTIVE))
        }
        okText='Yes'
        cancelText='No'>
        <Icon type='undo' style={{ fontSize: 18 }} />
      </Popconfirm>
    </Tooltip>
  ]

  switch (responder.status) {
    case statuses.ACTIVE:
      return activeResponderActions
    case statuses.ARCHIVED:
      return inactiveResponderActions
    case statuses.BLOCKED:
      return inactiveResponderActions
    default:
      return []
  }
}
