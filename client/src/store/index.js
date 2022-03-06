//here where we will make Store
import rootReducer from "./Reducers"
import {createStore,applyMiddleware,compose} from "redux"
import thunk from "redux-thunk"

export function configureStore(){
  const Store = createStore(rootReducer,compose(applyMiddleware(thunk),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  ))
  return Store
}