import _ from 'lodash'

const defaultState = {}
export default function cakesReducer (state = defaultState, action) {
  switch (action.type) {
    case 'START_CREATE_CAKE':
      return {
        ...state,
        [action.payload.id]: { // use creation ID bc no API id assigned
          ...action.payload,
          loading: true,
          synced: false
        }
      }
    case 'SUCCESS_CREATE_CAKE':
      // deprecate creation ID and use the API id
      return {
        ..._.omit(state, action.payload.creationId),
        [action.payload.id]: {
          ..._.omit(action.payload, 'creationId'),
          loading: false,
          synced: true
        }
      }
    case 'ERROR_CREATE_CAKE':
      return {
        ...state,
        [action.payload.id]: {
          ...action.payload,
          synced: false,
          loading: false,
          errors: action.error
        }
      }
    case 'DISCARD_CAKE_CREATION':
      return {
        ..._.omit(state, action.payload.id)
      }
    case 'SYNC_CAKES':
      let newState = {...state}
      action.payload.forEach((cake) => {
        newState[cake.id] = {
          ...cake,
          loading: false,
          synced: true
        }
      })
      return newState
    default:
      return state
  }
}