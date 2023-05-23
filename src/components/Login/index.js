import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    errorMessage: '',
  }

  getUsername = event => {
    this.setState({
      username: event.target.value,
    })
  }

  getPassword = event => {
    this.setState({
      password: event.target.value,
    })
  }

  onSubmitSuccess = jwtToken => {
    this.setState({
      username: '',
      password: '',
    })
    Cookies.set('jwt_token', jwtToken, {expires: 30, path: '/'})
    const {history} = this.props
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({
      errorMessage: errorMsg,
    })
  }

  submitUsernameAndPassword = async event => {
    event.preventDefault()
    const {username, password} = this.state
    if (username !== '' && password !== '') {
      const url = 'https://apis.ccbp.in/login'
      const userDetails = {username, password}
      const options = {
        method: 'POST',
        body: JSON.stringify(userDetails),
      }
      const response = await fetch(url, options)
      const data = await response.json()
      if (response.ok === true) {
        this.onSubmitSuccess(data.jwt_token)
      } else {
        this.onSubmitFailure(data.error_msg)
      }
    }
  }

  render() {
    const {
      username,
      password,

      errorMessage,
    } = this.state

    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="login-container">
        <div className="login-card">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website-logo"
            className="login-logo"
          />
          <form
            onSubmit={this.submitUsernameAndPassword}
            className="form-login-card"
          >
            <div className="label-input-card">
              <label className="label-element" htmlFor="username">
                USERNAME
              </label>
              <input
                onChange={this.getUsername}
                value={username}
                className="login-input-element"
                id="username"
                type="text"
              />
            </div>

            <div className="label-input-card">
              <label className="label-element" htmlFor="password">
                PASSWORD
              </label>
              <input
                onChange={this.getPassword}
                value={password}
                className="login-input-element"
                id="password"
                type="password"
              />
            </div>

            <button className="login-button" type="submit">
              Login
            </button>
            <p className="error-text">{errorMessage}</p>
          </form>
        </div>
      </div>
    )
  }
}

export default Login
