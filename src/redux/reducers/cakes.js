import _ from 'lodash'

const defaultState = {}
export default function cakesReducer (state = defaultState, action) {
  switch (action.type) {
    case 'START_CREATE_CAKE':
      return {
        ...state,
        [action.payload.id]: {
          ..._.omit(action.payload, 'creationId'),
          loading: true,
          synced: false,
          action: 'create'
        }
      }
    case 'START_EDIT_CAKE':
      return {
        ...state,
        [action.payload.id]: {
          ...action.payload,
          loading: true,
          synced: false,
          action: 'edit'
        }
      }
    case 'SUCCESS_EDIT_CAKE':
      return {
        ...state,
        [action.payload.id]: {
          ...action.payload,
          loading: false,
          synced: true,
          action: null,
          error: null
        }
      }
    case 'SUCCESS_CREATE_CAKE':
      return {
        ..._.omit(state, action.payload.creationId),
        [action.payload.id]: {
          ...action.payload,
          loading: false,
          synced: true,
          action: null,
          error: null
        }
      }
    case 'ERROR_EDIT_CAKE':
    case 'ERROR_CREATE_CAKE':
    case 'ERROR_DELETE_CAKE':
      return {
        ...state,
        [action.payload.id]: {
          ...state[action.payload.id],
          synced: false,
          loading: false,
          error: action.error
        }
      }
    case 'START_DELETE_CAKE':
      return {
        ...state,
        [action.payload.id]: {
          ...state[action.payload.id],
          loading: true,
          synced: false,
          action: 'delete'
        }
      }
    case 'SUCCESS_DELETE_CAKE':
      return {
        ..._.omit(state, action.payload.id)
      }
    case 'DISCARD_CAKE_CREATION':
      return {
        ..._.omit(state, action.payload.id)
      }
    case 'DISCARD_CAKE_EDIT':
      return {
        ...state,
        [action.payload.id]: {
          ...action.payload,
          loading: false,
          synced: true,
          action: null,
          error: null
        }
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