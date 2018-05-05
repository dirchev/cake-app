import React, { Component } from 'react'
import YumFactorPreview from './YumFactorPreview'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import actions from '../../redux/action-creators'

import FA from '@fortawesome/react-fontawesome'
import faUndo from '@fortawesome/fontawesome-free-solid/faUndoAlt'
import faPencil from '@fortawesome/fontawesome-free-solid/faPencilAlt'
import faTrash from '@fortawesome/fontawesome-free-solid/faTrash'
import faSpinner from '@fortawesome/fontawesome-free-solid/faSpinner'

class CakePage extends Component {
  render() {
    if (!this.props.cake) return (
      <Redirect to='/' />
    )
    let infoBox = null
    if (this.props.cake.error) {
      infoBox = (
        <div className="card-content">
          <div className="notification is-danger">
            <button className="delete" onClick={this.props.discardCake}></button>
            <span><strong>{this.props.cake.name}</strong> had some problems syncing. Fix it <Link to={`/cake/${this.props.cake.id}/edit`}>here</Link>.</span>
          </div>
        </div>
      )
    } else if (this.props.cake.loading) {
      infoBox = (
        <div className="notification">
          <span className="icon"><FA icon={faSpinner} spin /></span>
          <span>Getting <strong>{this.props.cake.name}</strong> baked!</span>
        </div>
      )
    }
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
        {infoBox}
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
    discardCake: (e) => {
      e.preventDefault()
      dispatch(actions.discardCake(cakeId))
    },
    deleteCake: (e) => {
      e.preventDefault()
      dispatch(actions.deleteCake(cakeId))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CakePage)