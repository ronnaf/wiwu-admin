import React, { Fragment, useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { List, Avatar, Badge, Tag } from 'antd'

import UserProfile from './UserProfile'

import { getUserListItemActions } from '../../helpers/user/getUserListItemActions'
import { getTagColor } from '../../helpers/common/getTagColor'
import avatarPlaceholder from '../../assets/images/user-avatar.png'

const UserListItem = ({ user }) => {
  const dispatch = useDispatch()
  const [drawerVisibility, setDrawerVisibility] = useState(false)
  const actions = getUserListItemActions(user, dispatch, setDrawerVisibility)
  const color = getTagColor(user.status)
  return (
    <Fragment>
      <UserProfile
        user={user}
        drawerVisibility={drawerVisibility}
        setDrawerVisibility={setDrawerVisibility}
      />
      <List.Item actions={actions}>
        <List.Item.Meta
          avatar={
            <Badge
              count={
                user.isUserVerified ? (
                  <img
                    src='https://img.icons8.com/color/96/000000/verified-account.png'
                    height={25}
                    width={25}
                  />
                ) : (
                  0
                )
              }>
              <Avatar
                src={user.avatar || avatarPlaceholder}
                size={45}
                shape='square'
              />
            </Badge>
          }
          title={
            <b>
              {user.firstName} {user.lastName} |{' '}
              <Tag color={color}>{user.status.toUpperCase()}</Tag>
            </b>
          }
          description={
            <Fragment>
              <span>{user.phoneNumber}</span>
            </Fragment>
          }
        />
      </List.Item>
    </Fragment>
  )
}

UserListItem.propTypes = {
  user: PropTypes.object.isRequired
}

export default UserListItem
