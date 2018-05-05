import React, { Component } from 'react'
import PropTypes from 'prop-types'
import FA from '@fortawesome/react-fontawesome'
import faStar from '@fortawesome/fontawesome-free-solid/faStar'
import faStarO from '@fortawesome/fontawesome-free-regular/faStar'

class YumFactorInput extends Component {
  constructor () {
    super()

    this.handleChange = this.handleChange.bind(this)
  }

  handleChange (value) {
    return () => {
      this.props.onChange(value)
    }
  }

  render () {
    return (
      <div className="field">
        {
          this.props.label
          ? <label className="label">{this.props.label}</label>
          : null
        }
        <div>
          {this.renderStars()}
        </div>
      </div>
    )
  }

  renderStars () {
    var output = []
    var value = this.props.value || 0
    for (let i = 1; i <= 5 ; i++) {
      output.push((
        <span key={i} onMouseOver={this.handleChange(i)} onClick={this.handleChange(i)}>
          <FA icon={value >= i ? faStar : faStarO} size="2x"/>
        </span>
      ))
    }
    return output
  }
}

YumFactorInput.propTypes = {
  value: PropTypes.number,
  onChange: PropTypes.func.isRequired
}

export default YumFactorInput