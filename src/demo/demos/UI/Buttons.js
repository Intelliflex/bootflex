import React, { useEffect, useState } from 'react'
import {
  Container,
  Row,
  Col,
  Jumbotron,
  Tabs,
  Tab,
  Button,
  Table,
  Form,
  InputGroup
} from 'react-bootstrap'
import {
  useFlex,
  useFlexContext,
  useValue,
  useRecord,
  Layout,
  Spacer,
  Info,
  Lead,
  Frame,
  Code
} from 'bootflex'
import { DemoNavbar, DemoSmallPanel, SampleNav } from './Shared'
import { FaLightbulb } from 'react-icons/fa'

const ButtonDemo = ({ children }) => {
  const [flex, _state] = useFlex()
  const layout = useValue('fixed')
  const content = useValue(true)

  // HIDE GLOBAL SIDEBAR FOR THIS PAGE
  useEffect(() => {
    flex._setPanel('main-left', false)
    return () => {
      flex._setPanel('main-left', true)
    }
    // eslint-disable-next-line
  }, [])

  return (
    <div>
      {/* EXTRA DIV TO SHOW VIEWPORT BUTTONS BASED ON CONTEXT */}
      {flex.get('viewport') || null}
      <Layout
        id='demo-layout'
        className='bg-noise p-4'
        controlButtons={flex.get('layout') || null}
      >
        <Layout.Header
          className='flex-rounded flex-shadow bg-gradient-green-reverse py-1 px-2 '
          controlButtons={flex.get('header') || null}
        >
          <SampleNav />
        </Layout.Header>
        <Layout.Body
          id='layout-dev-body'
          className='bg-white'
          variant={layout.value}
          collapse='md'
          controlButtons={flex.get('body') || <BodyButtons />}
        >
          <Layout.Responsive id='buttons-responsive'>
            <Layout.Panel
              id='demo-content'
              target='buttons-responsive'
              className='p-2' // h-100 w-100 overflow-hidden IMPOTANT NOTE: NEED TO ADD THIS CLASS WHEN EMBEDDED INSIDE ANOTH LAYOUT
              controlButtons={flex.get('Content') || <ContentButtons />}
            >
              <Jumbotron className='mb-1'>
                <Container>
                  <h1>Button Controls</h1>
                  <Lead>
                    Bootflex provides a comprehensive array of button Types that
                    can be used within your application or for application
                    specific tasks or for controlling layout control functions
                    and panel visibility. Button positioning is done exclusively
                    with CSS so that window re-sizing and responsive layout
                    adapation are preseved with smooth animation.
                  </Lead>
                  <Lead>
                    <h6 className='text-info'>
                      Current Layout variant is is {layout.value} - Screen Size{' '}
                      {_state.dom.screenSize}
                    </h6>
                  </Lead>
                </Container>
              </Jumbotron>
              <Container>
                <ButtonPanel layout={layout} content={content} />
                <Spacer size='2' />
                {content.value ? <TabContent /> : <></>}
              </Container>
            </Layout.Panel>
            <Layout.Panel
              id='left-panel'
              target='buttons-responsive'
              width={'250px'}
              className='p-2 bg-light-blue'
              visibleDefault={true}
              position='left'
              controlButtons={flex.get('LeftPanel') || null}
            >
              <DemoNavbar />
            </Layout.Panel>
            <Layout.Panel
              id='right-panel'
              target='buttons-responsive'
              className='p-2 bg-light-gray'
              visibleDefault={true}
              position='right'
              width='150px'
              controlButtons={flex.get('RightPanel') || null}
            >
              <DemoSmallPanel />
            </Layout.Panel>
          </Layout.Responsive>
        </Layout.Body>

        <Layout.Footer
          height='35px'
          className='flex-rounded bg-gradient-green text-dark'
          controlButtons={flex.get('footer') || null}
        >
          This is footer for the buttons demonstration layout
        </Layout.Footer>
      </Layout>
    </div>
  )
}
export default ButtonDemo

