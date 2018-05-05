import { push } from 'react-router-redux'
import uuid from 'uuid'
import CakeApi from '../utils/api'

const api = new CakeApi()

export default {
  createCake: (data) => (dispatch) => {
    // used to keep track of the cake until it receives an ID from the API
    var creationId = uuid.v4()

    dispatch({
      type: 'START_CREATE_CAKE',
      payload: {...data, id: creationId}
    })
    dispatch(push('/'))

    api.create(data)
      .then(({data}) => {
        dispatch({
          type: 'SUCCESS_CREATE_CAKE',
          payload: {...data, creationId}
        })
      })
      .catch(({response}) => {
        let err = response.data
        dispatch({
          type: 'ERROR_CREATE_CAKE',
          payload: {...data, id: creationId},
          error: err
        })
      })
  },
  discardCakeCreation: (cakeId) => (dispatch) => {
    dispatch({
      type: 'DISCARD_CAKE_CREATION',
      payload: {id: cakeId}
    })
  },
  loadAllCakes: () => (dispatch) => {
    dispatch({
      type: 'TOGGLE_GLOBAL_LOADING',
      payload: {loading: true}
    })

    api.getAll()
      .then(({data}) => {
        dispatch({
          type: 'TOGGLE_GLOBAL_LOADING',
          payload: {loading: false}
        })
        dispatch({
          type: 'SYNC_CAKES',
          payload: data
        })
      })
      .catch(({response}) => {
        const errors = response.data
        dispatch({
          type: 'TOGGLE_GLOBAL_LOADING',
          payload: {loading: false}
        })
        dispatch({
          type: 'GLOBAL_LOADING_FAIL',
          payload: {errors: errors}
        })
      })
  }
}