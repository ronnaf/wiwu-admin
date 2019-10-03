import { createAction } from 'redux-actions'

import { SET_SELECTED_RESPONDER } from './responder.constants'

export const setSelectedResponder = responder => {
  return dispatch => {
    dispatch(createAction(SET_SELECTED_RESPONDER)(responder))
  }
}
