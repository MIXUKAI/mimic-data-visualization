import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import AppContainer from './components/AppContainer/AppContainer.componet'

import HomePage from './pages/Home/Home'
import ExplorePage from './pages/Explore/Explore'
import ComparePage from './pages/Compare/Compare'

import configStore from './store'

export const store = configStore()

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <AppContainer>
          <Route path="/" exact component={HomePage} />
          <Route path="/explore" component={ExplorePage} />
          <Route path="/compare" component={ComparePage} />
        </AppContainer>
      </Provider>
    )
  }
}

export default App
