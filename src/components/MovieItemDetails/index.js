import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {Link} from 'react-router-dom'

import Navbar from '../Navbar'
import ContactUs from '../ContactUs'
import Failure from '../Failure'

import BackgroundMovieImage from '../Home/styledComponents'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  in_progress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class MovieItemDetails extends Component {
  state = {movieDetails: {}, apiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.fetchMovieDetails()
  }

  componentDidUpdate(prevProps) {
    window.scrollTo(0, 0)
    const {match} = this.props
    const {params} = match
    const {id} = params
    if (prevProps.match.params.id !== id) {
      this.fetchMovieDetails()
    }
  }

  fetchMovieDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.in_progress})
    const jwtToken = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://apis.ccbp.in/movies-app/movies/${id}`
    const response = await fetch(url, {
      headers: {
        Authorization: `BEARER ${jwtToken}`,
      },
    })
    if (response.ok) {
      const data = await response.json()
      const movieDetails = {
        adult: data.movie_details.adult,
        backdropPath: data.movie_details.backdrop_path,
        budget: data.movie_details.budget,
        genres: data.movie_details.genres.map(genre => ({
          id: genre.id,
          name: genre.name,
        })),
        id: data.movie_details.id,
        overview: data.movie_details.overview,
        posterPath: data.movie_details.poster_path,
        releaseDate: data.movie_details.release_date,
        runtime: data.movie_details.runtime,
        similarMovies: data.movie_details.similar_movies.map(similarMovie => ({
          id: similarMovie.id,
          backdropPath: similarMovie.backdrop_path,
          posterPath: similarMovie.poster_path,
          title: similarMovie.title,
        })),
        spokenLanguages: data.movie_details.spoken_languages.map(language => ({
          englishName: language.english_name,
          id: language.id,
        })),
        title: data.movie_details.title,
        voteAverage: data.movie_details.vote_average,
        voteCount: data.movie_details.vote_count,
      }
      this.setState({movieDetails, apiStatus: apiStatusConstants.success})
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderInProgressView = () => (
    <div className="movie-details-loader-container" testid="loader">
      <Loader type="TailSpin" color="#d81f26" height={50} width={50} />
    </div>
  )

  minutesToHourMinute = minutes => {
    const hours = Math.floor(minutes / 60)
    const remainingMinutes = minutes % 60

    const formattedTime =
      (hours > 0 ? `${hours}h` : '') +
      (remainingMinutes > 0 ? ` ${remainingMinutes}m` : '')

    return formattedTime
  }

  renderMoreDetails = () => {
    const {movieDetails} = this.state
    const {
      releaseDate,
      genres,
      spokenLanguages,
      voteCount,
      voteAverage,
      budget,
    } = movieDetails

    return (
      <div className="more-details">
        <div className="more-details-width">
          <h1 className="more-details-title">Genres</h1>
          <ul className="more-details-li">
            {genres.map(details => (
              <li key={details.id}>
                <p className="more-details-li-item">{details.name}</p>
              </li>
            ))}
          </ul>
        </div>
        <div className="more-details-width">
          <h1 className="more-details-title">Audio Available</h1>
          <ul className="more-details-li">
            {spokenLanguages.map(details => (
              <li key={details.id}>
                <p className="more-details-li-item">{details.englishName}</p>
              </li>
            ))}
          </ul>
        </div>
        <div className="more-details-width">
          <h1 className="more-details-title">Rating Count</h1>
          <p className="more-details-des">{voteCount}</p>
          <h1 className="more-details-title">Rating Average</h1>
          <p className="more-details-des">{voteAverage}</p>
        </div>
        <div className="more-details-width">
          <h1 className="more-details-title">Budget</h1>
          <p className="more-details-des">{budget}</p>
          <h1 className="more-details-title">Release Date</h1>
          <p className="more-details-des">{releaseDate}</p>
        </div>
      </div>
    )
  }

  renderSimilarMovies = () => {
    const {movieDetails} = this.state
    const {similarMovies} = movieDetails

    return (
      <ul className="similar-movies-li">
        {similarMovies.map(similarMovie => {
          const {id, backdropPath, title} = similarMovie
          return (
            <li className="similar-movie-item" key={id}>
              <Link to={`/movies/${id}`}>
                <img
                  src={backdropPath}
                  alt={title}
                  className="similar-movie-img"
                />
              </Link>
            </li>
          )
        })}
      </ul>
    )
  }

  renderSuccessView = () => {
    const {movieDetails} = this.state
    const {title, runtime, adult, releaseDate, overview} = movieDetails
    const formattedTime = this.minutesToHourMinute(runtime)
    const releaseYear = new Date(releaseDate).getFullYear()

    return (
      <div className="movie-details">
        <h1 className="movie-title">{title}</h1>
        <div className="flex-container">
          <p className="movie-run-time-year">{formattedTime}</p>
          <p className="censor-rating">{adult ? 'A' : 'U/A'}</p>
          <p className="movie-run-time-year">{releaseYear}</p>
        </div>
        <p className="movie-overview">{overview}</p>
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
        return <Failure fetchMovies={this.fetchMovieDetails} />
      case apiStatusConstants.success:
        return this.renderSuccessView()
      default:
        return null
    }
  }

  render() {
    const {apiStatus, movieDetails} = this.state
    const {backdropPath, posterPath} = movieDetails

    return (
      <div className="movie-item-details-container">
        <BackgroundMovieImage
          $apiStatus={apiStatus}
          $posterPath={posterPath}
          $backdropPath={backdropPath}
        >
          <Navbar />
          {this.renderApiStatusView()}
        </BackgroundMovieImage>
        {apiStatus === apiStatusConstants.success ? (
          <div className="more-details-padding">
            {this.renderMoreDetails()}
            <h1 className="similar-movies-title">More like this</h1>
            {this.renderSimilarMovies()}
          </div>
        ) : null}
        <ContactUs />
      </div>
    )
  }
}

export default MovieItemDetails
