import React, { Component } from 'react'
import SideBar from '../../components/SideBar/SideBar.component'
import { Header, Image, Segment } from 'semantic-ui-react'

class Explore extends Component {
  animation = 'push'

  state = {
    visible: true,
  }

  render() {
    return (
      <div style={{height: '1000px'}}>
        <SideBar>
          <Segment basic>
            <Header as="h3">Application Content</Header>
            <Image src="https://react.semantic-ui.com/images/wireframe/paragraph.png" />
          </Segment>
        </SideBar>
      </div>
    )
  }
}

export default Explore
