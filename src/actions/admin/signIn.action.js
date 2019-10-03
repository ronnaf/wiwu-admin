import { message } from 'antd'
import { createAction } from 'redux-actions'

import { auth, firestore } from '../../firebase'
import { SIGNIN } from './admin.constants'

export const signIn = ({ emailAddress, password }) => {
  return async dispatch => {
    try {
      const ref = await auth.signInWithEmailAndPassword(emailAddress, password)

      const {
        user: { uid, email, emailVerified }
      } = ref

      const user = await firestore
        .collection('users')
        .doc(ref.user.uid)
        .get()
      const userData = user.data()

      if (userData.role !== 'admin' && userData.role !== 'responder') {
        await auth.signOut()
        throw new Error('Unauthorized Access')
      }

      const payload = {
        uid,
        email,
        emailVerified,
        ...userData
      }

      dispatch(createAction(SIGNIN)(payload))
    } catch (error) {
      message.error(error.message, 5)
    }
  }
}
