import _ from 'lodash'
import { message } from 'antd'
import { createAction } from 'redux-actions'

import { firestore as db } from '../../firebase'
import { CHANGE_USER_STATUS } from './user.constants'

export const changeUserStatus = (id, status) => {
  return async (dispatch, getState) => {
    try {
      await db
        .collection('users')
        .doc(id)
        .update({ status: status })

      const {
        admin: { users }
      } = getState()

      const index = _.findIndex(users, e => e.id === id)
      const editedUsers = [...users]
      editedUsers[index].status = status

      message.success('User status changed successfully!', 5)
      dispatch(createAction(CHANGE_USER_STATUS)(editedUsers))
    } catch (error) {
      message.error(error.message, 5)
    }
  }
}
