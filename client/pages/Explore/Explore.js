import React, { Component } from 'react'
import { Header, Image, Segment } from 'semantic-ui-react'

import withCurrentView from '../../hoc/withCurrentView'

class Explore extends Component {
  animation = 'push'

  state = {
    visible: true,
  }

  render() {
    return (
      <div>
        <Segment basic>
          <Header as="h3">Application Content</Header>
          <Image src="https://react.semantic-ui.com/images/wireframe/paragraph.png" />
        </Segment>
      </div>
    )
  }
}

export default withCurrentView(Explore)
