import {withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'

import Navbar from '../Navbar'
import ContactUs from '../ContactUs'

import './index.css'

const Account = props => {
  const onLogoutUser = () => {
    Cookies.remove('jwt_token')

    const {history} = props
    history.replace('/login')
  }

  return (
    <div className="account-container">
      <Navbar />
      <div className="account-details">
        <h1 className="account-title">Account</h1>
        <hr className="account-hr" />
        <div className="membership-details">
          <p className="membership">Member ship</p>
          <div>
            <p className="account-username">rahul@gmail.com</p>
            <p className="account-password">Password : ************</p>
          </div>
        </div>
        <hr className="account-hr" />
        <div className="plan-details">
          <p className="plan-details-title">Plan details</p>
          <p className="plan-type">Premium</p>
          <p className="resolution">Ultra HD</p>
        </div>
        <hr className="account-hr" />
        <div className="logout-button-container">
          <button
            className="account-logout-button"
            type="button"
            onClick={onLogoutUser}
          >
            Logout
          </button>
        </div>
      </div>
      <ContactUs />
    </div>
  )
}

export default withRouter(Account)
