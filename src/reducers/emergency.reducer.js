import { GET_EMERGENCIES } from '../actions/emergency-request/emergency.constants'
import { SIGNOUT } from '../actions/admin/admin.constants'

const initialState = {
  list: [],
  completed: [],
  pending: []
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_EMERGENCIES:
      // added completed and pending since component doesnt re-render on nested object field change
      return {
        ...state,
        list: action.payload,
        completed: action.payload.filter(e => e.status === 'COMPLETED'),
        pending: action.payload.filter(e => e.status === 'PENDING')
      }
    case SIGNOUT:
      return {
        ...initialState
      }
    default:
      return {
        ...state
      }
  }
}
