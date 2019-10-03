import { createAction } from 'redux-actions'

import { FILTER_CONTACTS } from './contact.constants'

export const filterContacts = (contacts, filter) => {
  return dispatch => {
    dispatch(
      createAction(FILTER_CONTACTS)(
        filter !== 'all'
          ? contacts.filter(contact => contact.department === filter)
          : contacts
      )
    )
  }
}
