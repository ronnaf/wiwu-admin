import _ from 'lodash'
import { createAction } from 'redux-actions'
import { firestore as db } from '../../firebase'
import { GET_EMERGENCIES } from './emergency.constants'

// not in use, see AdminPage.js
export const getEmergencies = () => {
  return async (dispatch, getState) => {
    try {
      const {
        admin: { current }
      } = getState()

      const emergenciesRef = await db
        .collection('emergencies')
        .orderBy('date')
        .get() // TODO: filter emergencies once routes are established

      const emergencies = await Promise.all(
        emergenciesRef.docs.map(async emergency => {
          const userRef = await emergency.data().userId.get()

          const { firstName, lastName, phoneNumber } = userRef.data()

          return {
            ...emergency.data(),
            id: emergency.id,
            name: `${firstName} ${lastName}`,
            phoneNumber
          }
        })
      )

      // reverse so the latest requests will come up first
      dispatch(createAction(GET_EMERGENCIES)(_.reverse(emergencies)))
    } catch (error) {
      console.log(error)
    }
  }
}
