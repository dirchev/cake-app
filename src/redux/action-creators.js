import { push } from 'react-router-redux'
import uuid from 'uuid'

export default {
  createCake: (data) => (dispatch) => {
    data.id = uuid.v4()

    dispatch({
      type: 'START_CREATE_CAKE',
      payload: data,
    })

    dispatch(push('/'))

    setTimeout(() => {
      dispatch({
        type: 'SUCCESS_CREATE_CAKE',
        payload: data,
      })
    }, 1000)
  }
}