import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Button, Modal, Descriptions, Empty } from 'antd'
import * as PropTypes from 'prop-types'
import { verifyUser } from '../../actions/user/verifyUser.action'
import { changeUserStatus } from '../../actions/user/changeUserStatus.action'
import { statuses } from '../../constants/User'

const IdModal = ({ record, isIdModalVisible, toggleIdModal }) => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const dispatch = useDispatch()
  return (
    <span>
      <Modal
        visible={isIdModalVisible}
        onOk={e => {
          toggleIdModal(false)
        }}
        onCancel={e => {
          toggleIdModal(false)
        }}
        footer={[
          <Button
            key='submit'
            type='primary'
            onClick={async e => {
              setIsSubmitting(true)
              await dispatch(verifyUser(record.id))
              toggleIdModal(false)
            }}
            disabled={!record.idImage || isSubmitting}>
            Confirm Verification
          </Button>,
          <Button
            key='submit'
            onClick={async e => {
              setIsSubmitting(true)
              await dispatch(changeUserStatus(record.id, statuses.BLOCKED))
              toggleIdModal(false)
            }}
            disabled={isSubmitting}>
            Block User
          </Button>,
          <Button
            key='back'
            onClick={e => {
              toggleIdModal(false)
            }}>
            Cancel
          </Button>
        ]}>
        {record.idImage ? (
          <div style={{ margin: '16px' }}>
            <img
              src={record.idImage}
              alt='ID'
              style={{
                width: '300px',
                height: '300px',
                left: '40%'
              }}
            />
          </div>
        ) : (
          <Empty />
        )}
        <Descriptions title='User Info' bordered size='small' layout='vertical'>
          <Descriptions.Item label='First Name'>
            {record.firstName}
          </Descriptions.Item>
          <Descriptions.Item label='Last Name'>
            {record.lastName}
          </Descriptions.Item>
          <Descriptions.Item label='Phone Number'>
            {record.phoneNumber}
          </Descriptions.Item>
        </Descriptions>
      </Modal>
    </span>
  )
}

IdModal.propTypes = {
  record: PropTypes.object.isRequired,
  isIdModalVisible: PropTypes.bool.isRequired,
  toggleIdModal: PropTypes.func.isRequired
}

export default IdModal
