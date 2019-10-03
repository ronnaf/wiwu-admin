import _ from 'lodash'
import { firestore as db } from '../../firebase'
import { message } from 'antd'
import { createAction } from 'redux-actions'
import { EDIT_EMERGENCY } from './emergency.constants'

export const completeEmergency = id => {
  return async (dispatch, getState) => {
    try {
      const {
        emergency: { list }
      } = getState()

      await db
        .collection('emergencies')
        .doc(id)
        .update({
          status: 'COMPLETED'
        })

      const index = _.findIndex(list, e => e.id === id)
      list[index].status = 'COMPLETED'
    } catch (error) {}
  }
}

export const updateRequest = (id, values) => {
  return async (dispatch, getState) => {
    try {
      await db
        .collection('emergencies')
        .doc(id)
        .update(values)

      const {
        emergency: { list: emergencies }
      } = getState()

      const index = _.findIndex(emergencies, e => e.id === id)
      const editedEmergencies = [...emergencies]
      editedEmergencies[index] = { ...editedEmergencies[index], ...values }

      message.success('Request updated successfully!', 5)
      dispatch(createAction(EDIT_EMERGENCY)(editedEmergencies))
    } catch (e) {
      alert(e.message)
      message.error(e.message, 5)
    }
  }
}