export const ButtonTypesTable = (props) => {
  return (
    <Table className='w-100' responsive striped bordered hover>
      <thead>
        <tr>
          <th style={{ width: 60 }}>Button</th>
          <th>Usage</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <Layout.Button
              position='static'
              size='1.5em'
              color='blue'
              className='px-2'
              variant='bars'
            />
          </td>
          <td>
            <pre>{`<Layout.Button color='blue' variant='bars' />`}</pre>
          </td>
        </tr>
        <tr>
          <td>
            <Layout.Button
              position='static'
              size='1.5em'
              color='purple'
              className='px-2'
              variant='chevron-left'
            />
          </td>
          <td>
            <pre>{`<Layout.Button color='purple' variant='chevron-left' />`}</pre>
          </td>
        </tr>
        <tr>
          <td>
            <Layout.Button
              position='static'
              size='1.5em'
              color='purple'
              className='px-2'
              variant='chevron-right'
            />
          </td>
          <td>
            <pre>{`<Layout.Button color='purple' variant='chevron-right' />`}</pre>
          </td>
        </tr>
        <tr>
          <td>
            <Layout.Button
              position='static'
              size='1.5em'
              color='green'
              className='px-2'
              variant='dots'
            />
          </td>
          <td>
            <pre>{`<Layout.Button color='green' variant='dots' />`}</pre>
          </td>
        </tr>
        <tr>
          <td>
            <Layout.Button
              position='static'
              size='1.5em'
              color='red'
              className='px-2'
              variant='cross'
            />
          </td>
          <td>
            <pre>{` <Layout.Button color='red' variant='cross' />`}</pre>
          </td>
        </tr>
        <tr>
          <td>Custom</td>
          <td>
            Provide your own JSX for buttons designed using your choice of icon,
            text or svg
          </td>
        </tr>
        <tr>
          <td>Expanders</td>
          <td>
            Expander buttons push out from panel or view port edge to reveal
            text{' '}
          </td>
        </tr>
      </tbody>
    </Table>
  )
}

const ButtonPanel = (props) => {
  const { content } = props
  let [flex] = useFlex()
  return (
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
          onClick={() => flex._toggleLayout('buttons-responsive')}
        >
          Toggle Layout
        </Button>
      </Col>
      <Col lg='3' sm='6' className='p-2'>
        <Button
          className='m-1 mb-2 h-100 w-100'
          onClick={() => content.set(!content.value)}
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
  )
}

const Intro = (props) => {
  return (
    <Info className='text-justify'>
      <Spacer />
      <p>
        <i>
          Note: In order to demonstrate button layouts (including fixed) a
          separate layout (shown with Green header and footer) has been created
          inside the main web page layout. In the default layout some buttons
          have been placed on the screen (coloured red, blue & orange) - try
          using the Playground to add more buttons.
        </i>
      </p>
      <p>
        Buttons are bound to container edges within each Layout sub component
        (being Layout, Layout.Header, Layout.Footer, Layout.Panel or
        Layout.Panel). Buttons are declared for each sub component using the{' '}
        <b>controlButtons</b> prop. Positioning within the container is
        according to an x and y axis offset from the correspnding edge specified
        by the left, top, bottom or right props. Note: It would not make sense
        to have a left and right offset, in which case left will trump right and
        top will trump bottom when positioning is determined.
      </p>
      <p>
        Buttons may also be given a position prop of <b>fixed</b> in which case
        positioning is always relative to the viewport and not bound by the
        layout. Try clicking thg 'Toggle Layout' and 'Toggle Content' buttons to
        see this in practice.
      </p>
      <p>
        For Fixed Layout types you may also use the 'sticky' position attribute
        which will prevent the button from scrolling with content within the
        panel. Sticky buttons have no effect for 'grow' layouts.
      </p>
      <p>
        Be careful using fixed buttons when your layout is not occupying the
        entire viewport. Also be mindful that standard CSS behaviour for right
        or bottom positioning does not observe scroll width in which case your
        button controls may appear in scrollbars when the content overflows.
        This works and may be acceptable behaviour. As a side note, the author
        has experimented with code based positioning to alleviate these
        behaviours however the solution always involves jerky transitioning of
        buttons during changes and difficulty when panels collapse for
        responsive layouts. For this reasion a decision was made to use pure css
        positioning. This may be a future enhancement.
      </p>
      <p className='text-primary'>
        <FaLightbulb color='orange' /> Use the Playground to experiment with
        different button properties within each panel of the layout.
      </p>
    </Info>
  )
}

