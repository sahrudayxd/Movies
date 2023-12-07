import {Component} from 'react'
import Loader from 'react-loader-spinner'

import {RiAlertFill} from 'react-icons/ri'

import MoviesSlider from '../MoviesSlider'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  in_progress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class OriginalMovies extends Component {
  renderInProgressView = () => (
    <div className="category-loader-container" testid="loader">
      <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
    </div>
  )

  renderFailureView = () => {
    const {fetchOriginalsMovies} = this.props
    return (
      <div className="category-failure-container">
        <RiAlertFill color="#D81F26" />
        <p className="category-failure-msg">
          Something went wrong. Please try again
        </p>
        <button
          type="button"
          className="category-failure-button"
          onClick={fetchOriginalsMovies}
        >
          Try Again
        </button>
      </div>
    )
  }

  renderMoviesView = () => {
    const {originalMovies} = this.props

    return (
      <ul className="category-movies">
        <MoviesSlider moviesList={originalMovies} />
      </ul>
    )
  }

  renderApiStatusView = () => {
    const {apiStatus} = this.props

    switch (apiStatus) {
      case apiStatusConstants.in_progress:
        return this.renderInProgressView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.success:
        return this.renderMoviesView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="home-category-container">
        <h1 className="category-title">Originals</h1>
        {this.renderApiStatusView()}
      </div>
    )
  }
}

export default OriginalMovies
