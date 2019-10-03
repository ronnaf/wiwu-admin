import { message } from 'antd'
import { createAction } from 'redux-actions'

import { auth, firestore as db } from '../../firebase'
import { SIGNUP } from './admin.constants'
import { statuses, roles } from '../../constants/User'
import { sendEmailVerification } from '../../helpers/common/sendEmailVerification'

export const signUp = ({
  emailAddress: email,
  password,
  adminKey,
  ...rest
}) => {
  return async dispatch => {
    try {
      const key = await db
        .collection('adminKeys')
        .doc(adminKey)
        .get()

      if (!key.exists) {
        throw new Error('Admin key does not exist!')
      } else {
        const { user } = key.data()

        if (user) {
          throw new Error('Admin key already used')
        }
      }

      await auth.createUserWithEmailAndPassword(email, password)
      const user = auth.currentUser

      const firestorePayload = {
        ...rest,
        role: roles.ADMIN,
        status: statuses.ACTIVE,
        emergencies: [],
        isUserVerified: true,
        avatar: null, // TODO: add placeholder
        homeCoordinates: {
          latitude: 10.7202,
          longitude: 122.5621
        }
      }

      await db
        .collection('users')
        .doc(user.uid)
        .set(firestorePayload)

      await db
        .collection('adminKeys')
        .doc(adminKey)
        .update({ user: db.doc(`users/${user.uid}`) })

      sendEmailVerification()

      const userPayload = {
        ...firestorePayload,
        email,
        uid: user.uid,
        emailVerified: false
      }

      dispatch(createAction(SIGNUP)(userPayload))
    } catch (error) {
      message.error(error.message, 5)
    }
  }
}
