import { createAction } from 'redux-actions'

import { FILTER_USERS } from './user.constants'

export const filterUsers = (users, filter) => {
  return dispatch => {
    dispatch(
      createAction(FILTER_USERS)(
        filter !== 'all' ? users.filter(user => user.status === filter) : users
      )
    )
  }
}