const Playground = (props) => {
  // eslint-disable-next-line
  const [state, flex, _state] = useFlexContext()
  const defaults = {
    target: 'Content',
    variant: 'bars',
    position: 'absolute',
    color: 'red',
    bg: '',
    left: '',
    top: '',
    right: '',
    bottom: '',
    height: '',
    width: '',
    opacity: '0.6',
    sprout: true,
    title: 'Test Button'
  }
  const [options, OPTIONS] = useRecord(defaults)
  const [buttonDef, setButtonDef] = useState('')
  const [btnProps, setBtnProps] = useState()
  const clearBtnProps = {
    Content: null,
    LeftPanel: null,
    RightPanel: null,
    viewport: null,
    layout: null,
    body: null,
    header: null,
    footer: null
  }

  useEffect(() => {
    let position =
      options.position && options.position !== 'absolute'
        ? ` position='${options.position}'`
        : ''
    let variant = options.variant ? ` variant='${options.variant}'` : ''
    let color = options.color ? ` color='${options.color}'` : ''
    let bg = options.bg ? ` bg='${options.bg}'` : ''
    let x = options.left
      ? ` left='${options.left}'`
      : options.right
      ? ` right='${options.right}'`
      : ''
    let y = options.top
      ? ` top='${options.top}'`
      : options.bottom
      ? ` botton='${options.bottom}'`
      : ''
    let opacity = options.opacity ? ` opacity='${options.opacity}'` : ''
    let height = options.height ? ` height='${options.height}'` : ''
    let width = options.width ? ` width='${options.width}'` : ''

    let def = `<Layout.Button ${position}${variant}${color}${bg}${x}${y}${opacity}${height}${width}/>`
    setButtonDef(def)
    let btn = {
      variant: options.variant,
      color: options.color,
      opacity: options.opacity,
      title: options.title,
      position: options.position,
      sprout: options.sprout
    }
    if (options.bg) btn.bg = options.bg
    if (options.left) btn.left = options.left
    else if (options.right) btn.right = options.right
    if (options.top) btn.top = options.top
    else if (options.bottom) btn.bottom = options.bottom
    if (options.height) btn.height = options.height
    if (options.width) btn.width = options.width
    setBtnProps(btn)
  }, [options])
  return (
    <Form>
      <Spacer size='2' />
      <Info>
        Use the options below to create your own button variant. Adjust screen
        sizes, responsive layout and body type (fixed / grow) to experiment with
        impact the button you create.
      </Info>
      <Spacer />
      <InputGroup>
        <InputGroup.Prepend>
          <InputGroup.Text style={{ width: '200px' }}>
            Target Container
          </InputGroup.Text>
        </InputGroup.Prepend>
        <Form.Control
          as='select'
          value={options.target}
          onChange={(e) => OPTIONS.set({ target: e.target.value })}
        >
          <option>Content</option>
          <option>LeftPanel</option>
          <option>RightPanel</option>
          <option>viewport</option>
          <option>layout</option>
          <option>body</option>
          <option>header</option>
          <option>footer</option>
        </Form.Control>
      </InputGroup>
      <Spacer />
      <InputGroup>
        <InputGroup.Prepend>
          <InputGroup.Text style={{ width: '200px' }}>Variant</InputGroup.Text>
        </InputGroup.Prepend>
        <Form.Control
          as='select'
          value={options.variant}
          onChange={(e) => {
            OPTIONS.set({ variant: e.target.value })
          }}
        >
          <option>bars</option>
          <option>chevron-left</option>
          <option>chevron-right</option>
          <option>dots</option>
          <option>cross</option>
          <option>expander</option>
          <option>dropexpander</option>
        </Form.Control>
      </InputGroup>
      <Spacer />
      <InputGroup>
        <InputGroup.Prepend>
          <InputGroup.Text style={{ width: '200px' }}>Position</InputGroup.Text>
        </InputGroup.Prepend>
        <Form.Control
          as='select'
          value={options.position}
          onChange={(e) => {
            OPTIONS.set({ position: e.target.value })
          }}
        >
          <option>absolute</option>
          <option>sticky</option>
          <option>fixed</option>
          <option>static</option>
        </Form.Control>
      </InputGroup>
      <Spacer />
      <InputGroup>
        <InputGroup.Prepend>
          <InputGroup.Text style={{ width: '200px' }}>Color</InputGroup.Text>
        </InputGroup.Prepend>
        <Form.Control
          as='select'
          value={options.color}
          onChange={(e) => OPTIONS.set({ color: e.target.value })}
        >
          <option></option>
          <option>white</option>
          <option>red</option>
          <option>blue</option>
          <option>purple</option>
          <option>orange</option>
          <option>green</option>
          <option>black</option>
        </Form.Control>
      </InputGroup>
      <Spacer />
      <InputGroup>
        <InputGroup.Prepend>
          <InputGroup.Text style={{ width: '200px' }}>
            Background Color (bg)
          </InputGroup.Text>
        </InputGroup.Prepend>
        <Form.Control
          as='select'
          value={options.bg}
          onChange={(e) => OPTIONS.set({ bg: e.target.value })}
        >
          <option></option>
          <option>white</option>
          <option>red</option>
          <option>blue</option>
          <option>purple</option>
          <option>orange</option>
          <option>green</option>
          <option>black</option>
        </Form.Control>
      </InputGroup>

      <Spacer />
      <InputGroup>
        <InputGroup.Prepend>
          <InputGroup.Text style={{ width: '200px' }}>
            Offsets (Left,Top,Rgt,Bot){' '}
          </InputGroup.Text>
        </InputGroup.Prepend>
        <Form.Control
          as='input'
          className='text-right'
          placeholder='Left'
          value={options.left}
          onChange={(e) => OPTIONS.set({ left: e.target.value })}
        ></Form.Control>
        <Form.Control
          as='input'
          className='text-right'
          placeholder='Top'
          value={options.top}
          onChange={(e) => OPTIONS.set({ top: e.target.value })}
        ></Form.Control>
        <Form.Control
          as='input'
          className='text-right'
          placeholder='Right'
          value={options.right}
          onChange={(e) => OPTIONS.set({ right: e.target.value })}
        ></Form.Control>
        <Form.Control
          as='input'
          className='text-right'
          placeholder='Bottom'
          value={options.bottom}
          onChange={(e) => OPTIONS.set({ bottom: e.target.value })}
        ></Form.Control>
      </InputGroup>
      <Spacer />
      <InputGroup>
        <InputGroup.Prepend>
          <InputGroup.Text style={{ width: '200px' }}>
            Dimensions & Opacity{' '}
          </InputGroup.Text>
        </InputGroup.Prepend>
        <Form.Control
          as='input'
          className='text-right'
          placeholder='Height'
          value={options.height}
          onChange={(e) => OPTIONS.set({ height: e.target.value })}
        ></Form.Control>

        <Form.Control
          as='input'
          className='text-right'
          placeholder='Width'
          value={options.width}
          onChange={(e) => OPTIONS.set({ width: e.target.value })}
        ></Form.Control>
        <Form.Control
          as='input'
          className='text-right'
          placeholder='Opacity'
          value={options.opacity}
          onChange={(e) => OPTIONS.set({ opacity: e.target.value })}
        />
      </InputGroup>
      <Spacer />
      <InputGroup>
        <InputGroup.Prepend>
          <InputGroup.Text style={{ width: '200px' }}>Title</InputGroup.Text>
        </InputGroup.Prepend>
        <Form.Control
          as='input'
          placeholder='title'
          value={options.title}
          onChange={(e) => OPTIONS.set({ title: e.target.value })}
        ></Form.Control>
      </InputGroup>
      <Form.Check
        type='checkbox'
        className='flex-checkbox'
        label='Sprout (grow and bolden) on Hover'
        checked={options.sprout}
        onChange={(e) => OPTIONS.set({ sprout: e.target.checked })}
      />
      <Spacer x2 />
      <Frame className='' title='Button Definition'>
        {buttonDef}
      </Frame>
      <Spacer x2 />
      <Button
        className='mr-2'
        onClick={() => {
          console.log('btnProps', btnProps)
          let adj = {}
          if (!options.left && !options.right) {
            OPTIONS.set({ left: '0' })
            adj.left = '0'
          }
          if (!options.top && !options.bottom) {
            OPTIONS.set({ top: '0' })
            adj.top = '0'
          }
          flex.set({ ...clearBtnProps })
          setTimeout(() => {
            flex.set({
              [options.target]: (
                <Layout.Button id='auto-gen-btn' {...btnProps} {...adj} />
              )
            })
          }, 100)
        }}
      >
        SHOW
      </Button>
      <Button
        className='bg-warning mr-2'
        onClick={() => {
          OPTIONS.set(defaults)
          flex.set({ ...clearBtnProps })
        }}
      >
        CLEAR
      </Button>
      {/* 
      <Button onClick={() => console.log(state)}>SHOW OPTIONS</Button> */}
    </Form>
  )
}

