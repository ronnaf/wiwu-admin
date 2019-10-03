import { message } from 'antd'
import { createAction } from 'redux-actions'

import { firestore as db } from '../../firebase'
import { DELETE_CONTACT } from './contact.constants'

export const deleteContact = contactId => {
  return async (dispatch, getState) => {
    try {
      await db
        .collection('contacts')
        .doc(contactId)
        .delete()

      const {
        admin: { contacts }
      } = getState()

      const payload = contacts.filter(e => e.id !== contactId)

      message.success('Contact deleted successfully!', 5)
      dispatch(createAction(DELETE_CONTACT)(payload))
    } catch (error) {
      alert(error.message)
      message.error(error.message, 5)
    }
  }
}
