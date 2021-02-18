import React, { useEffect, useState } from 'react'
//import { Link } from 'react-router-dom'
import {
  Container,
  Row,
  Col,
  Jumbotron,
  Tabs,
  Tab,
  Button,
  Table
} from 'react-bootstrap'
import { useFlex, useRecord, Layout } from 'bootflex'
import { Spacer, Code, Info, Lead } from 'bootflex'
import { SampleNav, DemoSmallPanel } from './Shared'
import Minimal from './Minimal'

const SampleUI = ({ children }) => {
  const [state, STATE] = useRecord({
    lorem: false,
    layout: 'fixed',
    content: true
  })
  const [flex, _state] = useFlex()

  // HIDE GLOBAL SIDEBAR FOR THIS PAGE
  useEffect(() => {
    flex._setPanel('main-left', false)
    return () => {
      flex._setPanel('main-left', true)
    }
    // eslint-disable-next-line
  }, [])

  return (
    <Layout id='demo-layout' className='bg-noise p-4'>
      <Layout.Header
        //sticky
        style={{ zIndex: 1019 }}
        className='flex-rounded flex-shadow bg-gradient-blue-reverse py-1 px-2 '
      >
        <SampleNav />
      </Layout.Header>
      <Layout.Body
        id='demo-body'
        variant={state.layout}
        className='pb-1 bg-white overflow-y'
        controlButtons={
          // Chevron Button Will Show if Sidebar is Collapsed
          <Layout.Button
            id='demo-toggle-left'
            variant='chevron-right'
            left='0'
            top='50%'
            color='purple'
            onClick={() => flex._togglePanel('demo-left')}
            visible={!flex._get('panel.demo-left', true)}
          />
        }
      >
        <Layout.Responsive id='demo-responsive'>
          <Layout.Panel
            id='demo-content'
            target='demo-responsive'
            className='p-2'
          >
            <Spacer />
            <Jumbotron className='mr-1'>
              <Container>
                <h1>Bootflex User Interface / Layout Control</h1>
                <Lead>Introduction and Example</Lead>
                <h6 className='text-info'>
                  Current Layout variant is is {state.layout} - Screen Size{' '}
                  {_state.dom.screenSize}
                </h6>
              </Container>
            </Jumbotron>
            <Container fluid className='p-1'>
              <Row>
                <Col size='12'>
                  <Info className='text-justify'>{introText1}</Info>
                  <Info className='text-justify'>{introText2}</Info>
                </Col>
              </Row>
            </Container>

            <Spacer />
            <Container fluid>
              <ButtonPanel STATE={STATE} state={state} />
            </Container>
            <Spacer size='2' />
            <TabContent visible={state.content} />
          </Layout.Panel>
          <Layout.Panel
            id='demo-left'
            target='demo-responsive'
            className='p-2 bg-light-gray'
            visibleDefault={false}
            position='left'
            width='150px'
            controlButtons={
              <>
                <Layout.Button
                  id='main-chev-left'
                  variant='chevron-left'
                  right='0'
                  top='50%'
                  color='purple'
                  onClick={() => flex._togglePanel('demo-left')}
                />
              </>
            }
          >
            <DemoSmallPanel />
          </Layout.Panel>
        </Layout.Responsive>
      </Layout.Body>
      <Layout.Footer
        height='50px'
        className='flex-rounded bg-gradient-blue-reverse text-light'
      >
        THIS FOOTER WILL ADJUST HEIGHT TO CONTEXT - OR YOUR CAN SET HEIGHT
        MANUALLY
      </Layout.Footer>
    </Layout>
  )
}

const introText1 = ` This component (as shown bound by the blue gradient header and footer) demonstrates the Bootflex 
Layout control that can be used anywhere in your application (although the first usage
instance will typically wrap your entire application in order for it to to take advantage
of a consistent user interface and the context controls). Note: This demo layout is wrapped inside 
the applicaton Bootflex layout (with dark header and footer that provides the user interface for this entire web site). The Layout component provides a
body area between the header and footer. Panels within the body may be contrained (fixed) or free flowing (grow). 
Panels will collapse according to breakpoints on smaller devices into a vertical layout. When your
Apps content extends beyond the viewport contained between the header and footer
scrollbars will automatically appear according the fixed / grow property of the body layout.`
const introText2 = `To see this in action, try putting your browser into development mode so you can adjust layout sizes and experiment with mobile device layouts in portrait and landscape orientation.
`

