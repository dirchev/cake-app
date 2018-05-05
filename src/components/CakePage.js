import React, { Component } from 'react'
import YumFactorPreview from './YumFactorPreview'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import actions from '../redux/action-creators'

import FA from '@fortawesome/react-fontawesome'
import faUndo from '@fortawesome/fontawesome-free-solid/faUndoAlt'
import faPencil from '@fortawesome/fontawesome-free-solid/faPencilAlt'
import faTrash from '@fortawesome/fontawesome-free-solid/faTrash'

class CakePage extends Component {
  render() {
    if (!this.props.cake) return (
      <Redirect to='/' />
    )
    return (
      <div className="card">
        <div className="card-header">
            <h1 className="card-header-title">
              {this.props.cake.name}
            </h1>

            <a onClick={this.props.deleteCake} className="card-header-icon">
              <span className="icon has-text-info">
                <FA icon={faTrash} size="lg"/>
              </span>
            </a>

            <Link to={`/cake/${this.props.cake.id}/edit`} className="card-header-icon">
              <span className="icon has-text-info">
                <FA icon={faPencil} size="lg"/>
              </span>
            </Link>

            <Link to="/" className="card-header-icon">
              <span className="icon has-text-info">
                <FA icon={faUndo} size="lg"/>
              </span>
            </Link>
        </div>
        {
          this.props.cake.imageUrl
          ? (
            <div className="card-image is-hidden-tablet">
              <figure className="image is-4by3">
                <img src={this.props.cake.imageUrl} alt="Cake" />
              </figure>
            </div>
          ) : null
        }
        <div className="card-content">
          <div className="columns">
            <div className="column is-8 is-hidden-mobile">
              <figure className="box image is-4by3">
                <img src={this.props.cake.imageUrl} alt="Cake" />
              </figure>
            </div>

            <div className="column">
            { this.props.cake.comment ? (<p>{this.props.cake.comment}</p>) : null }
            { this.props.cake.yumFactor ? (<YumFactorPreview value={this.props.cake.yumFactor} />) : null}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

CakePage.propTypes = {
  cake: PropTypes.shape({
    id: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    comment: PropTypes.string.isRequired,
    yumFactor: PropTypes.number.isRequired
  })
}

const mapStateToProps = function (state, prevProps) {
  let cakeId = prevProps.match.params.id
  return {
    cake: state.cakes[cakeId]
  }
}

const mapDispatchToProps = function (dispatch, prevProps) {
  let cakeId = prevProps.match.params.id
  return {
    deleteCake: (e) => {
      e.preventDefault()
      dispatch(actions.deleteCake(cakeId))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CakePage)