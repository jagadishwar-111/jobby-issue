import {Component} from 'react'
import Cookies from 'js-cookie'
import BallTriangle from 'react-loader-spinner'
import {BsSearch} from 'react-icons/bs'
import Header from '../Header'
import Profile from '../Profile'
import EmploymentSalary from '../EmploymentSalary'

import EachJobItem from '../EachJobItem'

import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

class Jobs extends Component {
  state = {
    isLoading: true,
    employmentType: '',
    minimumPackage: '',
    searchInput: '',
    jobsList: [],
  }

  componentDidMount() {
    this.getJobsList()
  }

  getJobsList = async () => {
    const {employmentType, minimumPackage, searchInput} = this.state
    const jwtToken = Cookies.get('jwt_token')
    const jobsUrl = `https://apis.ccbp.in/jobs?employment_type=${employmentType}&minimum_package=${minimumPackage}&search=${searchInput}`

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(jobsUrl, options)
    if (response.ok === true) {
      const data = await response.json()

      const updatedJobsData = data.jobs.map(eachJob => ({
        companyLogoUrl: eachJob.company_logo_url,
        employmentType: eachJob.employment_type,
        id: eachJob.id,
        location: eachJob.location,
        packagePerAnnum: eachJob.package_per_annum,
        rating: eachJob.rating,
        title: eachJob.title,
        jobDescription: eachJob.job_description,
      }))

      this.setState({
        jobsList: updatedJobsData,
        searchInput: '',
        isLoading: false,
      })
    }
  }

  setSearchInputValue = event => {
    this.setState({
      searchInput: event.target.value,
    })
  }

  getRelatedJobsWithEnter = event => {
    if (event.key === 'Enter') {
      this.getJobsList()
    }
  }

  getRelatedJobsWithIcon = () => {
    this.getJobsList()
  }

  getJobsListJsx = () => {
    const {jobsList} = this.state
    return (
      <ul className="job-container1">
        {jobsList.length === 0 ? (
          <div className="no-jobs-card">
            <img
              src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
              alt="no-jobs"
              className="no-jobs-image"
            />
            <h1 className="no-jobs-heading">No Jobs Found</h1>
            <p className="no-jobs-para">
              We could not find any jobs try another filters
            </p>
          </div>
        ) : (
          jobsList.map(eachJobDetails => (
            <EachJobItem
              eachJobDetails={eachJobDetails}
              key={eachJobDetails.id}
            />
          ))
        )}
      </ul>
    )
  }

  passCheckBoxValue = valueC => {
    this.setState({
      employmentType: valueC,
    })
  }

  passRadioValue = valueR => {
    this.setState({
      minimumPackage: valueR,
    })
  }

  render() {
    const {isLoading, searchInput} = this.state

    return (
      <div className="job-container">
        <Header />
        <div className="jobs-page-card">
          <div className="jobs-page-left-part-card">
            <Profile />
            <EmploymentSalary
              employmentTypesList={employmentTypesList}
              salaryRangesList={salaryRangesList}
              passCheckBoxValue={this.passCheckBoxValue}
              passRadioValue={this.passRadioValue}
            />
          </div>
          <div className="jobs-page-left-right-card">
            <div className="jobs-list-container">
              <div className="search-card">
                <input
                  onKeyDown={this.getRelatedJobsWithEnter}
                  onChange={this.setSearchInputValue}
                  value={searchInput}
                  className="input-element"
                  type="search"
                />
                <BsSearch
                  onClick={this.getRelatedJobsWithIcon}
                  className="search-icon"
                />
              </div>
              {isLoading ? (
                <div className="loader-card">
                  <BallTriangle color="#00BFFF" height={80} width={80} />
                </div>
              ) : (
                this.getJobsListJsx()
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Jobs
