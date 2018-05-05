import React, { Component } from 'react'
import { connect } from 'react-redux'
import actions from '../redux/action-creators'
import { Link, Redirect } from 'react-router-dom'
import { push } from 'react-router-redux'
import PropTypes from 'prop-types'
import CakeForm from './CakeForm'

import FA from '@fortawesome/react-fontawesome'
import faUndo from '@fortawesome/fontawesome-free-solid/faUndoAlt'

class CakeEditPage extends Component {
  constructor () {
    super()

    this.handleCancel = this.handleCancel.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleCancel (data) {
    this.props.redirectToCake()
  }

  handleSubmit (data) {
    if (this.props.cake.action === 'create') {
      this.props.createCake({
        id: this.props.cake.id,
        ...data
      })
    } else {
      this.props.editCake({
        id: this.props.cake.id,
        ...data
      })
    }
  }

  render() {
    if (!this.props.cake) return (
      <Redirect to='/' />
    )
    return (
      <div className="card">
        <div className="card-header">
          <h1 className="card-header-title">
            Edit Cake
          </h1>
          <Link to={`/cake/${this.props.cake.id}`} className="card-header-icon">
            <span className="icon has-text-info">
              <FA icon={faUndo} size="lg"/>
            </span>
          </Link>
        </div>
        {
          this.props.cake.error
          ? (
            <div className="notification is-warning">
              {
                Object.keys(this.props.cake.error).map((key) => {
                  return (
                    <p>{this.props.cake.error[key].join(' ')}</p>
                  )
                })
              }
            </div>
          ) : null
        }
        <div className="card-content">
          <CakeForm
            cake={this.props.cake}
            onSubmit={this.handleSubmit}
            onCancel={this.handleCancel}
          />
        </div>
      </div>
    )
  }
}

CakeEditPage.propTypes = {
  cake: PropTypes.shape({
    id: PropTypes.string,
    imageUrl: PropTypes.string,
    comment: PropTypes.string,
    yumFactor: PropTypes.number
  }),
  editCake: PropTypes.func.isRequired
}

const mapStateToProps = function (state, prevProps) {
  let cakeId = prevProps.match.params.id
  return {
    cake: state.cakes[cakeId]
  }
}

let mapDispatchToProps = function (dispatch, prevProps) {
  let cakeId = prevProps.match.params.id

  return {
    createCake: (data) => {
      dispatch(actions.createCake(data))
    },
    editCake: (data) => {
      dispatch(actions.editCake(data))
    },
    redirectToCake: () => {
      dispatch(push(`/cake/${cakeId}`))
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(CakeEditPage)
