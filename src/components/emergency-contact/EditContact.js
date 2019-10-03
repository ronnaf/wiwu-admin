import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Modal } from 'antd'

import ContactForm from './ContactForm'

import { editContact } from '../../actions/contact/editContact.action'
import { toggleEditModal } from '../../actions/contact/toggleEditModal.action'

const EditContact = () => {
  const dispatch = useDispatch()
  const contact = useSelector(state => state.contact.selectedContact)
  const visible = useSelector(state => state.contact.editModalVisibility)

  return (
    <Modal
      centered={true}
      visible={visible}
      footer={null}
      destroyOnClose={true}
      maskClosable={false}
      bodyStyle={{ padding: '20px', backgroundColor: '#f5f5f5' }}
      title={<strong>Update Contact Details</strong>}
      onCancel={() => dispatch(toggleEditModal())}>
      <ContactForm
        onSubmitHandler={async (values, { setSubmitting }) => {
          await dispatch(editContact(values, contact.id))
          setSubmitting(false)
          dispatch(toggleEditModal())
        }}
        initialValues={contact}
      />
    </Modal>
  )
}

export default EditContact
