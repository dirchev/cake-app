import React, { Component } from 'react'
import PropTypes from 'prop-types'
import FA from '@fortawesome/react-fontawesome'
import faStar from '@fortawesome/fontawesome-free-solid/faStar'
import faStarO from '@fortawesome/fontawesome-free-regular/faStar'

class YumFactorPreview extends Component {
  render () {
    return (
      <span>{this.renderStars()}</span>
    )
  }

  renderStars () {
    var output = []
    var value = this.props.value || 0
    for (let i = 1; i <= 5 ; i++) {
      output.push((
        <span key={i}>
          <FA icon={value >= i ? faStar : faStarO} size="lg"/>
        </span>
      ))
    }
    return output
  }
}

YumFactorPreview.propTypes = {
  value: PropTypes.number
}

export default YumFactorPreview