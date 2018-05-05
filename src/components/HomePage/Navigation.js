import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import FA from '@fortawesome/react-fontawesome'
import faPlus from '@fortawesome/fontawesome-free-solid/faPlus'

class Navigation extends Component {
  render() {
    return (
      <div className="card-header">
        <h1 className="card-header-title">
          Cake App
        </h1>
        <Link to="/cake/create" className="card-header-icon">
          <span className="icon has-text-info">
            <FA icon={faPlus} size="lg"/>
          </span>
        </Link>
      </div>
    )
  }
}

export default Navigation
