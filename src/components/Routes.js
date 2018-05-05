import React, { Component, Fragment } from 'react'
import { Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'

import HomePage from './HomePage'
import CakeCreatePage from './CakeCreatePage'
import CakeEditPage from './CakeEditPage'
import CakePage from './CakePage'

class Routes extends Component {
  render () {
    return (
      <div className="container">
        {
          this.props.loading
          ? (
            <div className="section">
              <div className="notification is-info">Loading...</div>
            </div>
          )
          : (
            <ConnectedRouter history={this.props.history}>
              <Fragment>
                <Route exact path="/" component={HomePage} />
                <Switch>
                  <Route exact path="/cake/create" component={CakeCreatePage} />
                  <Route exact path="/cake/:id" component={CakePage} />
                  <Route exact path="/cake/:id/edit" component={CakeEditPage} />
                </Switch>
              </Fragment>
            </ConnectedRouter>
          )
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.ui.loading
  }
}

export default connect(mapStateToProps)(Routes)