const TabContent = (props) => {
  const [key, setKey] = useState('home')
  return (
    <Tabs id='page-tabs' activeKey={key} onSelect={(k) => setKey(k)}>
      <Tab eventKey='home' title='Information'>
        <Intro />
      </Tab>
      <Tab eventKey='types' title='Button Types'>
        <ButtonTypesTable />
      </Tab>
      <Tab eventKey='playground' title='Playground'>
        <Playground />
      </Tab>
      <Tab eventKey='ex' title='Examples'>
        <form className='form-floating'>
          <input
            type='email'
            className='form-control'
            id='floatingInputValue'
            placeholder='name@example.com'
            value='test@example.com'
            onChange={() => {}}
          />
          <label htmlFor='floatingInputValue'>Input with value</label>
        </form>
      </Tab>
      <Tab eventKey='doc' title='Documentation'>
        In development
      </Tab>
      <Tab eventKey='code' title='Source Code'>
        <Code title='Source Code'>{code}</Code> : <></>
      </Tab>
    </Tabs>
  )
}

const ContentButtons = (props) => {
  const [flex] = useFlex()
  return (
    <>
      <Layout.Button
        id='fixedBtn1'
        variant='expander'
        position='fixed'
        height='40px'
        title='Fixed Toggle'
        left='0'
        top='80'
        color='white'
        onClick={() => flex._togglePanel('left-panel')}
        visible={flex._get('panel.demo-content', true)}
      />
      <Layout.Button
        id='layoutBtn3'
        variant='expander'
        bg='blue'
        height='40px'
        title='Toggle Left'
        left='0'
        top='200px'
        color='white'
        onClick={() => flex._togglePanel('left-panel')}
        visible={flex._get('panel.demo-content', true)}
      />
    </>
  )
}

