import React, { Component } from 'react'
import { Header, Icon, Grid, Responsive } from 'semantic-ui-react'

import MyChart from '../../components/Chart/Chart'

class Group extends Component {
  state = {
    columns: 3,
  }

  handleOnUpdate = (e, { width }) => {
    let columns = 3
    if (width <= 1080) {
      columns = 1
    } else if (width <= 1440) {
      columns = 2
    } else {
      columns = 3
    }
    this.setState({ columns })
  }

  render() {
    const { columns } = this.state
    const {
      title: { ctitle, etitle, icon },
      data = [],
    } = this.props
    return data.length ? (
      <>
        <Header as="h2">
          <Icon name={icon} />
          <Header.Content>
            {etitle}
            <Header.Subheader>{ctitle}</Header.Subheader>
          </Header.Content>
        </Header>
        <Responsive
          as={Grid.Row}
          columns={columns}
          fireOnMount
          onUpdate={this.handleOnUpdate}
        >
          {data.map(item => (
            <MyChart data={item} type={item.chartType} />
          ))}
        </Responsive>
      </>
    ) : null
  }
}

export default Group
