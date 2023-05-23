import {Component} from 'react'
import Cookies from 'js-cookie'
import BallTriangle from 'react-loader-spinner'
import './index.css'

class Profile extends Component {
  state = {
    isLoading: true,
    profileDetails: '',
    pageError: false,
  }

  componentDidMount() {
    this.getJsxProfileResponse()
  }

  getJsxProfileResponse = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const profileUrl = 'https://apis.ccbp.in/profile'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(profileUrl, options)
    if (response.ok === true) {
      const data = await response.json()

      const updatedProfileDetails = {
        name: data.profile_details.name,
        profileImageUrl: data.profile_details.profile_image_url,
        shortBio: data.profile_details.short_bio,
      }
      this.setState({
        profileDetails: {...updatedProfileDetails},
        isLoading: false,
        pageError: false,
      })
    } else {
      this.setState({
        isLoading: false,
        pageError: true,
      })
    }
  }

  getProfileDetailsView = () => {
    const {profileDetails} = this.state
    const {name, profileImageUrl, shortBio} = profileDetails
    return (
      <div className="profile-card">
        <img src={profileImageUrl} alt={name} />
        <h1 className="profile-name">{name}</h1>
        <p className="profile-bio">{shortBio}</p>
      </div>
    )
  }

  getRetryView = () => (
    <div className="retry-card">
      <button
        onClick={this.getJsxProfileResponse()}
        type="button"
        className="retry-button"
      >
        Retry
      </button>
    </div>
  )

  profileDetailsSuccessView = () => {
    const {pageError} = this.state
    switch (pageError) {
      case true:
        return this.getRetryView()
      default:
        return this.getProfileDetailsView()
    }
  }

  render() {
    const {isLoading} = this.state

    return isLoading ? (
      <div className="loader-card">
        <BallTriangle color="#00BFFF" height={80} width={80} />
      </div>
    ) : (
      this.profileDetailsSuccessView()
    )
  }
}

export default Profile
