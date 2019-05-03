import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import { Provider } from 'react-redux'

import LayoutContainer from './components/AppContainer/Layout.componet'

import HomePage from './pages/Home/Home'
import ExplorePage from './pages/Explore/Explore'

import configStore from './store'

export const store = configStore()

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <LayoutContainer>
          <Route path="/" exact component={HomePage} />
          <Route path="/explore" component={ExplorePage} />
        </LayoutContainer>
      </Provider>
    )
  }
}

export default App
