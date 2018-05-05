import React, { Component } from 'react'
import { connect } from 'react-redux'
import actions from '../redux/action-creators'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import Input from './inputs/Input'
import TextInput from './inputs/TextInput'
import YumFactorInput from './inputs/YumFactorInput'

import FA from '@fortawesome/react-fontawesome'
import faUndo from '@fortawesome/fontawesome-free-solid/faUndoAlt'

class CakeCreatePage extends Component {
  constructor () {
    super()

    this.state = {
      name: '',
      comment: '',
      imgURL: '',
      yumFactor: 0
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange (field) {
    return (value) => {
      this.setState({[field]: value})
    }
  }

  handleSubmit (e) {
    e.preventDefault()
    this.props.createCake({
      ...this.state
    })
  }

  render() {
    return (
      <div className="card">
        <div className="card-header">
          <h1 className="card-header-title">
            Add Your Cake
          </h1>
          <Link to="/" className="card-header-icon">
          <span className="icon has-text-info">
            <FA icon={faUndo} size="lg"/>
          </span>
        </Link>
        </div>
        <div className="card-content">
          <form onSubmit={this.handleSubmit}>
            <Input
              label="Cake Name"
              placeholder="Enter cake name here..."
              value={this.state.name}
              onChange={this.handleChange('name')}
            />
            <TextInput
              label="Cake Comment"
              placeholder="Enter cake comment here..."
              value={this.state.comment}
              onChange={this.handleChange('comment')}
            />
            <Input
              label="Cake Image"
              placeholder="Please enter image url here..."
              value={this.state.imgURL}
              onChange={this.handleChange('imgURL')}
            />
            <YumFactorInput
              label="Yum Factor"
              value={this.state.yumFactor}
              onChange={this.handleChange('yumFactor')}
            />

            <div className="buttons">
              <button className="button is-small is-primary" type="submit">Create</button>
              <Link to="/" className="button is-text is-small">Cancel</Link>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

CakeCreatePage.propTypes = {
  createCake: PropTypes.func.isRequired
}

let mapStateToProps = null

let mapDispatchToProps = function (dispatch) {
  return {
    createCake: (data) => {
      dispatch(actions.createCake(data))
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(CakeCreatePage)
