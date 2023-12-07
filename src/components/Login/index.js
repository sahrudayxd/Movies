import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import './index.css'

class Login extends Component {
  state = {
    username: 'rahul',
    password: 'rahul@2021',
    showFailureMsg: false,
    failureMsg: '',
  }

  authenticateSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 30})

    const {history} = this.props
    history.replace('/')
  }

  authenticateFailure = errorMsg => {
    this.setState({showFailureMsg: true, failureMsg: errorMsg})
  }

  onSubmitUserDetails = async event => {
    event.preventDefault()

    const {username, password} = this.state
    const userDetails = {username, password}
    const response = await fetch('https://apis.ccbp.in/login', {
      method: 'POST',
      body: JSON.stringify(userDetails),
    })
    const data = await response.json()

    if (response.ok) {
      this.authenticateSuccess(data.jwt_token)
    } else {
      this.authenticateFailure(data.error_msg)
    }
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  renderUsernameView = () => {
    const {username} = this.state

    return (
      <div className="login-label-container">
        <label className="login-label" htmlFor="Username">
          USERNAME
        </label>
        <input
          id="Username"
          value={username}
          placeholder="Username"
          className="login-input"
          onChange={this.onChangeUsername}
        />
      </div>
    )
  }

  renderPasswordView = () => {
    const {password} = this.state

    return (
      <div className="login-label-container">
        <label className="login-label" htmlFor="Password">
          PASSWORD
        </label>
        <input
          id="Password"
          type="password"
          value={password}
          placeholder="Password"
          className="login-input"
          onChange={this.onChangePassword}
        />
      </div>
    )
  }

  renderForm = () => {
    const {failureMsg, showFailureMsg} = this.state

    return (
      <form className="login-form" onSubmit={this.onSubmitUserDetails}>
        <h1 className="login-title">Login</h1>
        {this.renderUsernameView()}
        {this.renderPasswordView()}
        {showFailureMsg && <p className="login-failure-msg">{failureMsg}</p>}
        <button type="submit" className="sign-in-button">
          Sign In
        </button>
      </form>
    )
  }

  render() {
    const accessToken = Cookies.get('jwt_token')

    if (accessToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="login-bg-container">
        <img
          className="login-website-logo"
          src="https://res.cloudinary.com/dtkwvlezz/image/upload/f_auto,q_auto/v1/Netflix/netflixLogo"
          alt="login website logo"
        />
        <div className="form-container">{this.renderForm()}</div>
      </div>
    )
  }
}

export default Login
