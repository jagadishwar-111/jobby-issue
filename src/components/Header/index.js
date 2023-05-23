import {withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {AiFillHome} from 'react-icons/ai'
import {MdWork} from 'react-icons/md'
import {FiLogOut} from 'react-icons/fi'

import './index.css'

const Header = props => {
  const navigateToLoginPage = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  const navigateToHomePage = () => {
    const {history} = props

    history.replace('/')
  }

  const navigateToJobsPage = () => {
    const {history} = props

    history.replace('/jobs')
  }

  return (
    <div className="header-card">
      <img
        src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
        alt="website-logo"
        className="logo"
      />
      <div className="mobile-view-header-card">
        <button
          onClick={navigateToHomePage}
          className="icon-button"
          type="button"
        >
          <AiFillHome className="mobile-icon" />
        </button>
        <button
          onClick={navigateToJobsPage}
          className="icon-button"
          type="button"
        >
          <MdWork className="mobile-icon" />
        </button>
        <button
          onClick={navigateToLoginPage}
          className="icon-button"
          type="button"
        >
          <FiLogOut className="mobile-icon" />
        </button>
      </div>
      <div className="navbar-options-card">
        <button
          onClick={navigateToHomePage}
          className="icon-button"
          type="button"
        >
          <p className="navbar-options grow ">Home</p>
        </button>
        <button
          onClick={navigateToJobsPage}
          className="icon-button"
          type="button"
        >
          <p className="navbar-options grow ">Jobs</p>
        </button>
      </div>
      <button
        onClick={navigateToLoginPage}
        type="button"
        className="logout-button"
      >
        Logout
      </button>
    </div>
  )
}

export default withRouter(Header)
