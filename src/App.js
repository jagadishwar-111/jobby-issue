import {Switch, Route} from 'react-router-dom'

import Home from './components/Home'
import Login from './components/Login'
import Jobs from './components/Jobs'
import JobDetails from './components/JobDetails'
import ProtectedRoute from './components/ProtectedRoute'
import NotFound from './components/NotFound'

import './App.css'

const App = () => (
  <div>
    <Switch>
      <Route exact path="/login" component={Login} />
      <ProtectedRoute exact path="/" component={Home} />

      <ProtectedRoute exact path="/jobs" component={Jobs} />
      <ProtectedRoute exact path="/jobs/:id" component={JobDetails} />
      <Route component={NotFound} />
    </Switch>
  </div>
)

export default App
