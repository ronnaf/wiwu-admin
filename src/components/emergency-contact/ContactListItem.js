import React, { Fragment } from 'react'
import { useDispatch } from 'react-redux'
import {
  List,
  Avatar,
  Icon,
  Popconfirm,
  Tooltip,
  Modal,
  Typography
} from 'antd'

import Map from '../Map'

import { deleteContact } from '../../actions/contact/deleteContact.action'
import { setSelectedContact } from '../../actions/contact/setSelectedContact.action'
import { toggleEditModal } from '../../actions/contact/toggleEditModal.action'

const { Text } = Typography

const ContactListItem = ({ contact }) => {
  const dispatch = useDispatch()

  return (
    <List.Item
      actions={[
        <Tooltip placement='left' title='Edit Contact'>
          <Icon
            type='edit'
            style={{ fontSize: 18 }}
            onClick={() => {
              dispatch(setSelectedContact(contact))
              dispatch(toggleEditModal())
            }}
          />
        </Tooltip>,
        <Tooltip placement='left' title='Delete Contact'>
          <Popconfirm
            placement='top'
            title='Are you sure you want to delete this contact?'
            onConfirm={() => dispatch(deleteContact(contact.id))}
            okText='Yes'
            cancelText='No'>
            <Icon type='delete' style={{ fontSize: 18 }} />
          </Popconfirm>
        </Tooltip>,
        <Tooltip placement='left' title='Show Location'>
          <Icon
            type='environment'
            style={{ fontSize: 18 }}
            onClick={() => {
              Modal.info({
                title: (
                  <div>
                    <Text strong>{contact.name}</Text>
                    <br />
                    <Text type='secondary'>{contact.address}</Text>
                  </div>
                ),
                width: 660,
                icon: null,
                keyboard: false,
                maskClosable: false,
                okText: 'Close',
                okType: 'danger',
                content: (
                  <Map location={contact.location} label={contact.name} />
                )
              })
            }}
          />
        </Tooltip>
      ]}>
      <List.Item.Meta
        avatar={
          <Avatar
            src={require(`../../assets/images/${contact.department}.png`)}
            size={45}
          />
        }
        title={<b>{contact.name}</b>}
        description={
          <Fragment>
            <span>{contact.address}</span>
            <br />
            <Text copyable>{contact.numbers.join(', ')}</Text>
          </Fragment>
        }
      />
    </List.Item>
  )
}

export default ContactListItem
