import {
  SIGNIN,
  SIGNUP,
  SIGNOUT,
  EDIT_ADMIN,
  SET_CURRENT_USER
} from '../actions/admin/admin.constants'
import {
  GET_USERS,
  DELETE_USER,
  SEARCH_USERS,
  FILTER_USERS,
  CHANGE_USER_STATUS,
  VERIFY_USER
} from '../actions/user/user.constants'
import {
  GET_RESPONDERS,
  EDIT_RESPONDER,
  DELETE_RESPONDER,
  CREATE_RESPONDER,
  SEARCH_RESPONDERS,
  CHANGE_RESPONDER_STATUS,
  FILTER_RESPONDERS
} from '../actions/responder/responder.constants'
import {
  GET_CONTACTS,
  DELETE_CONTACT,
  CREATE_CONTACT,
  EDIT_CONTACT,
  SEARCH_CONTACTS,
  FILTER_CONTACTS
} from '../actions/contact/contact.constants'
import {
  CREATE_ALERT,
  EDIT_ALERT,
  GET_ALERTS
} from '../actions/emergency-alert/alert.constants'

const initialState = {
  current: null,
  responders: [],
  filteredResponders: null,
  users: [],
  filteredUsers: null,
  contacts: [],
  filteredContacts: null,
  alerts: []
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SIGNIN:
      return {
        ...state,
        current: action.payload
      }
    case SIGNUP:
      return {
        ...state,
        current: action.payload
      }
    case SIGNOUT:
      return {
        ...initialState
      }
    case EDIT_ADMIN:
      return {
        ...initialState,
        current: { ...state.current, ...action.payload }
      }
    case SET_CURRENT_USER:
      return {
        ...state,
        current: action.payload
      }
    case CREATE_RESPONDER:
      return {
        ...state,
        responders: [action.payload, ...state.responders]
      }
    case EDIT_RESPONDER:
      return {
        ...state,
        responders: action.payload
      }
    case DELETE_RESPONDER:
      return {
        ...state,
        responders: action.payload
      }
    case CHANGE_RESPONDER_STATUS:
      return {
        ...state,
        responders: action.payload
      }
    case GET_RESPONDERS:
      return {
        ...state,
        responders: action.payload
      }
    case SEARCH_RESPONDERS:
      return {
        ...state,
        filteredResponders: action.payload
      }
    case FILTER_RESPONDERS:
      return {
        ...state,
        filteredResponders: action.payload
      }
    case GET_USERS:
      return {
        ...state,
        users: action.payload
      }
    case DELETE_USER:
      return {
        ...state,
        users: action.payload
      }
    case SEARCH_USERS:
      return {
        ...state,
        filteredUsers: action.payload
      }
    case FILTER_USERS:
      return {
        ...state,
        filteredUsers: action.payload
      }
    case CHANGE_USER_STATUS:
      return {
        ...state,
        users: action.payload
      }
    case VERIFY_USER:
      return {
        ...state,
        users: action.payload
      }
    case GET_CONTACTS:
      return {
        ...state,
        contacts: action.payload
      }
    case DELETE_CONTACT:
      return {
        ...state,
        contacts: action.payload
      }
    case CREATE_CONTACT:
      return {
        ...state,
        contacts: [action.payload, ...state.contacts]
      }
    case EDIT_CONTACT:
      return {
        ...state,
        contacts: action.payload
      }
    case SEARCH_CONTACTS:
      return {
        ...state,
        filteredContacts: action.payload
      }
    case FILTER_CONTACTS:
      return {
        ...state,
        filteredContacts: action.payload
      }
    case CREATE_ALERT:
      return {
        ...state,
        alerts: [action.payload, ...state.alerts]
      }
    case GET_ALERTS:
      return {
        ...state,
        alerts: action.payload
      }
    case EDIT_ALERT:
      return {
        ...state,
        alerts: action.payload
      }
    default:
      return {
        ...state
      }
  }
}
