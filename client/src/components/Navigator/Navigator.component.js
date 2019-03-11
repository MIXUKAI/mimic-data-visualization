import React, { Component } from 'react'
import { Visibility, Segment, Menu, Container, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

class Navigator extends Component {
  render() {
    const { fixed } = this.props
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
            <Container>
              <Menu.Item as={Link} to="/" active>
                Home
              </Menu.Item>
              <Menu.Item as={Link} to="explore">
                Explore
              </Menu.Item>
              <Menu.Item as={Link} to="compare">
                Compare
              </Menu.Item>
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

export default Navigator
