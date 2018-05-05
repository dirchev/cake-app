import React, { Component } from 'react'
import YumFactorPreview from './YumFactorPreview'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'

class CakePage extends Component {
  render() {
    if (!this.props.cake) return (
      <Redirect to='/' />
    )
    return (
      <div className="card">
        {
          this.props.cake.imageUrl
          ? (
            <div className="card-image">
              <figure className="image is-4by3">
                <img src={this.props.cake.imageUrl} alt="Cake" />
              </figure>
            </div>
          ) : null
        }
        <div className="card-content">
          {
            this.props.cake.name
            ? (<p className="title is-5">{this.props.cake.name}</p>)
            : null
          }

          <div className="content">
           { this.props.cake.comment ? (<p>{this.props.cake.comment}</p>) : null }
           { this.props.cake.yumFactor ? (<YumFactorPreview value={this.props.cake.yumFactor} />) : null}
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

export default connect(mapStateToProps)(CakePage)