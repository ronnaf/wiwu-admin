import { combineReducers } from 'redux'
import responder from './responder.reducer'
import admin from './admin.reducer'
import contact from './contact.reducer'
import twilio from './twilio.reducer'
import emergency from './emergency.reducer'

export default combineReducers({
  responder,
  admin,
  contact,
  twilio,
  emergency
})
