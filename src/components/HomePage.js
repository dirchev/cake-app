import React, { Component } from 'react'
import { connect } from 'react-redux'
import CakePreview from './CakePreview'
import Navigation from './Navigation'
import PropTypes from 'prop-types'

class HomePage extends Component {
  render() {
    return (
      <div className="card">
        <Navigation />
        <div className="card-content">
          <div className="columns">
              {
                this.props.cakes.map((cake) => (
                  <div key={cake.id} className="column is-one-third-desktop is-half-tablet">
                    <CakePreview {...cake} />
                  </div>
                ))
              }
            </div>
        </div>
      </div>
    )
  }
}

HomePage.propTypes = {
  cakes: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    imgURL: PropTypes.string.isRequired,
    comment: PropTypes.string.isRequired,
    yumFactor: PropTypes.number.isRequired
  })).isRequired
}

const mapStateToProps = (state) => {
  return {
    cakes: Object.keys(state.cakes).map((cakeId) => state.cakes[cakeId])
  }
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage)
