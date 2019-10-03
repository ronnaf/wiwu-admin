import FuzzySearch from 'fuzzy-search'
import { createAction } from 'redux-actions'

import { SEARCH_CONTACTS } from './contact.constants'

export const searchContacts = (contacts, input) => {
  return dispatch => {
    const searcher = new FuzzySearch(contacts, ['name'], {
      sort: true
    })

    const result = searcher.search(input)
    dispatch(createAction(SEARCH_CONTACTS)(result))
  }
}
