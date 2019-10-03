import { createAction } from 'redux-actions'

import { TOGGLE_EDIT_MODAL } from './responder.constants'

export const toggleEditModal = () => {
  return dispatch => {
    dispatch(createAction(TOGGLE_EDIT_MODAL)())
  }
}
