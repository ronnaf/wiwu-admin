import { message } from 'antd'
import { createAction } from 'redux-actions'

import { RESET_TOKEN } from './twilio.constants'

export const resetToken = () => {
  return dispatch => {
    try {
      dispatch(createAction(RESET_TOKEN)())
    } catch (error) {
      message.error(error.message, 5)
    }
  }
}
