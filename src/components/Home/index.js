import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import {RiAlertFill} from 'react-icons/ri'

import Navbar from '../Navbar'
import OriginalMovies from '../HomeCategories/originalMovies'
import TrendingMovies from '../HomeCategories/trendingMovies'
import TopRatedMovies from '../HomeCategories/topRatedMovies'

import BackgroundMovieImage from './styledComponents'

import './index.css'
import ContactUs from '../ContactUs'

const apiStatusConstants = {
  initial: 'INITIAL',
  in_progress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Home extends Component {
  state = {
    posterDetails: {},
    apiStatus: apiStatusConstants.initial,
    originalMovies: [],
  }

  componentDidMount() {
    this.fetchOriginalsMovies()
  }

  fetchOriginalsMovies = async () => {
    this.setState({apiStatus: apiStatusConstants.in_progress})
    const jwtToken = Cookies.get('jwt_token')

    const response = await fetch('https://apis.ccbp.in/movies-app/originals', {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    })

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
        originalMovies: moviesData,
        apiStatus: apiStatusConstants.success,
        posterDetails:
          moviesData[Math.floor(Math.random() * moviesData.length)],
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderInProgressView = () => (
    <div className="random-movie-loader" testid="loader">
      <Loader type="TailSpin" color="#d81f26" height={50} width={50} />
    </div>
  )

  renderFailureView = () => (
    <div className="random-movie-failure">
      <RiAlertFill color="#d81f26" size={window.innerWidth < 768 ? 24 : 48} />
      <p className="random-movie-failure-msg">
        Something went wrong. Please try again
      </p>
      <button
        type="button"
        className="random-movie-failure-button"
        onClick={this.fetchOriginalsMovies}
      >
        Try Again
      </button>
    </div>
  )

  renderPosterMovieDetails = () => {
    const {posterDetails} = this.state
    const {title, overview} = posterDetails
    return (
      <div className="poster-details">
        <h1 className="poster-title">{title}</h1>
        <h1 className="poster-overview">{overview}</h1>
        <button type="button" className="play-button">
          Play
        </button>
      </div>
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
        return this.renderPosterMovieDetails()
      default:
        return null
    }
  }

  renderNavbarPosterView = () => {
    const {posterDetails, apiStatus} = this.state
    const {posterPath, backdropPath} = posterDetails

    return (
      <BackgroundMovieImage
        $apiStatus={apiStatus}
        $posterPath={posterPath}
        $backdropPath={backdropPath}
      >
        <Navbar />
        {this.renderApiStatusView()}
      </BackgroundMovieImage>
    )
  }

  render() {
    const {originalMovies, apiStatus} = this.state
    return (
      <div className="home-container">
        {this.renderNavbarPosterView()}
        <TrendingMovies />
        <TopRatedMovies />
        <OriginalMovies
          originalMovies={originalMovies}
          apiStatus={apiStatus}
          fetchOriginalsMovies={this.fetchOriginalsMovies}
        />
        <ContactUs />
      </div>
    )
  }
}

export default Home
