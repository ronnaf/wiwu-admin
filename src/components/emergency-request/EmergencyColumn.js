import React from 'react'
import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux'
import {
  Button,
  Card,
  Col,
  Descriptions,
  List,
  PageHeader,
  Modal,
  message
} from 'antd'

import { completeEmergency } from '../../actions/emergency-request/updateEmergency.action'
import { sendNotification } from '../../helpers/emergency-request/sendNotification'

import placeholder from '../../assets/images/placeholder.png'

import Map from '../Map'

const EmergencyColumn = props => {
  const { title } = props

  const dispatch = useDispatch()
  const emergencies = useSelector(state =>
    title === 'COMPLETED' ? state.emergency.completed : state.emergency.pending
  )

  return (
    <Col span={12} style={{ padding: 10, height: '90vh' }}>
      <div
        style={{
          overflow: 'auto',
          height: '100%',
          width: '100%'
        }}>
        <PageHeader title={title} />
        <List
          itemLayout='vertical'
          size='large'
          pagination={{
            simple: 'true',
            pageSize: 2
          }}
          dataSource={emergencies}
          renderItem={item => (
            <Card
              title={item.id}
              key={item.id}
              cover={
                <img
                  width={210}
                  height={250}
                  alt='logo'
                  src={item.media || placeholder}
                />
              }
              extra={
                title === 'COMPLETED'
                  ? [
                      <Button
                        icon='global'
                        key={`${item.id}globalcompleted`}
                        shape='round'
                        onClick={() =>
                          Modal.info({
                            width: 720,
                            title: 'USER LOCATION',
                            content: <Map location={item.location} />
                          })
                        }
                      />
                    ]
                  : [
                      <Button
                        icon='audio'
                        key={`${item.id}broadcastpending`}
                        shape='round'
                        onClick={() =>
                          Modal.confirm({
                            width: 300,
                            centered: true,
                            title: 'CONFIRMATION',
                            content: 'Are you sure you want to broadcast?',
                            okText: 'Confirm',
                            cancelText: 'Cancel',
                            onOk: () => {
                              sendNotification({
                                app_id: '99a5a234-ed7d-48a6-9738-4cf5a7a4fbec',
                                contents: {
                                  en: 'An emergency is near your area!'
                                },
                                android_group: ['All'],
                                filters: [
                                  {
                                    field: 'location',
                                    radius: '1000', // within 1000 meters
                                    lat: item.location.latitude,
                                    long: item.location.longitude
                                  }
                                ]
                              })
                              message.success('Emergency was broadcast', 2)
                            }
                          })
                        }
                      />,
                      <Button
                        icon='global'
                        shape='round'
                        key={`${item.id}globalpending`}
                        onClick={() =>
                          Modal.info({
                            width: 720,
                            title: 'USER LOCATION',
                            content: <Map location={item.location} />
                          })
                        }
                      />,
                      <Button
                        icon='arrow-right'
                        shape='round'
                        key={`${item.id}arrowpending`}
                        onClick={() =>
                          Modal.confirm({
                            width: 300,
                            centered: true,
                            title: 'CONFIRMATION',
                            content: 'Are you sure you want to broadcast?',
                            okText: 'Confirm',
                            cancelText: 'Cancel',
                            onOk: () => {
                              dispatch(completeEmergency(item.id))
                              message.success(
                                'Emergency has been marked completed!',
                                2
                              )
                            }
                          })
                        }
                      />
                    ]
              }
              style={{ marginBottom: 10 }}>
              <List.Item key={item.title}>
                <Descriptions bordered size={'middle'} layout={'vertical'}>
                  <Descriptions.Item label='Name' span={2}>
                    {item.name}
                  </Descriptions.Item>
                  <Descriptions.Item label='Role'>
                    {item.role}
                  </Descriptions.Item>
                  <Descriptions.Item label='Phone Number'>
                    {item.phoneNumber}
                  </Descriptions.Item>
                  <Descriptions.Item label='time'>
                    {moment(new Date(item.date.toDate())).format('LT')}
                  </Descriptions.Item>
                  <Descriptions.Item label='Date' span={2}>
                    {moment(new Date(item.date.toDate())).format('MM/DD/YYYY')}
                  </Descriptions.Item>
                  <Descriptions.Item label='Address' span={3}>
                    {item.address || 'Not Specified'}
                  </Descriptions.Item>
                  <Descriptions.Item label='Comments' span={3}>
                    {item.comments || 'Not Specified'}
                  </Descriptions.Item>
                </Descriptions>
              </List.Item>
            </Card>
          )}
        />
      </div>
    </Col>
  )
}

export default EmergencyColumn