const ButtonPanel = (props) => {
  const { STATE, state } = props
  return (
    <Row>
      <Col lg='3' sm='6' className='p-2'>
        <Button
          className='m-1 mb-2 h-100 w-100 '
          onClick={() =>
            STATE.set({ layout: state.layout === 'grow' ? 'fixed' : 'grow' })
          }
        >
          Toggle Layout
        </Button>
      </Col>
      <Col lg='3' sm='6' className='p-2'>
        <Button
          variant='success'
          className='m-1 mb-2 h-100 w-100'
          onClick={() => STATE.set({ content: !state.content })}
        >
          Toggle Content
        </Button>
      </Col>
    </Row>
  )
}

const TabContent = (props) => {
  const { visible } = props
  const [key, setKey] = useState('home')

  if (!visible) return <></>
  return (
    <Tabs id='page-tabs' activeKey={key} onSelect={(k) => setKey(k)}>
      <Tab className='p-2' eventKey='home' title='Documentation'>
        <Documentation />
      </Tab>
      <Tab className='p-2' eventKey='code' title='Source Code'>
        <Code title='Source Code'>{code}</Code>
      </Tab>
    </Tabs>
  )
}

let Documentation = (props) => {
  const [minimalExample, setMinimalExample] = useState(false)
  return (
    <>
      <Row>
        <Col size='12'>
          Bootflex's Layout Control comprises the following key components
          <Table className='flex-layout-table mt-2 w-100' responsive bordered>
            <tbody>
              <tr className='bg-light-red'>
                <td colSpan='3'>Header (Layout.Header)</td>
              </tr>
              <tr style={{ height: '100px' }}>
                <td className='bg-light-orange' style={{ width: '25%' }}>
                  Side Panel (Layout.Panel)
                </td>
                <td className='bg-light-blue' style={{ width: '60%' }}>
                  {' '}
                  Content (Layout.Panel)
                </td>
                <td className='bg-light-purple' tyle={{ width: '15%' }}>
                  Side Panel (Layout.Panel)
                </td>
              </tr>
              <tr className='bg-light-green'>
                <td colSpan='3'>Footer (Layout.Footer)</td>
              </tr>
            </tbody>
          </Table>
          <p>
            The Header and Footer are optional, however in an application user
            interface you would normally place a navigation component within the
            header. You may have any numbre of panels, for which you may toggle
            visibility using the extensive array of control buttons.
          </p>
          {minimalExample ? <MinimalExample /> : <></>}
        </Col>
      </Row>
      <Row>
        <Col size='3'>
          <Button
            className='mt-2'
            onClick={() => setMinimalExample(!minimalExample)}
          >
            Click to Toggle Minimal Example
          </Button>
        </Col>
      </Row>
      <Row>
        <Col size='12'>
          <Spacer />
          <Properties />
        </Col>
      </Row>
    </>
  )
}

const MinimalExample = () => {
  const [key, setKey] = useState('code')
  return (
    <>
      <p>
        Here is the code for a minimal layout. To see this minimal layout
        navigate to
      </p>
      <Tabs id='minimal-tab' activeKey={key} onSelect={(k) => setKey(k)}>
        <Tab className='p-2' eventKey='code' title='Source Code'>
          <Code>{minimal}</Code>
        </Tab>
        <Tab eventKey='result' title='Result'>
          <div
            style={{ height: '350px' }}
            className='position-relative w-100 bg-primary overflow-hidden'
          >
            <Minimal />
          </div>
        </Tab>
      </Tabs>
    </>
  )
}

const Properties = () => {
  return (
    <>
      <h2>Layout.Header API</h2>
      <Table className='flex-table mt-2 w-100' responsive striped bordered>
        <thead>
          <tr>
            <th style={{ minWidth: '100px' }}>Name</th>
            <th style={{ minWidth: '120px' }}>Type</th>
            <th style={{ minWidth: '120px' }}>Default</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>height</td>
            <td>string/number</td>
            <td>100%</td>
            <td>
              Sets the minimum height for the layout (can be string with px or %
              or numeric value). By default the height will be 100% of the
              parent container, or in the case of the first instance of a user
              interface the entire viewport.{' '}
            </td>
          </tr>
          <tr>
            <td>tabBar</td>
            <td>Component</td>
            <td>(optional)</td>
            <td>
              Allows Mini-Tab bar component to be used within Layout Header
            </td>
          </tr>
          <tr>
            <td>className</td>
            <td>string</td>
            <td>(optional)</td>
            <td>Augment class with your own classes</td>
          </tr>
        </tbody>
      </Table>

      <p>THESE DOCS REQUIRE COMPLETION...</p>
    </>
  )
}

