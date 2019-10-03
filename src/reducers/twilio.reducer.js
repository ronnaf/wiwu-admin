import { GET_TOKEN, RESET_TOKEN } from '../actions/twilio/twilio.constants.js'

const initialState = {
  token: ''
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_TOKEN:
      return {
        ...state,
        token: action.payload
      }
    case RESET_TOKEN:
      return {
        ...initialState
      }
    default:
      return {
        ...state
      }
  }
}
