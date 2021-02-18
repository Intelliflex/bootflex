import React, { useEffect, useState } from 'react'
import { Container, Button, Jumbotron, Row, Col } from 'react-bootstrap'
import { DemoNavbar, DemoSmallPanel } from './Shared'
import { useFlex, Layout, Code, Spacer, Lead, Info } from 'bootflex'
const LayoutDevelopment = (props) => {
  const [flex, _state] = useFlex()
  // eslint-disable-next-line
  let [layout, setLayout] = useState('grow')
  let [content, showContent] = useState(false)

  // HIDE GLOBAL SIDEBAR FOR THIS PAGE
  useEffect(() => {
    flex._setPanel('main-left', false)
    return () => {
      flex._setPanel('main-left', true)
    }
    // eslint-disable-next-line
  }, [])

  return (
    <Layout.Responsive
      id='layout-demo-responsive'
      variant={layout}
      collapse='md'
    >
      <Layout.Panel
        id='demo-content'
        target='layout-demo-responsive'
        overflow='overflow-y'
        className='p-2'
        controlButtons={
          <>
            <Layout.Button
              variant='chevron-left'
              left='8'
              top='225px'
              color='purple'
              onClick={() => flex._togglePanel('left-panel')}
              visible={flex._get('panel.left-panel', true)}
            />
            <Layout.Button
              variant='chevron-right'
              left='8'
              top='225px'
              color='purple'
              onClick={() => flex._togglePanel('left-panel')}
              visible={!flex._get('panel.left-panel', true)}
            />
            <Layout.Button
              variant='chevron-right'
              right='8'
              top='225px'
              color='purple'
              onClick={() => flex._togglePanel('right-panel')}
              visible={flex._isVisible('right-panel')}
            />
            <Layout.Button
              variant='chevron-left'
              right='8'
              top='225px'
              color='purple'
              onClick={() => flex._togglePanel('right-panel')}
              visible={!flex._isVisible('right-panel')}
            />
          </>
        }
      >
        <Jumbotron>
          <Container>
            <h1>Layout Options</h1>
            <Lead>Flexible layout options within the body of the layout</Lead>
            <Lead>
              <h6 className='text-info'>
                Current Layout variant is is '{layout}' - Screen Size '
                {_state.dom.screenSize}'
              </h6>
            </Lead>
          </Container>
        </Jumbotron>
        <Container>
          <Info className='text-justify'>
            Bootflex provides a choice of two Layout options within the Body
            (Layout.Body) component. The Layout body is the container component
            occupying screen real-estate between the Layout header and footer.
            The layout may be either bound to the body (<b>fixed </b>
            layout) or scroll within the body (<b>grow</b> layout). In the case
            of fixed layout each panel (a sidebar or content) will have its own
            scroll overflow regions.
          </Info>
          <Row>
            <Col lg='3' sm='6' className='p-2'>
              <Button
                className='m-1 mb-2 h-100 w-100 btn-danger'
                onClick={() => flex._togglePanel('left-panel')}
              >
                Toggle Left
              </Button>
            </Col>
            <Col lg='3' sm='6' className='p-2'>
              <Button
                className='m-1 mb-2 h-100 w-100 '
                onClick={() => flex._toggleLayout('layout-demo-responsive')}
              >
                Toggle Layout
              </Button>
            </Col>
            <Col lg='3' sm='6' className='p-2'>
              <Button
                className='m-1 mb-2 h-100 w-100 '
                onClick={() => showContent(!content)}
              >
                Toggle Content
              </Button>
            </Col>
            <Col lg='3' sm='6' className='p-2'>
              <Button
                className='m-1 mb-2 h-100 w-100 btn-danger'
                onClick={() => flex._togglePanel('right-panel')}
              >
                Toggle Right
              </Button>
            </Col>
          </Row>
          <Spacer />
          <Spacer />
          <Info className='text-justify'>
            Try using the buttons to toggle between both body layouts. Also try
            putting your browser in developer mode (or use a different device)
            and experiment with changing screen sizes. When the screen size is
            less than or equal to the <b>collapse </b>
            property the display will revert to a vertical layout (flex column
            layout) automatically. You may also have the side panels collapse
            automatically when the autohide property is specified on the
            Layout.Panel component. In this example the left side bar is set to
            auto hide at 'md' breakpoint.
          </Info>
          <Info className='text-justify'>
            Also experiment with the Toggle Content buttons in each panel to
            observe the effect of adding additional content that overflows the
            vertical limits of the visible body area. Notice how for{' '}
            <b>Fixed </b> layouts scroll bars appear in each panel that has
            overflown whereas for the <b>grow </b> there is a single scrollbar
            for the body region.
          </Info>
          <Spacer />
        </Container>
        {content ? <Code title='Source Code'>{code}</Code> : <></>}
      </Layout.Panel>
      <Layout.Panel
        id='left-panel'
        target='layout-demo-responsive'
        width={'250px'}
        className='p-2 bg-light-blue'
        visibleDefault={true}
        autohide='md'
        position='left'
      >
        <DemoNavbar />
      </Layout.Panel>
      <Layout.Panel
        id='right-panel'
        target='layout-demo-responsive'
        className='p-2 bg-light-gray'
        visibleDefault={true}
        position='right'
        width='150px'
      >
        <DemoSmallPanel />
      </Layout.Panel>
    </Layout.Responsive>
  )
}
export default LayoutDevelopment

