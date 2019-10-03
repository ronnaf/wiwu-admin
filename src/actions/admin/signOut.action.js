import { message } from 'antd'
import { createAction } from 'redux-actions'

import { auth } from '../../firebase'
import { history } from '../../history'
import { SIGNOUT } from './admin.constants'

export const signOut = () => {
  return async dispatch => {
    try {
      await auth.signOut()

      dispatch(createAction(SIGNOUT)())
      history.push('/auth-page/sign-in')
    } catch (error) {
      message.error(error.message, 5)
    }
  }
}
