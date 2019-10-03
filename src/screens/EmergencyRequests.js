import { Row, Layout } from 'antd'
import React from 'react'

import EmergencyColumn from '../components/emergency-request/EmergencyColumn'
import { Helmet } from 'react-helmet'

const EmergencyRequests = () => (
  <Layout.Content>
    <Helmet>
      <title>Emergency Contacts - wiwu admin</title>
    </Helmet>

    <Row>
      <EmergencyColumn title={'PENDING'} />
      <EmergencyColumn title={'COMPLETED'} />
    </Row>
  </Layout.Content>
)

export default EmergencyRequests
