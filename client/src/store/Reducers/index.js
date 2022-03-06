// here we will make the rootReducer 

import { combineReducers } from "redux"
import currentUser from "./currentUser"
import error from "./errors"
import {Message} from "./messages"
const rootReducer = combineReducers({
  currentUser,
  error,
  Message
})

export default rootReducer