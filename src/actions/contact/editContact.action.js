import _ from 'lodash'
import { message } from 'antd'
import { createAction } from 'redux-actions'

import { firestore as db } from '../../firebase'
import { getCoordinates } from '../../helpers/common/getCoordinates'
import { EDIT_CONTACT } from './contact.constants'

export const editContact = ({ address, ...rest }, id) => {
  return async (dispatch, getState) => {
    const location = await getCoordinates(address)
    const values = { ...rest, location, address }

    try {
      await db
        .collection('contacts')
        .doc(id)
        .update(values)

      const {
        admin: { contacts }
      } = getState()

      const index = _.findIndex(contacts, e => e.id === id)
      const editedContacts = [...contacts]
      editedContacts[index] = values

      message.success('Contact updated successfully!', 5)
      dispatch(createAction(EDIT_CONTACT)(editedContacts))
    } catch (error) {
      alert(error.message)
      message.error(error.message, 5)
    }
  }
}
