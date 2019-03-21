import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import SideBar from '../../components/SideBar/SideBar.component'
import { Header, Image, Segment } from 'semantic-ui-react'
import Navigator from '../../components/Navigator/Navigator.component'

import withCurrentView from '../../hoc/withCurrentView'

class Explore extends Component {
  animation = 'push'

  state = {
    visible: true,
  }

  render() {
    return (
      <div>
        <SideBar>
          <Navigator />
          <Segment basic>
            <Header as="h3">Application Content</Header>
            <Image src="https://react.semantic-ui.com/images/wireframe/paragraph.png" />
          </Segment>
        </SideBar>
      </div>
    )
  }
}

export default withCurrentView(Explore)
