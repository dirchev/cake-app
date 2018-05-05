import { push } from 'react-router-redux'
import uuid from 'uuid'
import CakeApi from '../utils/api'

const api = new CakeApi()

export default {
  createCake: (data) => (dispatch) => {
    // used to keep track of the cake until it receives an ID from the API
    var creationId = data.id || uuid.v4()

    dispatch({
      type: 'START_CREATE_CAKE',
      payload: {...data, id: creationId}
    })
    dispatch(push('/'))

    api.create(data)
      .then(({data}) => {
        dispatch({
          type: 'SUCCESS_CREATE_CAKE',
          payload: {...data, creationId: creationId}
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
  editCake: (data) => (dispatch) => {
    dispatch({
      type: 'START_EDIT_CAKE',
      payload: data
    })
    dispatch(push(`/cake/${data.id}`))
    api.edit(data)
      .then(({data}) => {
        dispatch({
          type: 'SUCCESS_EDIT_CAKE',
          payload: data
        })
      })
      .catch(({response}) => {
        let err = response.data
        dispatch({
          type: 'ERROR_EDIT_CAKE',
          payload: data,
          error: err
        })
      })
  },
  deleteCake: (cakeId) => (dispatch) => {
    dispatch({
      type: 'START_DELETE_CAKE',
      payload: {id: cakeId}
    })

    api.delete(cakeId)
      .then(({data}) => {
        dispatch({
          type: 'SUCCESS_DELETE_CAKE',
          payload: {id: cakeId}
        })
        dispatch(push('/'))
      })
      .catch(({response}) => {
        let err = response.data
        dispatch({
          type: 'ERROR_DELETE_CAKE',
          payload: {id: cakeId},
          error: err
        })
      })
  },
  discardCreation: (cakeId) => (dispatch) => {
    dispatch({
      type: 'DISCARD_CAKE_CREATION',
      payload: {id: cakeId}
    })
  },
  discardEdit: (cakeId) => (dispatch) => {
    api.getOne(cakeId).then(({data}) => {
      dispatch({
        type: 'DISCARD_CAKE_EDIT',
        payload: data
      })
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
          payload: {loading: true}
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