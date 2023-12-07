import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import Navbar from '../Navbar'
import PopularSearchMovies from '../PopularSearchMovies'

import './index.css'
import SearchContext from '../../Context/searchContext'
import Failure from '../Failure'

const apiStatusConstants = {
  initial: 'INITIAL',
  in_progress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Search extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    searchMovies: [],
    searchInput: '',
  }

  fetchSearchMovies = async () => {
    const {searchInput} = this.state

    if (searchInput !== '') {
      this.setState({apiStatus: apiStatusConstants.in_progress})
      const jwtToken = Cookies.get('jwt_token')

      const response = await fetch(
        `https://apis.ccbp.in/movies-app/movies-search?search=${searchInput}`,
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
          searchMovies: moviesData,
          apiStatus: apiStatusConstants.success,
        })
      } else {
        this.setState({apiStatus: apiStatusConstants.failure})
      }
    }
  }

  renderInProgressView = () => (
    <div className="search-movies-loader" testid="loader">
      <Loader type="TailSpin" color="#d81f26" height={50} width={50} />
    </div>
  )

  renderNoSearchResults = () => {
    const {searchInput} = this.state
    return (
      <div className="no-movies-container">
        <img
          className="no-movies-img"
          src="https://res.cloudinary.com/dtkwvlezz/image/upload/f_auto,q_auto/v1/Netflix/no-search-results"
          alt="no movies"
        />
        <p className="no-movies-msg">{`Your search for ${searchInput} did not find any matches.`}</p>
      </div>
    )
  }

  renderSearchMoviesView = () => {
    const {searchMovies} = this.state

    return (
      <>
        {searchMovies.length === 0 ? (
          this.renderNoSearchResults()
        ) : (
          <div className="movies-responsive-width">
            <PopularSearchMovies movies={searchMovies} />
          </div>
        )}
      </>
    )
  }

  renderApiStatusView = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.in_progress:
        return this.renderInProgressView()
      case apiStatusConstants.failure:
        return <Failure fetchMovies={this.fetchSearchMovies} />
      case apiStatusConstants.success:
        return this.renderSearchMoviesView()
      default:
        return null
    }
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  render() {
    const {searchInput} = this.state

    return (
      <SearchContext.Provider
        value={{
          searchInput,
          onChangeSearchInput: this.onChangeSearchInput,
          fetchSearchMovies: this.fetchSearchMovies,
        }}
      >
        <div className="search-movies-bg">
          <Navbar />
          {this.renderApiStatusView()}
        </div>
      </SearchContext.Provider>
    )
  }
}

export default Search
