import axios from 'axios'

let instance

class CakeAPI {
  constructor () {
    if (!instance) instance = this
    this.axios = axios.create({
      baseURL: 'http://ec2-34-243-153-154.eu-west-1.compute.amazonaws.com:5000/api/'
    })

    return instance
  }

  getAll () {
    return this.axios.get('/cakes')
  }

  getOne (id) {
    return this.axios.get(`/cakes/${id}`)
  }

  create (data) {
    // data.id = uuid.v4()
    return this.axios.post(`/cakes`, data)
  }

  edit (data) {
    return this.axios.put(`/cakes/${data.id}`, {data})
  }

  delete (id) {
    return this.axios.delete(`/cakes/${id}`)
  }
}

export default CakeAPI