import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import AppContainer from './components/AppContainer/AppContainer.componet'

import HomePage from './pages/Home/Home'
import ExplorePage from './pages/Explore/Explore'
import ComparePage from './pages/Compare/Compare'
class App extends Component {
  render() {
    return (
      <AppContainer>
        <Route path="/" exact component={HomePage} />
        <Route path="/explore" component={ExplorePage} />
        <Route path="/compare" component={ComparePage} />
      </AppContainer>
    )
  }
}

export default App
