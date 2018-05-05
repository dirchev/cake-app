const defaultState = {}
const cakesReducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'START_CREATE_CAKE':
      return {
        ...state,
        [action.payload.id]: {
          ...action.payload,
          loading: true
        }
      }
    case 'SUCCESS_CREATE_CAKE':
      return {
        ...state,
        [action.payload.id]: {
          ...action.payload,
          synced: true,
          loading: false
        }
      }
    case 'ERROR_CREATE_CAKE':
      return {
        ...state,
        [action.payload.id]: {
          ...action.payload,
          synced: false,
          loading: false,
          error: action.error
        }
      }
    default:
      return state
  }
}

export default {
  cakes: cakesReducer
}