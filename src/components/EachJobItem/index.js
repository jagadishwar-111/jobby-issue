import {MdLocationOn} from 'react-icons/md'
import {AiFillStar} from 'react-icons/ai'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {Link} from 'react-router-dom'

import './index.css'

const EachJobItem = props => {
  const {eachJobDetails} = props

  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
    id,
  } = eachJobDetails
  const path = `/jobs/${id}`
  return (
    <Link className="link-style" to={path}>
      <li className="job-list-card">
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
      </li>
    </Link>
  )
}

export default EachJobItem
