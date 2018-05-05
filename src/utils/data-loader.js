import actions from '../redux/action-creators'
import isOnline from './isOnline'

export default function dataLoader (state) {
  if (!isOnline()) return
  state.dispatch(actions.loadAllCakes())
}