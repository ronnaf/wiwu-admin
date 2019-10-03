import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { List, Avatar, Tag } from 'antd'

import { getTagColor } from '../../helpers/common/getTagColor'
import { getResponderListItemActions } from '../../helpers/responder/getResponderListItemActions'

const ResponderListItem = ({ responder }) => {
  const dispatch = useDispatch()
  const color = getTagColor(responder.status)
  const actions = getResponderListItemActions(responder, dispatch)
  return (
    <List.Item actions={actions}>
      <List.Item.Meta
        avatar={
          <Avatar
            src={require('../../assets/images/user-avatar.png')}
            size={45}
          />
        }
        title={
          <b>
            {responder.firstName} {responder.lastName} |{' '}
            <Tag color={color}>{responder.status.toUpperCase()}</Tag>
          </b>
        }
        description={
          <Fragment>
            <span>{responder.department}</span>
            <br />
            <span>{responder.phoneNumber}</span>
          </Fragment>
        }
      />
    </List.Item>
  )
}

ResponderListItem.propTypes = {
  responder: PropTypes.object.isRequired
}

export default ResponderListItem
