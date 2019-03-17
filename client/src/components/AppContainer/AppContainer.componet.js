import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Responsive } from 'semantic-ui-react'
import Navigator from '../Navigator/Navigator.component'

const getWidth = () => {
  const isSSR = typeof window === 'undefined'

  return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth
}
class DesktopContainer extends Component {
  state = {}

  hideFixedMenu = () => this.setState({ fixed: false })
  showFixedMenu = () => this.setState({ fixed: true })

  render() {
    const { children } = this.props
    const { fixed } = this.state

    return (
      <div>
        {/* <Responsive
          getWidth={getWidth}
          minWidth={Responsive.onlyTablet.minWidth}
        > */}
          {/* <Navigator fixed={fixed} /> */}
          {children}
        {/* </Responsive> */}
      </div>
    )
  }
}

DesktopContainer.propTypes = {
  children: PropTypes.node,
}

export default DesktopContainer
