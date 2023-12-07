import {Switch, Route} from 'react-router-dom'

import './App.css'

import Login from './components/Login'
import Home from './components/Home'
import PopularMovies from './components/Popular'
import Search from './components/Search'
import Account from './components/Account'
import MovieItemDetails from './components/MovieItemDetails'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'

const App = () => (
  <Switch>
    <Route exact path="/login" component={Login} />
    <ProtectedRoute exact path="/" component={Home} />
    <ProtectedRoute exact path="/popular" component={PopularMovies} />
    <ProtectedRoute exact path="/search" component={Search} />
    <ProtectedRoute exact path="/account" component={Account} />
    <ProtectedRoute exact path="/movies/:id" component={MovieItemDetails} />
    <Route component={NotFound} />
  </Switch>
)

export default App
