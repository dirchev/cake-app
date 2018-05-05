import actions from '../redux/action-creators'

export default function dataLoader (state) {
  state.dispatch(actions.loadAllCakes())
}