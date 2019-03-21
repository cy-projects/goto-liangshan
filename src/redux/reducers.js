import { INCREMENT, DECREMENT } from '../actions'
import * as initState from './initState'

export const count = (state=initState.countInitState, action) => {
  switch (action.type){
    case INCREMENT:
      return Object.assign({}, state, {
        count: state.count + 1,
        obj: action.obj
      })
    case DECREMENT:
      return Object.assign({}, state, {
        count: state.count - 1,
        obj: action.obj
      })
    default:
      return state;
  }
}
