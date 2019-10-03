import FuzzySearch from 'fuzzy-search'
import { createAction } from 'redux-actions'

import { SEARCH_USERS } from './user.constants'

export const searchUsers = (users, input) => {
  return dispatch => {
    const searcher = new FuzzySearch(users, ['firstName', 'lastName'], {
      sort: true
    })

    const result = searcher.search(input)
    dispatch(createAction(SEARCH_USERS)(result))
  }
}
