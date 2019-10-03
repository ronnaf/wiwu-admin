import React, { useState } from 'react'
import { Layout, Drawer } from 'antd'
import { useDispatch } from 'react-redux'
import { departments } from '../constants/User'

import { CreateResponderSchema } from '../schema/responder.schema'

import { createResponder } from '../actions/responder/createResponder.action'

import ResponderForm from '../components/emergency-responder/ResponderForm'
import ResponderList from '../components/emergency-responder/ResponderList'
import ResponderListHeader from '../components/emergency-responder/ResponderListHeader'
import { Helmet } from 'react-helmet'

const { POLICE } = departments

const initialValues = {
  emailAddress: '',
  password: '',
  firstName: '',
  lastName: '',
  phoneNumber: '',
  department: POLICE
}

const EmergencyResponders = () => {
  const dispatch = useDispatch()
  const [drawerVisibility, setDrawerVisibility] = useState(false)

  return (
    <Layout.Content style={styles.content}>
      <Helmet>
        <title>Emergency Responders - wiwu admin</title>
      </Helmet>

      <Drawer
        title={<b>Create Emergency Responder</b>}
        width={550}
        destroyOnClose={true}
        maskClosable={false}
        keyboard={false}
        bodyStyle={{ background: '#f5f5f5', height: '94%' }}
        onClose={() => setDrawerVisibility(false)}
        visible={drawerVisibility}>
        <ResponderForm
          onSubmitHandler={async (values, { setSubmitting, resetForm }) => {
            await dispatch(createResponder(values))
            setSubmitting(false)
            resetForm(initialValues)
            setDrawerVisibility(false)
          }}
          initialValues={initialValues}
          schema={CreateResponderSchema}
        />
      </Drawer>
      <ResponderListHeader setDrawerVisibility={setDrawerVisibility} />
      <ResponderList />
    </Layout.Content>
  )
}

const styles = {
  content: {
    height: '100%',
    overflowY: 'auto'
  }
}

export default EmergencyResponders
