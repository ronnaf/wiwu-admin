import FuzzySearch from 'fuzzy-search'
import { createAction } from 'redux-actions'

import { SEARCH_RESPONDERS } from './responder.constants'

export const searchResponders = (responders, input) => {
  return dispatch => {
    const searcher = new FuzzySearch(responders, ['firstName', 'lastName'], {
      sort: true
    })

    const result = searcher.search(input)
    dispatch(createAction(SEARCH_RESPONDERS)(result))
  }
}
