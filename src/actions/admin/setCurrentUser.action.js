import { createAction } from 'redux-actions'

import { firestore } from '../../firebase'
import { SET_CURRENT_USER } from './admin.constants'

export const setCurrentUser = user => {
  return async dispatch => {
    try {
      if (user) {
        const { uid, email, emailVerified } = user

        const ref = await firestore
          .collection('users')
          .doc(uid)
          .get()
        const userData = ref.data()

        const userPayload = { uid, email, emailVerified, ...userData }
        dispatch(createAction(SET_CURRENT_USER)(userPayload))
      } else {
        dispatch(createAction(SET_CURRENT_USER)(user))
      }
    } catch (e) {
      // TODO add proper catch
    }
  }
}