const BodyButtons = (props) => {
  const [flex] = useFlex()
  return (
    // Chevron Button Will Show if Sidebar is Collapsed
    <>
      <Layout.Button
        id='fixedBtn1'
        variant='expander'
        position='fixed'
        height='40px'
        title='Fixed Toggle'
        left='0'
        top='80'
        color='white'
        onClick={() => flex._togglePanel('left-panel')}
        visible={flex._get('panel.demo-content', true)}
      />
      <Layout.Button
        id='layoutBtn3'
        variant='expander'
        bg='blue'
        height='40px'
        title='Toggle Left'
        left='0'
        top='200px'
        color='white'
        onClick={() => flex._togglePanel('left-panel')}
        visible={flex._get('panel.demo-content', true)}
      />
      <Layout.Button
        id='contentBtn1'
        variant='dropexpander'
        title='Toggle Right'
        left='50%'
        top='0'
        color='white'
        bg='orange'
        width='150px'
        opacity='0.8'
        onClick={() => flex._togglePanel('right-panel')}
        visible={flex._get('panel.demo-content', true)}
      />
    </>
  )
}

const code = `
import React, { useEffect, useState } from 'react'
import {
  Container,
  Row,
  Col,
  Jumbotron,
  Tabs,
  Tab,
  Button,
  Table,
  Form,
  InputGroup,
} from 'react-bootstrap'
import {
  useFlex,
  useFlexContext,
  useValue,
  useRecord,
  Layout,
  Spacer,
  Info,
  Lead,
  Frame,
  Code,
} from '../../lib/xflex'
import { DemoNavbar, DemoSmallPanel, SampleNav } from './Shared'
import { FaLightbulb } from 'react-icons/fa'

const ButtonDemo = ({ children }) => {
  const [flex, _state] = useFlex()
  const layout = useValue('fixed')
  const content = useValue(true)

  // HIDE GLOBAL SIDEBAR FOR THIS PAGE
  useEffect(() => {
    flex._setPanel('main-left', false)
    return () => {
      flex._setPanel('main-left', true)
    }
    // eslint-disable-next-line
  }, [])

  return (
    <div>
      {/* EXTRA DIV TO SHOW VIEWPORT BUTTONS BASED ON CONTEXT */}
      {flex.get('viewport') || null}
      <Layout id='demo-layout' className='bg-noise p-4' controlButtons={flex.get('layout') || null}>
        <Layout.Header
          className='flex-rounded flex-shadow bg-gradient-green-reverse py-1 px-2 '
          controlButtons={flex.get('header') || null}
        >
          <SampleNav />
        </Layout.Header>
        <Layout.Body
          id='layout-dev-body'
          className='bg-white'
          variant={layout.value}
          collapse='md'
          controlButtons={flex.get('body') || <BodyButtons />}
        >
          <Layout.Responsive id='buttons-responsive'>
            <Layout.Panel
              id='demo-content'
              target='buttons-responsive'
              className='p-2' // h-100 w-100 overflow-hidden IMPOTANT NOTE: NEED TO ADD THIS CLASS WHEN EMBEDDED INSIDE ANOTH LAYOUT
              controlButtons={flex.get('Content') || <ContentButtons />}
            >
              <Jumbotron className='mb-1'>
                <Container>
                  <h1>Button Controls</h1>
                  <Lead>
                    Bootflex provides a comprehensive array of button Types that can be used within your
                    application or for application specific tasks or for controlling layout control
                    functions and panel visibility. Button positioning is done exclusively with CSS
                    so that window re-sizing and responsive layout adapation are preseved with
                    smooth animation.
                  </Lead>
                  <Lead>
                    <h6 className='text-info'>
                      Current Layout variant is is {layout.value} - Screen Size{' '}
                      {_state.dom.screenSize}
                    </h6>
                  </Lead>
                </Container>
              </Jumbotron>
              <Container>
                <ButtonPanel layout={layout} content={content} />
                <Spacer size='2' />
                {content.value ? <TabContent /> : <></>}
              </Container>
            </Layout.Panel>
            <Layout.Panel
              id='left-panel'
              target='buttons-responsive'
              width={'250px'}
              className='p-2 bg-light-blue'
              visibleDefault={true}
              position='left'
              controlButtons={flex.get('LeftPanel') || null}
            >
              <DemoNavbar />
            </Layout.Panel>
            <Layout.Panel
              id='right-panel'
              target='buttons-responsive'
              className='p-2 bg-light-gray'
              visibleDefault={true}
              position='right'
              width='150px'
              controlButtons={flex.get('RightPanel') || null}
            >
              <DemoSmallPanel />
            </Layout.Panel>
          </Layout.Responsive>
        </Layout.Body>

        <Layout.Footer
          height='35px'
          className='flex-rounded bg-gradient-green text-dark'
          controlButtons={flex.get('footer') || null}
        >
          This is footer for the buttons demonstration layout
        </Layout.Footer>
      </Layout>
    </div>
  )
}
export default ButtonDemo

`
