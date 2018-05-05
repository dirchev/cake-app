import React, { Component } from 'react'
import { connect } from 'react-redux'
import actions from '../redux/action-creators'
import { Link } from 'react-router-dom'
import { push } from 'react-router-redux'
import PropTypes from 'prop-types'
import CakeForm from './CakeForm'

import FA from '@fortawesome/react-fontawesome'
import faUndo from '@fortawesome/fontawesome-free-solid/faUndoAlt'

class CakeCreatePage extends Component {
  constructor () {
    super()

    this.handleCancel = this.handleCancel.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleCancel (data) {
    this.props.redirectToHome()
  }

  handleSubmit (data) {
    this.props.createCake({
      ...data
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
          <CakeForm
            onSubmit={this.handleSubmit}
            onCancel={this.handleCancel}
          />
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
    },
    redirectToHome: () => {
      dispatch(push('/'))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CakeCreatePage)
