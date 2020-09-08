import {createStore, applyMiddleware, combineReducers} from 'redux'
import thunk from 'redux-thunk'
import gameReducer from './reducers/gameReducer'
import statReducer from './reducers/statReducer'

const store = createStore(combineReducers({gameReducer, statReducer}), applyMiddleware(thunk))

export default store