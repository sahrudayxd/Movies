import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import Navbar from '../Navbar'
import ContactUs from '../ContactUs'
import Failure from '../Failure'

import './index.css'
import PopularSearchMovies from '../PopularSearchMovies'

const apiStatusConstants = {
  initial: 'INITIAL',
  in_progress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class PopularMovies extends Component {
  state = {apiStatus: apiStatusConstants.initial, popularMovies: []}

  componentDidMount() {
    this.fetchPopularMovies()
  }

  fetchPopularMovies = async () => {
    this.setState({apiStatus: apiStatusConstants.in_progress})
    const jwtToken = Cookies.get('jwt_token')

    const response = await fetch(
      'https://apis.ccbp.in/movies-app/popular-movies',
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
        posterPath: movieDetails.poster_path,
        title: movieDetails.title,
      }))
      this.setState({
        popularMovies: moviesData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderInProgressView = () => (
    <div className="popular-movies-loader" testid="loader">
      <Loader type="TailSpin" color="#d81f26" height={50} width={50} />
    </div>
  )

  renderPopularMoviesView = () => {
    const {popularMovies} = this.state

    return (
      <div className="movies-responsive-width">
        <PopularSearchMovies movies={popularMovies} />
      </div>
    )
  }

  renderApiStatusView = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.in_progress:
        return this.renderInProgressView()
      case apiStatusConstants.failure:
        return <Failure fetchMovies={this.fetchPopularMovies} />
      case apiStatusConstants.success:
        return this.renderPopularMoviesView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="popular-movies-bg">
        <Navbar />
        {this.renderApiStatusView()}
        <ContactUs />
      </div>
    )
  }
}

export default PopularMovies
