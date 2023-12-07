import {Component} from 'react'

import {HiOutlineSearch} from 'react-icons/hi'
import {CgPlayList} from 'react-icons/cg'
import {IoCloseCircle} from 'react-icons/io5'
import {Link, withRouter} from 'react-router-dom'

import SearchContext from '../../Context/searchContext'

import './index.css'

class Navbar extends Component {
  state = {showRouteLinks: true}

  toggleRouteLinks = () => {
    this.setState(prevState => ({showRouteLinks: !prevState.showRouteLinks}))
  }

  renderSearchView = pathname => (
    <SearchContext.Consumer>
      {value => {
        const {searchInput, onChangeSearchInput, fetchSearchMovies} = value

        const onKeyPressSearchInput = event => {
          if (event.key === 'Enter') {
            fetchSearchMovies()
          }
        }

        return (
          <li className="nav-item">
            {pathname === '/search' ? (
              <div className="search-container">
                <input
                  type="search"
                  placeholder="Search"
                  className="search-input"
                  value={searchInput}
                  onChange={onChangeSearchInput}
                  onKeyPress={onKeyPressSearchInput}
                />
                <button
                  type="button"
                  className="search-button"
                  onClick={fetchSearchMovies}
                  testid="searchButton"
                >
                  <HiOutlineSearch size={12} color="#ffffff" />
                </button>
              </div>
            ) : (
              <Link to="/search">
                <HiOutlineSearch size={20} color="#ffffff" />
              </Link>
            )}
          </li>
        )
      }}
    </SearchContext.Consumer>
  )

  renderMobileNavView = pathname => {
    const {showRouteLinks} = this.state

    return (
      <div className="nav-mobile-view">
        <div className="nav-top-section">
          <Link to="/" className="nav-link">
            <img
              className="nav-website-logo"
              src="https://res.cloudinary.com/dtkwvlezz/image/upload/f_auto,q_auto/v1/Netflix/netflixLogo"
              alt="website logo"
            />
          </Link>
          <ul className="nav-list-items">
            {this.renderSearchView(pathname)}
            <li className="nav-item">
              <button type="button" onClick={this.toggleRouteLinks}>
                <CgPlayList size={32} color="#ffffff" />
              </button>
            </li>
          </ul>
        </div>
        {showRouteLinks && (
          <div className="route-links-container">
            <ul className="nav-list-items">
              <li className="nav-route-item">
                <Link
                  to="/"
                  className={
                    pathname === '/' ? 'active-route-path' : 'nav-route-link'
                  }
                >
                  Home
                </Link>
              </li>
              <li className="nav-route-item">
                <Link
                  to="/popular"
                  className={
                    pathname === '/popular'
                      ? 'active-route-path'
                      : 'nav-route-link'
                  }
                >
                  Popular
                </Link>
              </li>
              <li className="nav-route-item">
                <Link
                  to="/account"
                  className={
                    pathname === '/account'
                      ? 'active-route-path'
                      : 'nav-route-link'
                  }
                >
                  Account
                </Link>
              </li>
            </ul>
            <button type="button" onClick={this.toggleRouteLinks}>
              <IoCloseCircle size={24} color="#ffffff" />
            </button>
          </div>
        )}
      </div>
    )
  }

  renderDesktopView = pathname => (
    <div className="nav-desktop-view">
      <ul className="nav-list-items">
        <Link to="/" className="nav-link">
          <img
            className="nav-website-logo"
            src="https://res.cloudinary.com/dtkwvlezz/image/upload/f_auto,q_auto/v1/Netflix/netflixLogo"
            alt="website logo"
          />
        </Link>
        <li className="nav-route-item">
          <Link
            to="/"
            className={
              pathname === '/' ? 'active-route-path' : 'nav-route-link'
            }
          >
            Home
          </Link>
        </li>
        <li className="nav-route-item">
          <Link
            to="/popular"
            className={
              pathname === '/popular' ? 'active-route-path' : 'nav-route-link'
            }
          >
            Popular
          </Link>
        </li>
      </ul>

      <div>
        <ul className="nav-list-items">
          {this.renderSearchView(pathname)}
          <li className="nav-route-item">
            <Link to="/account" className="nav-link">
              <img
                className="nav-profile-img"
                src="https://res.cloudinary.com/dtkwvlezz/image/upload/f_auto,q_auto/v1/Netflix/profile"
                alt="profile"
              />
            </Link>
          </li>
        </ul>
      </div>
    </div>
  )

  render() {
    const {location} = this.props
    const {pathname} = location

    return (
      <div className="nav">
        {this.renderMobileNavView(pathname)}
        {this.renderDesktopView(pathname)}
      </div>
    )
  }
}

export default withRouter(Navbar)
