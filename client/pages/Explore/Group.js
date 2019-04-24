import React, { Component } from 'react'
import { Header, Icon, Grid } from 'semantic-ui-react'

import MyChart from '../../components/Chart/Chart'

class Group extends Component {
  render() {
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
        <Grid.Row columns={3}>
          {data.map(item => (
            <MyChart data={item} type={item.chartType} />
          ))}
        </Grid.Row>
      </>
    ) : null
  }
}

export default Group
