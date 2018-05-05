import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Input from './inputs/Input'
import TextInput from './inputs/TextInput'
import YumFactorInput from './inputs/YumFactorInput'

class CakeForm extends Component {
  constructor (props) {
    super(props)

    this.state = {
      name: props.cake.name || '',
      comment: props.cake.comment || '',
      imageUrl: props.cake.imageUrl || '',
      yumFactor: props.cake.yumFactor || 0
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
  }

  handleChange (field) {
    return (value) => {
      this.setState({[field]: value})
    }
  }

  handleSubmit (e) {
    e.preventDefault()
    this.props.onSubmit(this.state)
  }

  handleCancel (e) {
    e.preventDefault()
    this.props.onCancel()
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <Input
          label="Cake Name"
          placeholder="Enter cake name here..."
          value={this.state.name}
          onChange={this.handleChange('name')}
        />
        <TextInput
          label="Cake Comment"
          placeholder="Enter cake comment here..."
          value={this.state.comment}
          onChange={this.handleChange('comment')}
        />
        <Input
          label="Cake Image"
          placeholder="Please enter image url here..."
          value={this.state.imageUrl}
          onChange={this.handleChange('imageUrl')}
        />
        <YumFactorInput
          label="Yum Factor"
          value={this.state.yumFactor}
          onChange={this.handleChange('yumFactor')}
        />

        <div className="buttons">
          <button className="button is-small is-primary" type="submit">Create</button>
          <button onClick={this.handleCancel} type="button" className="button is-text is-small">Cancel</button>
        </div>
      </form>
    )
  }
}

CakeForm.propTypes = {
  cake: PropTypes.shape({
    id: PropTypes.string,
    imageUrl: PropTypes.string,
    comment: PropTypes.string,
    yumFactor: PropTypes.number
  }),
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired
}

CakeForm.defaultProps = {
  cake: {}
}

export default CakeForm
