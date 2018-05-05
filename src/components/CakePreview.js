import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

class CakePreview extends Component {
  render() {
    return (
      <Link to={`/cake/${this.props.id}`} className="card is-primary">
        <div className="card">
        {
            this.props.imgURL
            ? (
              <div className="card-image">
                <figure className="image is-4by3">
                  <img src={this.props.imgURL} alt="Cake" />
                </figure>
              </div>
            ) : null
          }
          <div className="card-content">
            {
              this.props.name
              ? (<p className="title is-5">{this.props.name}</p>)
              : null
            }
          </div>
        </div>
      </Link>
    )
  }
}

CakePreview.propTypes = {
  cake: PropTypes.shape({
    id: PropTypes.string.isRequired,
    imgURL: PropTypes.string.isRequired,
    comment: PropTypes.string.isRequired,
    yumFactor: PropTypes.number.isRequired
  })
}

export default CakePreview