let minimal = `
import React from 'react'
import Layout from '../../lib/xflex/Layout'
const Minimal = () => {
  return (
    <Layout id='minimal-layout'>
      <Layout.Header>
        <div className='w-100 px-2 py-4 bg-dark text-light text-center '>HEADER</div>
      </Layout.Header>
      <Layout.Body id='demo-body' variant='fixed'>
        <Layout.Panel id='demo-left-panel' className='p-2 bg-info' width='20%'>
          LEFT SIDE PANEL
        </Layout.Panel>
        <Layout.Panel id='demo-content' className='p-2 '>
          APPLICATION CONTENT
        </Layout.Panel>
        <Layout.Panel
          id='demo-right-panel'
          position='right'
          width='150px'
          className='p-2 bg-warning'
        >
          RIGHT SIDE PANEL
        </Layout.Panel>
      </Layout.Body>
      <Layout.Footer>
        <div className='w-100 px-2 py-2 bg-danger text-light text-center '>FOOTER</div>
      </Layout.Footer>
    </Layout>
  )
}
export default Minimal
`

const code = `
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Container,
  Row,
  Col,
  Nav,
  Navbar,
  NavDropdown,
  Form,
  FormControl,
  Jumbotron,
  Tabs,
  Tab,
  Button,
} from 'react-bootstrap'
import BextLogo from '../../images/BextLogo.png'
import { useFlex, useSTATEord, Layout, Spacer, Post, Info, Lead } from '../../lib/xflex'
import { DemoSmallPanel, loremContent } from './Shared'

//import '../lib/xflex/flex.scss'

const SampleUI = ({ children }) => {
  const [state, STATE] = useSTATEord({ lorem: false, layout: 'fixed' })
  const [flex, _state] = useFlex()

  // HIDE GLOBAL SIDEBAR FOR THIS PAGE
  useEffect(() => {
    flex._setPanel('main-left', false)
    return () => {
      flex._setPanel('main-left', true)
    }
    // eslint-disable-next-line
  }, [])

  return (
    <Layout id='demo-layout' className='bg-noise p-4'>
      <Layout.Header
        sticky
        style={{ zIndex: 1019 }}
        className='flex-rounded flex-shadow bg-gradient-blue-reverse py-1 px-2 '
      >
        <SampleNav />
      </Layout.Header>
      <Layout.Body
        id='demo-body'
        variant={state.layout}
        className='pb-1 bg-white overflow-y'
        controlButtons={
          // Chevron Button Will Show if Sidebar is Collapsed
          <Layout.Button
            id='demo-toggle-left'
            variant='chevron-right'
            left='0'
            top='50%'
            color='purple'
            onClick={() => flex._togglePanel('demo-left')}
            visible={!flex._get('panel.demo-left', true)}
          />
        }
      >
        <Layout.Panel id='demo-content' className='p-2'>
          <Spacer />
          <Jumbotron className='mr-1'>
            <Container>
              <h1>Bootflex User Interface / Layout Control</h1>
              <Lead>Introduction and Example</Lead>
              <h6 className='text-info'>
                Current Layout variant is is {state.layout} - Screen Size {_state.dom.screenSize}
              </h6>
            </Container>
          </Jumbotron>
          <Container fluid className='p-1'>
            <Row>
              <Col size='12'>
                <Info className='text-justify'>{introText1}</Info>
                <Info className='text-justify'>{introText2}</Info>
              </Col>
            </Row>
          </Container>
          <Spacer />
          <Container fluid>
            <Row>
              <Button className='mx-1' onClick={() => STATE.set({ lorem: !state.lorem })}>
                Toggle Text beyond viewport
              </Button>
              <Button
                className='mx-1'
                variant='success'
                onClick={() => STATE.set({ layout: state.layout === 'grow' ? 'fixed' : 'grow' })}
              >
                Toggle Layout Variant (Grow / Fixed)
              </Button>
              <Button
                variant='danger'
                className='mx-1'
                onClick={() => STATE.set({ layout: state.layout === 'grow' ? 'fixed' : 'grow' })}
              >
                Show source code for this Layout Control
              </Button>
            </Row>
          </Container>
          <Spacer size='2' />
          <TabContent />
        </Layout.Panel>
        <Layout.Panel
          id='demo-left'
          className='p-2 bg-light-gray'
          visibleDefault={false}
          position='left'
          width='150px'
          controlButtons={
            <>
              <Layout.Button
                variant='chevron-left'
                right='0'
                top='50%'
                color='purple'
                onClick={() => flex._togglePanel('demo-left')}
              />
            </>
          }
        >
          <DemoSmallPanel />
        </Layout.Panel>
      </Layout.Body>
      <Layout.Footer height='50px' className='flex-rounded bg-gradient-blue-reverse text-light'>
        THIS FOOTER WILL ADJUST HEIGHT TO CONTEXT - OR YOUR CAN SET HEIGHT MANUALLY
      </Layout.Footer>
    </Layout>
  )
}`

export default SampleUI
