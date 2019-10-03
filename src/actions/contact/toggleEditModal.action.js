import { createAction } from 'redux-actions'

import { TOGGLE_EDIT_MODAL } from './contact.constants'

export const toggleEditModal = () => {
  return dispatch => {
    dispatch(createAction(TOGGLE_EDIT_MODAL)())
  }
}
