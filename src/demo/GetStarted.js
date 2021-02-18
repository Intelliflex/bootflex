import React from 'react'
import { Container, Jumbotron } from 'react-bootstrap'
import { Info, B, H, P, Spacer } from 'bootflex'

const Home = (props) => {
  // eslint-disable-next-line
  return (
    <Container fluid className='bg-white p-3'>
      <Jumbotron>
        <Container>
          <h1>Getting Started</h1>
        </Container>
      </Jumbotron>
      <Container>
        <Info justify>
          <H x4>Installation</H>
          Bootflex does not include React-Bootrap or react-data-table-component
          as dependencies so you can incorporate it easily into your existing
          React-Bootstrap enabled application without version conflicts. If you
          are not already using with of these packages you should install them.
          <Spacer />
          <P className='mb-2'>
            <B x2 primary br>
              yarn add bootflex
            </B>
            or
            <br />
            <B x2 primary br>
              npm install bootflex
            </B>
          </P>
          <P>
            The following NPM packages should also be installed (via yarn or
            npm) in your applications
            <br />
            <B primary br>
              react-bootstrap
            </B>
            <B primary br>
              react-data-table-component
            </B>
          </P>
        </Info>
        <Info justify>
          <H x4>Downloading the Demo System</H>
          The best way presently to learn Bootlfex is to download and experiment
          with this demonstration application. It is made available for download
          on Github. As time goes by I will endeavour to provide Code Sandbox
          examples on this site to assist with learning, testing and bug fixes.
          <P className='mb-2'>
            <B x2 primary br>
              Git Commond to go here
            </B>
          </P>
        </Info>
      </Container>
    </Container>
  )
}
export default Home
