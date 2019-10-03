import {
  TOGGLE_EDIT_MODAL,
  SET_SELECTED_RESPONDER
} from '../actions/responder/responder.constants'

const initialState = {
  selectedResponder: null,
  editModalVisibility: false
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_EDIT_MODAL:
      return {
        ...state,
        editModalVisibility: !state.editModalVisibility
      }
    case SET_SELECTED_RESPONDER:
      return {
        ...state,
        selectedResponder: action.payload
      }
    default:
      return {
        ...state
      }
  }
}
