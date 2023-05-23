import {Component} from 'react'
import Cookies from 'js-cookie'
import {MdLocationOn} from 'react-icons/md'
import {AiFillStar} from 'react-icons/ai'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import Dna from 'react-loader-spinner'
import SimilarJobsItem from '../SimilarJobsItem'

import Header from '../Header'
import './index.css'

class JobDetails extends Component {
  state = {
    jobDetails: '',
    similarJobs: '',
    lifeAtCompany: '',
    skills: '',
    isLoading: true,
  }

  componentDidMount() {
    this.getJobDetailInfo()
  }

  getJobDetailInfo = async () => {
    const {match} = this.props

    const {params} = match
    const {id} = params
    const jobDetailUrl = `https://apis.ccbp.in/jobs/${id}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(jobDetailUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = {
        jobDetails: data.job_details,
        similarJobs: data.similar_jobs,
      }

      const {jobDetails, similarJobs} = updatedData

      const updatedJobDetails = {
        companyLogoUrl: jobDetails.company_logo_url,

        companyWebsiteUrl: jobDetails.company_website_url,

        employmentType: jobDetails.employment_type,

        id: jobDetails.id,

        jobDescription: jobDetails.job_description,

        lifeAtCompany: jobDetails.life_at_company,

        location: jobDetails.location,

        packagePerAnnum: jobDetails.package_per_annum,

        rating: jobDetails.rating,

        skills: jobDetails.skills,

        title: jobDetails.title,
      }

      const updatedSimilarJobs = similarJobs.map(eachJob => ({
        companyLogoUrl: eachJob.company_logo_url,
        employmentType: eachJob.employment_type,
        id: eachJob.id,
        jobDescription: eachJob.job_description,
        location: eachJob.location,

        rating: eachJob.rating,

        title: eachJob.title,
      }))

      const {lifeAtCompany, skills} = updatedJobDetails

      const updatedLifeAtCompany = {
        description: lifeAtCompany.description,
        imageUrl: lifeAtCompany.image_url,
      }
      const updatedSkills = skills.map(eachSkill => ({
        imageUrl: eachSkill.image_url,
        name: eachSkill.name,
      }))

      this.setState({
        jobDetails: updatedJobDetails,
        similarJobs: updatedSimilarJobs,
        lifeAtCompany: updatedLifeAtCompany,
        skills: updatedSkills,
        isLoading: false,
      })
    }
  }

  getJobDetailView = () => {
    const {jobDetails, skills, lifeAtCompany, similarJobs} = this.state

    const {
      companyLogoUrl,
      employmentType,
      jobDescription,
      location,
      packagePerAnnum,
      rating,
      title,
    } = jobDetails
    const {description, imageUrl} = lifeAtCompany

    return (
      <div>
        <div className="detail-list-card">
          <div className="logo-title-rating-star-card">
            <img src={companyLogoUrl} alt="abc" className="company-logo" />
            <div>
              <h2 className="title-text">{title}</h2>
              <div className="rating-star-card">
                <AiFillStar className="icons-1" />
                <p className="rating-text">{rating}</p>
              </div>
            </div>
          </div>

          <div className="location-employment-card">
            <div className="inner-left-card">
              <div className="loc-bre-card">
                <MdLocationOn className="icons-location" />
                <p className="icon-2-text">{location}</p>
              </div>
              <div className="loc-bre-card">
                <BsFillBriefcaseFill className="icons-case" />
                <p className="icon-2-text">{employmentType}</p>
              </div>
            </div>
            <p className="package-text">{packagePerAnnum}</p>
          </div>
          <hr className="line" />
          <div className="description-card">
            <h2 className="desc-heading">Description</h2>
            <p className="desc-text">{jobDescription}</p>
          </div>
          <h2 className="desc-heading">Skills</h2>
          <ul className="skills-container">
            {skills.map(eachSkill => (
              <li className="skill-card">
                <img
                  src={eachSkill.imageUrl}
                  alt="skill"
                  className="skill-image"
                />
                <p className="skill-text">{eachSkill.name}</p>
              </li>
            ))}
          </ul>
          <div className="life-card">
            <div className="life-text-card">
              <h2 className="desc-heading">Life at Company</h2>
              <p className="skill-text">{description}</p>
            </div>
            <img src={imageUrl} alt="life" className="life-company-image" />
          </div>
        </div>

        <ul className="similar-jobs-container">
          {similarJobs.map(eachJob => (
            <SimilarJobsItem eachJob={eachJob} />
          ))}
        </ul>
      </div>
    )
  }

  render() {
    const {isLoading} = this.state
    return (
      <div className="job-detail-container">
        <Header />
        {isLoading ? (
          <div className="loader-card">
            <Dna color="#00BFFF" height={80} width={80} />
          </div>
        ) : (
          this.getJobDetailView()
        )}
      </div>
    )
  }
}

export default JobDetails
