import React, { Fragment, useState } from 'react'
import {
  Drawer,
  Typography,
  Avatar,
  Divider,
  Empty,
  List,
  Icon,
  Tag
} from 'antd'
import format from 'date-fns/format'

import Map from '../Map'

import avatarPlaceholder from '../../assets/images/user-avatar.png'

const { Text, Title } = Typography

const EmergencyRequestDetails = ({
  user,
  emergency,
  setSecondDrawerVisibility,
  secondDrawerVisibility
}) => {
  return (
    <Drawer
      title={<b>Emergency Request Details</b>}
      width={500}
      destroyOnClose={true}
      maskClosable={false}
      keyboard={false}
      bodyStyle={{ background: '#f5f5f5', height: '94%' }}
      onClose={() => setSecondDrawerVisibility(false)}
      visible={secondDrawerVisibility}>
      <Title level={3} mark>
        Request for {emergency.department} assistance
      </Title>
      <Tag color={emergency.status === 'PENDING' ? 'red' : 'green'}>
        <b style={{ fontSize: 15 }}>{emergency.status}</b>
      </Tag>
      <br />
      <Text>
        Sent by:{' '}
        <b>
          {user.firstName} {user.lastName}
        </b>
      </Text>
      <br />
      <Text>{format(emergency.date.toDate(), 'MMMMMM d, yyyy - hh:mm a')}</Text>
      <Divider />
      <Text strong>Attached Media:</Text>
      <br />
      {emergency.media ? (
        <img
          src={emergency.media}
          width='100%'
          height='250px'
          style={{ marginTop: 10 }}
        />
      ) : (
        <Empty description='There is no media attached to this request.' />
      )}
      <br />
      <br />
      <Text strong>Emergency Location:</Text>
      <br />
      <Map
        location={emergency.location}
        style={{ width: '100%', height: '250px', marginTop: 10 }}
      />
    </Drawer>
  )
}

const UserProfile = ({ user, drawerVisibility, setDrawerVisibility }) => {
  const [secondDrawerVisibility, setSecondDrawerVisibility] = useState(false)
  const [selectedEmergency, setSelectedEmergency] = useState()
  return (
    <Drawer
      title={<b>User Profile</b>}
      width={500}
      destroyOnClose={true}
      maskClosable={false}
      keyboard={false}
      bodyStyle={{ background: '#f5f5f5', height: '94%' }}
      onClose={() => setDrawerVisibility(false)}
      visible={drawerVisibility}>
      {selectedEmergency && (
        <EmergencyRequestDetails
          user={user}
          emergency={selectedEmergency}
          setSecondDrawerVisibility={setSecondDrawerVisibility}
          secondDrawerVisibility={secondDrawerVisibility}
        />
      )}
      <div style={{ textAlign: 'center' }}>
        <Avatar src={user.avatar || avatarPlaceholder} size={150} />
        <br />
        <Text strong style={{ fontSize: 25 }}>
          {user.firstName} {user.lastName}
        </Text>
        <br />
        <Text strong>{user.phoneNumber}</Text>
      </div>
      <Divider />
      <Text strong>Emergency Requests:</Text>
      <br />
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        {user.emergencies.length > 0 ? (
          <List style={{ width: '100%', overflowY: 'auto' }}>
            {user.emergencies.map(emergency => {
              return (
                <Fragment>
                  <List.Item
                    actions={[
                      <Icon
                        type='right'
                        style={{ fontSize: 18 }}
                        onClick={() => {
                          setSelectedEmergency(emergency)
                          setSecondDrawerVisibility(true)
                        }}
                      />
                    ]}>
                    <List.Item.Meta
                      avatar={
                        <Avatar
                          src={require(`../../assets/images/${emergency.department}.png`)}
                          size={45}
                        />
                      }
                      title={`${user.firstName} requested for ${emergency.department} assistance`}
                      description={
                        <span>
                          {format(
                            emergency.date.toDate(),
                            'MMMMMM d, yyyy - hh:mm a'
                          )}
                        </span>
                      }
                    />
                  </List.Item>
                </Fragment>
              )
            })}
          </List>
        ) : (
          <Empty description='This user has not made any emergency request yet.' />
        )}
      </div>
      <br />
      <Text strong>Home Location:</Text>
      <br />
      <Map
        location={user.homeCoordinates}
        style={{ width: '100%', height: '250px', marginTop: 10 }}
      />
    </Drawer>
  )
}

export default UserProfile
