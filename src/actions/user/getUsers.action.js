import { message } from 'antd'
import { createAction } from 'redux-actions'

import { firestore as db } from '../../firebase'

import { GET_USERS } from './user.constants'
import { roles } from '../../constants/User'

export const getUsers = () => {
  return async dispatch => {
    try {
      const usersRef = await db
        .collection('users')
        .where('role', '==', roles.USER)
        .get()

      const users = await Promise.all(
        usersRef.docs.map(async user => {
          const emergencies = await Promise.all(
            user.data().emergencies.map(async emergencyRef => {
              const emergency = await emergencyRef.get()

              return emergency.data()
            })
          )

          return {
            ...user.data(),
            emergencies: emergencies,
            id: user.id
          }
        })
      )

      dispatch(createAction(GET_USERS)(users))
    } catch (error) {
      message.error(error.message, 5)
    }
  }
}
