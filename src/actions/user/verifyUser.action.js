import _ from 'lodash'
import { message } from 'antd'
import { createAction } from 'redux-actions'

import { firestore as db } from '../../firebase'
import { VERIFY_USER } from './user.constants'

export const verifyUser = id => {
  return async (dispatch, getState) => {
    try {
      await db
        .collection('users')
        .doc(id)
        .update({ isUserVerified: true })

      const {
        admin: { users }
      } = getState()

      const index = _.findIndex(users, e => e.id === id)
      const editedUsers = [...users]
      editedUsers[index].isUserVerified = true

      message.success('Verified user successfully!', 5)
      dispatch(createAction(VERIFY_USER)(editedUsers))
    } catch (error) {
      message.error(error.message, 5)
    }
  }
}
