import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Layout, Drawer } from 'antd'

import ContactList from '../components/emergency-contact/ContactList'
import ContactForm from '../components/emergency-contact/ContactForm'
import ContactListHeader from '../components/emergency-contact/ContactListHeader'

import { createContact } from '../actions/contact/createContact.action'
import { Helmet } from 'react-helmet'

const initialValues = {
  name: '',
  notes: '',
  address: '',
  department: 'medical',
  numbers: ['']
}

const EmergencyContacts = () => {
  const dispatch = useDispatch()
  const [drawerVisibility, setDrawerVisibility] = useState(false)

  return (
    <Layout.Content style={styles.content}>
      <Helmet>
        <title>Emergency Contacts - wiwu admin</title>
      </Helmet>

      <Drawer
        title={<b>Create Emergency Contact</b>}
        width={550}
        destroyOnClose={true}
        maskClosable={false}
        keyboard={false}
        bodyStyle={{ background: '#f5f5f5', height: '94%' }}
        onClose={() => setDrawerVisibility(false)}
        visible={drawerVisibility}>
        <ContactForm
          onSubmitHandler={async (values, { setSubmitting, resetForm }) => {
            await dispatch(createContact(values))
            setSubmitting(false)
            resetForm(initialValues)
            setDrawerVisibility(false)
          }}
          initialValues={initialValues}
        />
      </Drawer>
      <ContactListHeader setDrawerVisibility={setDrawerVisibility} />
      <ContactList />
    </Layout.Content>
  )
}

const styles = {
  content: {
    height: '100%',
    overflowY: 'auto'
  }
}

export default EmergencyContacts
