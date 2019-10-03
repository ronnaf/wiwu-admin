import {
  TOGGLE_EDIT_MODAL,
  SET_SELECTED_CONTACT
} from '../actions/contact/contact.constants'

const initialState = {
  selectedContact: null,
  editModalVisibility: false
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_EDIT_MODAL:
      return {
        ...state,
        editModalVisibility: !state.editModalVisibility
      }
    case SET_SELECTED_CONTACT:
      return {
        ...state,
        selectedContact: action.payload
      }
    default:
      return {
        ...state
      }
  }
}
