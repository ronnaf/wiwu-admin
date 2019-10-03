import { message } from 'antd'
import { createAction } from 'redux-actions'

import { CREATE_CONTACT } from './contact.constants'
import { firestore as db } from '../../firebase'
import { getCoordinates } from '../../helpers/common/getCoordinates'

export const createContact = ({ address, ...rest }) => {
  return async dispatch => {
    try {
      const location = await getCoordinates(address)

      await db.collection('contacts').add({
        ...rest,
        address,
        location
      })

      const payload = {
        ...rest,
        address,
        location
      }

      message.success('Contact created successfully!', 5)
      dispatch(createAction(CREATE_CONTACT)(payload))
    } catch (error) {
      message.error(error.message, 5)
    }
  }
}
