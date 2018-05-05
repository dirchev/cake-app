const defaultState = {
  loading: false,
  globalErrors: null
}
export default function uiReducer (state = defaultState, action) {
  switch (action.type) {
    case 'TOGGLE_GLOBAL_LOADING':
      return {
        ...state,
        loading: action.payload.loading
      }
    case 'GLOBAL_LOADING_FAIL':
      return {
        ...state,
        globalErrors: action.payload.errors
      }
    default:
      return state
  }
}