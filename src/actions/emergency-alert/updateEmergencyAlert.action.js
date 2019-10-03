import _ from 'lodash'
import { message } from 'antd'
import { createAction } from 'redux-actions'
import { firestore as db } from '../../firebase'
import { EDIT_ALERT } from './alert.constants'

export const updateEmergencyAlert = (id, values) => {
  return async (dispatch, getState) => {
    try {
      await db
        .collection('emergency-alerts')
        .doc(id)
        .update(values)

      const {
        admin: { alerts }
      } = getState()

      const index = _.findIndex(alerts, e => e.id === id)
      const editedAlerts = [...alerts]
      editedAlerts[index] = { ...editedAlerts[index], ...values }

      message.success('Alert updated successfully!', 5)
      dispatch(createAction(EDIT_ALERT)(editedAlerts))
    } catch (error) {
      alert(error.message)
      message.error(error.message, 5)
    }
  }
}
