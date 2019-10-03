import _ from 'lodash'
import { message } from 'antd'
import { createAction } from 'redux-actions'

import { firestore as db } from '../../firebase'
import { EDIT_RESPONDER } from './responder.constants'

export const editResponder = (values, id) => {
  return async (dispatch, getState) => {
    try {
      await db
        .collection('users')
        .doc(id)
        .update(values)

      const {
        admin: { responders }
      } = getState()

      const index = _.findIndex(responders, e => e.id === id)
      const editedResponders = [...responders]
      editedResponders[index] = values

      message.success('Responder updated successfully!', 5)
      dispatch(createAction(EDIT_RESPONDER)(editedResponders))
    } catch (error) {
      alert(error.message)
      message.error(error.message, 5)
    }
  }
}