let code = `
import React, { useEffect, useState } from 'react'
import { Code, Spacer, Lead, Info } from '../../lib/xflex'
import { Container, Button, Jumbotron, Row, Col } from 'react-bootstrap'
import { DemoNavbar, DemoSmallPanel } from './Shared'
import { useFlex } from '../../lib/xflex'
import Layout from '../../lib/xflex/Layout'
const LayoutDevelopment = (props) => {
  const [flex, _state] = useFlex()
  // eslint-disable-next-line
  let [layout, setLayout] = useState('grow')
  let [content, showContent] = useState(false)

  // HIDE GLOBAL SIDEBAR FOR THIS PAGE
  useEffect(() => {
    flex._setPanel('main-left', false)
    return () => {
      flex._setPanel('main-left', true)
    }
    // eslint-disable-next-line
  }, [])

  return (
    <Layout.Responsive id='layout-demo-responsive' variant={layout} collapse='md'>
      <Layout.Panel
        id='demo-content'
        target='layout-demo-responsive'
        overflow='overflow-y'
        className='p-2'
        controlButtons={
          <>
            <Layout.Button
              variant='chevron-left'
              left='0'
              top='225px'
              color='purple'
              onClick={() => flex._togglePanel('left-panel')}
              visible={flex._get('panel.left-panel', true)}
            />
            <Layout.Button
              variant='chevron-right'
              left='0'
              top='225px'
              color='purple'
              onClick={() => flex._togglePanel('left-panel')}
              visible={!flex._get('panel.left-panel', true)}
            />
            <Layout.Button
              variant='chevron-right'
              right='0'
              top='225px'
              color='purple'
              onClick={() => flex._togglePanel('right-panel')}
              visible={flex._isVisible('right-panel')}
            />
            <Layout.Button
              variant='chevron-left'
              right='0'
              top='225px'
              color='purple'
              onClick={() => flex._togglePanel('right-panel')}
              visible={!flex._isVisible('right-panel')}
            />
          </>
        }
      >
        <Jumbotron>
          <Container>
            <h1>Layout Options</h1>
            <Lead>Flexible layout options within the body of the layout</Lead>
            <Lead>
              <h6 className='text-info'>
                Current Layout variant is is {layout} - Screen Size {_state.dom.screenSize}
              </h6>
            </Lead>
          </Container>
        </Jumbotron>
        <Container>
          <Info className='text-justify'>
            Bootflex provides a choice of two Layout options within the Body (Layout.Body) component. The
            Layout body is the container component occupying screen real-estate between the Layout
            header and footer. The layout may be either bound to the body (<b>fixed </b>
            layout) or scroll within the body (<b>grow</b> layout). In the case of fixed layout each
            panel (a sidebar or content) will have its own scroll overflow regions.
          </Info>
          <Row>
            <Col lg='3' sm='6' className='p-2'>
              <Button
                className='m-1 mb-2 h-100 w-100 btn-danger'
                onClick={() => flex._togglePanel('left-panel')}
              >
                Toggle Left
              </Button>
            </Col>
            <Col lg='3' sm='6' className='p-2'>
              <Button
                className='m-1 mb-2 h-100 w-100 '
                onClick={() =>
                  // flex._setResponsive('layout-demo-responsive', {
                  //   fixed: responsive.fixed ? false : true,
                  // })
                  flex._toggleLayout('layout-demo-responsive')
                }
              >
                Toggle Layout
              </Button>
            </Col>
            <Col lg='3' sm='6' className='p-2'>
              <Button className='m-1 mb-2 h-100 w-100 ' onClick={() => showContent(!content)}>
                Toggle Content
              </Button>
            </Col>
            <Col lg='3' sm='6' className='p-2'>
              <Button
                className='m-1 mb-2 h-100 w-100 btn-danger'
                onClick={() => flex._togglePanel('right-panel')}
              >
                Toggle Right
              </Button>
            </Col>
          </Row>
          <Spacer />
          <Spacer />
          <Info className='text-justify'>
            Try using the buttons to toggle between both body layouts. Also try putting your browser
            in developer mode (or use a different device) and experiment with changing screen sizes.
            When the screen size is less than or equal to the <b>collapse </b>
            property the display will revert to a vertical layout (flex column layout)
            automatically. You may also have the side panels collapse automatically when the
            autohide property is specified on the Layout.Panel component.
          </Info>
          <Info className='text-justify'>
            Also experiment with the Toggle Content buttons in each panel to observe the effect of
            adding additional content that overflows the vertical limits of the visible body area.
            Notice how for <b>Fixed </b> layouts scroll bars appear in each panel that has overflown
            whereas for the <b>grow </b> there is a single scrollbar for the body region.
          </Info>
          <Spacer />
        </Container>
        {content ? <Code title='Source Code'>{code}</Code> : <></>}
      </Layout.Panel>
      <Layout.Panel
        id='left-panel'
        target='layout-demo-responsive'
        width={'250px'}
        className='p-2 bg-light-blue'
        visibleDefault={true}
        autohide='md'
        position='left'
      >
        <DemoNavbar />
      </Layout.Panel>
      <Layout.Panel
        id='right-panel'
        target='layout-demo-responsive'
        className='p-2 bg-light-gray'
        visibleDefault={true}
        position='right'
        width='150px'
      >
        <DemoSmallPanel />
      </Layout.Panel>
    </Layout.Responsive>
  )
}
export default LayoutDevelopment
`
