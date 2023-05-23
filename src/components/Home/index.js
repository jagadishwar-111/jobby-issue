import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import Header from '../Header'
import './index.css'

const Home = props => {
  const jwtToken = Cookies.get('jwt_token')
  if (jwtToken === '') {
    return <Redirect to="/login" />
  }

  const navigateToJobsPage = () => {
    const {history} = props
    history.replace('/jobs')
  }

  return (
    <div className="container">
      <Header />
      <div className="home-page-body">
        <h1 className="home-page-heading">Find The Job That Fits Your Life</h1>
        <p className="home-page-description">
          Millions of people are searching for jobs, salary information, company
          reviews. Find the job that fits your abilities and potential.
        </p>
        <button
          onClick={navigateToJobsPage}
          type="button"
          className="grow find-jobs-button"
        >
          Find Jobs
        </button>
      </div>
    </div>
  )
}

export default Home
