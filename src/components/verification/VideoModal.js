import React from 'react'
import { useDispatch } from 'react-redux'
import { Button, Modal, Spin, Descriptions } from 'antd'
import * as PropTypes from 'prop-types'
import { verifyUser } from '../../actions/user/verifyUser.action'
import { changeUserStatus } from '../../actions/user/changeUserStatus.action'
import { statuses } from '../../constants/User'

const VideoModal = ({
  record,
  isModalVisible,
  localMediaAvailable,
  localMedia,
  remoteMedia,
  leaveRoom,
  remoteMediaAvailable
}) => {
  const dispatch = useDispatch()

  const showLocalTrack = localMediaAvailable ? (
    <div ref={localMedia} />
  ) : (
    <Spin size='large' tip='...Connecting Local Video...' />
  )

  const showRemoteTrack = remoteMediaAvailable ? (
    <div ref={remoteMedia} />
  ) : (
    <Spin size='large' tip='...Connecting Remote Video...' />
  )

  return (
    <span>
      <Modal
        visible={isModalVisible}
        onOk={e => {
          leaveRoom()
        }}
        onCancel={e => {
          leaveRoom()
        }}
        footer={[
          <Button
            key='submit'
            type='primary'
            onClick={async e => {
              await leaveRoom()
              await dispatch(verifyUser(record.id))
            }}
            disabled={record.joinedVideo}>
            Confirm Verification
          </Button>,
          <Button
            key='submit'
            onClick={async e => {
              leaveRoom()
              await dispatch(changeUserStatus(record.id, statuses.BLOCKED))
            }}
            disabled={record.joinedVideo}>
            Block User
          </Button>,
          <Button
            key='back'
            onClick={e => {
              leaveRoom()
            }}>
            Cancel
          </Button>
        ]}>
        <div style={{ display: 'flex' }}>
          <div style={{ flex: 1, margin: '8px', height: '300px' }}>
            <div>{showLocalTrack}</div>
          </div>
          <div style={{ flex: 1, margin: '8px', height: '300px' }}>
            <div>{showRemoteTrack}</div>
          </div>
        </div>
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

VideoModal.propTypes = {
  record: PropTypes.object.isRequired,
  isModalVisible: PropTypes.bool.isRequired,
  localMediaAvailable: PropTypes.bool.isRequired,
  localMedia: PropTypes.object,
  leaveRoom: PropTypes.func.isRequired,
  remoteMedia: PropTypes.object,
  remoteMediaAvailable: PropTypes.bool.isRequired
}

export default VideoModal
