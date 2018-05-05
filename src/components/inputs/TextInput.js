import React, { Component } from 'react'

class Textarea extends Component {
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
          <textarea
            className='textarea'
            type={this.props.type}
            placeholder={this.props.placeholder}
            value={this.props.value}
            rows={this.props.rows}
            colums={this.props.columns}
            {...this.getEventHandlers()}
          />
        </div>
      </div>
    )
  }
}

Textarea.defaultProps = {
  className: '',
  type: 'text',
  value: null
}

export default Textarea