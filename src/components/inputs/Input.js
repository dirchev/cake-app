import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Input extends Component {
  getEventHandlers () {
    var wrap = function (handler) {
      return (event) => {
        let value = event.target.value
        handler(value, event)
      }
    }
    var eventHandlers = {}
    if (this.props.onChange) eventHandlers.onChange = wrap(this.props.onChange)
    return eventHandlers
  }

  render () {
    return (
      <div className="field">
        {
          this.props.label
          ? <label className="label">{this.props.label}</label>
          : null
        }
        <div className='control'>
          <input
            className={`input`}
            type={this.props.type}
            placeholder={this.props.placeholder}
            value={this.props.value}
            {...this.getEventHandlers()}
          />
        </div>
      </div>
    )
  }
}

Input.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  defaultValue: PropTypes.any,
  value: PropTypes.any,
  onChange: PropTypes.func,
  iconLeft: PropTypes.string,
  iconRight: PropTypes.string,
  autoFocus: PropTypes.bool,
  type: PropTypes.string,
  className: PropTypes.string,
}

Input.defaultProps = {
  className: '',
  type: 'text',
  value: null
}

export default Input