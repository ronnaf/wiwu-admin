import { createAction } from 'redux-actions'

import { FILTER_RESPONDERS } from './responder.constants'

export const filterResponders = (responders, filter) => {
  return dispatch => {
    dispatch(
      createAction(FILTER_RESPONDERS)(
        filter !== 'all'
          ? responders.filter(responder => responder.status === filter)
          : responders
      )
    )
  }
}
