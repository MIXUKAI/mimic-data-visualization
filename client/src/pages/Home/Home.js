import React, { Component } from 'react'
import Head from './Head.component'
import { Container, Header } from 'semantic-ui-react'

class HomePage extends Component {
  render() {
    return (
      <div>
        <Head />
        <Container>
          <Header as="h2">Welcome!</Header>
          <p>
            The MIMIC II Visualization tool is a web based tool that allows
            users to explore and compare some of the basic trends within the
            MIMIC II database. The information presented within the tool is not
            designed to provide every tiny detail of the database, but to allow
            a snapshot of the data in the cohort(s) of one’s choosing. It’s
            design is intended for any user that may be interested in health
            care big data. However, the tool is specifically designed for
            researchers or medical doctors that may be interested in visualizing
            the basic information that the MIMIC II database contains. This tool
            incorporates exploration and comparison functionality. More
            information and instructions can be found on each respective page.
          </p>
          <p>
            Unfortunately this tool is still within its development and is still
            rather unstable at this time. While portions of it will display and
            render correctly, other times it will not. Should you be experience
            a long wait in order to retrieve data (more than five minutes),
            please refresh your page. Also of note, should your computer have a
            smaller than average amount of memory you may experience some
            notifications regarding JavaScript code encountering issues. Please
            select to continue the process, as it will eventually complete.
          </p>
          <p>
            The tool itself is based on a Linux, Apache, Postgres, PHP (LAPP)
            stack variant that pulls data from a server side backend to return a
            visual result. For more information on this you can take a look at a
            breakdown of how the tool works here.
          </p>
        </Container>
        <Container>
          <Header as="h2">About MIMIC III</Header>
          <p>
            The MIMIC II database is a public intensive care database from Beth
            Israel Deaconess Medical Centre in Boston, MA, USA and is maintained
            by MIT. This tool displays aggregate patient data from version 2.6
            of MIMIC II.
          </p>
          <p>
            For more information about MIMIC II, please visit the official MIMIC
            II website at: http://physionet.org/mimic2
          </p>
        </Container>
      </div>
    )
  }
}

export default HomePage
