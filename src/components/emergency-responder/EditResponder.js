import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Modal } from 'antd'

import { EditResponderSchema } from '../../schema/responder.schema'

import { editResponder } from '../../actions/responder/editResponder.action'
import { toggleEditModal } from '../../actions/responder/toggleEditModal.action'

import ResponderForm from './ResponderForm'

const EditResponder = () => {
  const dispatch = useDispatch()
  const responder = useSelector(state => state.responder.selectedResponder)
  const visible = useSelector(state => state.responder.editModalVisibility)

  return (
    <Modal
      centered={true}
      visible={visible}
      footer={null}
      destroyOnClose={true}
      maskClosable={false}
      bodyStyle={{ padding: 20, backgroundColor: '#f5f5f5' }}
      title={<strong>Update Responder Details</strong>}
      onCancel={() => dispatch(toggleEditModal())}>
      <ResponderForm
        onSubmitHandler={async (values, { setSubmitting }) => {
          await dispatch(editResponder(values, responder.id))
          setSubmitting(false)
          dispatch(toggleEditModal())
        }}
        initialValues={responder}
        schema={EditResponderSchema}
      />
    </Modal>
  )
}

export default EditResponder
