import { createAction } from 'redux-actions'

import { SET_SELECTED_CONTACT } from './contact.constants'

export const setSelectedContact = contact => {
  return dispatch => {
    dispatch(createAction(SET_SELECTED_CONTACT)(contact))
  }
}
