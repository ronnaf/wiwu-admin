import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Table, Button, Divider, Tag, Input } from 'antd'
import { getToken } from '../actions/twilio/getToken.action'
import { getUsers } from '../actions/user/getUsers.action'
import { searchUsers } from '../actions/user/searchUsers.action'
import TwilioVideo from '../components/verification/TwilioVideo'
import IdModal from '../components/verification/IdModal'
import Spinner from '../components/Spinner'
import { Helmet } from 'react-helmet'

const { Search } = Input

const UserVerification = () => {
  const identity = 'Admin'
  const [record, setRecord] = useState({})
  const [fetching, setFetchingStatus] = useState(true)
  const [isIdModalVisible, toggleIdModal] = useState(false)
  const pendingUsers = useSelector(state =>
    state.admin.users.filter(
      user => user.isUserVerified === false && user.status === 'active'
    )
  )
  const filteredUsers = useSelector(state => state.admin.filteredUsers)
  const dispatch = useDispatch()

  useEffect(() => {
    async function fetchData() {
      await dispatch(getUsers())
      setFetchingStatus(false)
    }
    fetchData()
  })

  if (fetching) {
    return <Spinner tip='Fetching pending users...' height={700} />
  }

  const renderActions = (text, record) => (
    <span>
      <Button
        icon='video-camera'
        size='small'
        onClick={() => {
          setRecord(record)
          dispatch(getToken(identity, record.id))
        }}
        disabled={!record.joinedRoom}>
        Join Room
      </Button>
      <Divider type='vertical' />
      <Button
        size='small'
        icon='video-camera'
        onClick={() => {
          setRecord(record)
          toggleIdModal(true)
        }}
        disabled={!record.idImage}>
        View ID
      </Button>
    </span>
  )

  const renderTags = (text, record) => (
    <span>
      <Tag color={record.joinedRoom ? 'green' : 'red'} key={record.joinedRoom}>
        {record.joinedRoom ? 'Available Video' : 'Unavailable Video'}
      </Tag>
      <Tag color={record.idImage ? 'green' : 'red'} key={record.idImage}>
        {record.idImage ? 'Available ID' : 'Unavailable ID'}
      </Tag>
    </span>
  )

  const columns = [
    {
      title: 'First Name',
      dataIndex: 'firstName',
      key: 'firstName'
    },
    {
      title: 'Last Name',
      dataIndex: 'lastName',
      key: 'lastName'
    },
    {
      title: 'Phone Number',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber'
    },
    {
      render: (text, record) => renderTags(text, record)
    },
    {
      render: (text, record) => renderActions(text, record)
    }
  ]

  return (
    <div>
      <Helmet>
        <title>User Verification - wiwu admin</title>
      </Helmet>

      <div style={{ width: '90%', margin: '0 auto' }}>
        <Row>
          <div style={{ float: 'left', marginLeft: '16px', marginTop: '16px' }}>
            <Search
              placeholder='Search users...'
              onSearch={value => dispatch(searchUsers(pendingUsers, value))}
              style={{ width: 300 }}
            />
          </div>
        </Row>
        <Row style={{ margin: '8px' }}>
          <Col span={24}>
            <Table
              dataSource={filteredUsers || pendingUsers}
              columns={columns}
              rowKey='id'
            />
          </Col>
        </Row>
      </div>
      <TwilioVideo record={record} />
      <IdModal
        record={record}
        isIdModalVisible={isIdModalVisible}
        toggleIdModal={toggleIdModal}
      />
    </div>
  )
}

export default UserVerification
