import {Component} from 'react'
import Cookies from 'js-cookie'
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

class TopRatedMovies extends Component {
  state = {apiStatus: apiStatusConstants.initial, topRatedMovies: []}

  componentDidMount() {
    this.fetchTopRatedMovies()
  }

  fetchTopRatedMovies = async () => {
    this.setState({apiStatus: apiStatusConstants.in_progress})
    const jwtToken = Cookies.get('jwt_token')

    const response = await fetch(
      'https://apis.ccbp.in/movies-app/top-rated-movies',
      {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      },
    )

    if (response.ok) {
      const data = await response.json()
      const moviesData = data.results.map(movieDetails => ({
        backdropPath: movieDetails.backdrop_path,
        id: movieDetails.id,
        overview: movieDetails.overview,
        posterPath: movieDetails.poster_path,
        title: movieDetails.title,
      }))
      this.setState({
        topRatedMovies: moviesData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderInProgressView = () => (
    <div className="category-loader-container" testid="loader">
      <Loader type="TailSpin" color="#d81f26" height={50} width={50} />
    </div>
  )

  renderFailureView = () => (
    <div className="category-failure-container">
      <RiAlertFill color="#d81f26" size={window.innerWidth < 768 ? 24 : 32} />
      <p className="category-failure-msg">
        Something went wrong. Please try again
      </p>
      <button
        type="button"
        className="category-failure-button"
        onClick={this.fetchTopRatedMovies}
      >
        Try Again
      </button>
    </div>
  )

  renderMoviesView = () => {
    const {topRatedMovies} = this.state

    return (
      <ul className="category-movies">
        <MoviesSlider moviesList={topRatedMovies} />
      </ul>
    )
  }

  renderApiStatusView = () => {
    const {apiStatus} = this.state

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
        <h1 className="category-title">Top Rated </h1>
        {this.renderApiStatusView()}
      </div>
    )
  }
}

export default TopRatedMovies
