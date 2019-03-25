import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  Visibility,
  Segment,
  Menu,
  Container,
  Button,
  Icon,
} from 'semantic-ui-react'
import { Link } from 'react-router-dom'

import { toggleSidebar } from '../SideBar/SideBar.duck'
class Navigator extends Component {
  render() {
    const { fixed = false, currentView, toggleSidebar } = this.props
    return (
      <Visibility
        once={false}
        // onBottomPassed={this.showFixedMenu}
        // onBottomPassedReverse={this.hideFixedMenu}
      >
        <Segment
          inverted
          textAlign="center"
          // style={{ minHeight: 700, padding: '1em 0em' }}
          vertical
        >
          <Menu
            fixed={fixed ? 'top' : null}
            inverted={!fixed}
            pointing={!fixed}
            secondary={!fixed}
            size="large"
          >
            <Button
              inverted={!fixed}
              style={{ marginLeft: '0.5em' }}
              onClick={() => toggleSidebar()}
            >
              <Icon name="sidebar" />
            </Button>
            <Container>
              {[
                { view: 'Home', route: '/' },
                { view: 'Explore', route: '/explore' },
                { view: 'Compare', route: '/compare' },
              ].map(({ view, route }) => (
                <Menu.Item
                  key={view}
                  as={Link}
                  to={route}
                  active={currentView === view}
                >
                  {view}
                </Menu.Item>
              ))}
              <Menu.Item as="a">Document</Menu.Item>
              <Menu.Item position="right">
                <Button as="a" inverted={!fixed}>
                  Log in
                </Button>
                <Button
                  as="a"
                  inverted={!fixed}
                  primary={fixed}
                  style={{ marginLeft: '0.5em' }}
                >
                  Sign Up
                </Button>
              </Menu.Item>
            </Container>
          </Menu>
        </Segment>
      </Visibility>
    )
  }
}

const mapState = state => ({
  currentView: state.navigator.currentView,
})

export default connect(
  mapState,
  { toggleSidebar }
)(Navigator)
