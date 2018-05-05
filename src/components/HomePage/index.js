import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import CakePreview from './CakePreview'
import Navigation from './Navigation'
import PropTypes from 'prop-types'
import actions from '../../redux/action-creators'
import FA from '@fortawesome/react-fontawesome'
import faSpinner from '@fortawesome/fontawesome-free-solid/faSpinner'

class HomePage extends Component {
  render() {
    return (
      <div className="card">
        <Navigation />
        <div className="card-content">
          <div>
            {
              this.props.unsyncedCakes.map((cake) => {
                if (cake.error) {
                  return (
                    <div key={cake.id} className="notification is-danger">
                      <button className="delete" onClick={this.props.discardCake(cake.id)}></button>
                      <span><strong>{cake.name}</strong> had some problems syncing. Fix it <Link to={`/cake/${cake.id}/edit`}>here</Link>.</span>
                    </div>
                  )
                } else  {
                  return (
                    <div key={cake.id} className="notification">
                      <span className="icon"><FA icon={faSpinner} spin /></span>
                      <span>Getting <strong>{cake.name}</strong> baked!</span>
                    </div>
                  )
                }
              })
            }
          </div>
          <div className="columns is-multiline">
              {
                this.props.cakes.map((cake) => (
                  <div key={cake.id} className="column is-one-third-tablet is-tablet">
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
    imageUrl: PropTypes.string.isRequired,
    comment: PropTypes.string.isRequired,
    yumFactor: PropTypes.number.isRequired
  })).isRequired,
  unsyncedCakes: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    comment: PropTypes.string.isRequired,
    yumFactor: PropTypes.number.isRequired
  })).isRequired
}

const mapStateToProps = (state) => {
  const cakesArr = Object.keys(state.cakes).map((cakeId) => state.cakes[cakeId])
  return {
    unsyncedCakes: cakesArr.filter((c) => !c.synced),
    cakes: cakesArr.filter((c) => c.synced)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    discardCake: (cakeId) => (e) => {
      e.preventDefault()
      dispatch(actions.discardCake(cakeId))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage)
