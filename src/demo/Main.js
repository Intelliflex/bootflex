import React from 'react'
import { Link } from 'react-router-dom'
import { Nav, Navbar, NavDropdown, Form, FormControl, Button } from 'react-bootstrap'
import Logo from './images/bootflex110X.png'
import { useFlexContext, Layout, Frame, Spacer, Heading, Flex, Pagination } from 'bootflex'
import { FaBars } from 'react-icons/fa'

const UserInterface = (props) => {
  const { children } = props
  // eslint-disable-next-line
  const [state, flex, _state] = useFlexContext()
  // eslint-disable-next-line
  return (
    <Layout id='main-layout' noselect>
      <Layout.Header height='55px' tabBar={<AppTabBar />} className='bg-dark flex-no-background flex-shadow '>
        <MainNav />
      </Layout.Header>
      <Layout.Body id='main-body' variant='fixed' controlButtons={flex.get('layoutButtons', <></>)}>
        <Layout.Responsive id='main-responsive'>
          <AppSidebar />
          <Layout.Panel id='main-content' target='main-responsive' position='center'>
            {children}
          </Layout.Panel>
        </Layout.Responsive>
      </Layout.Body>
      <Layout.Footer className='px-2 py-1 bg-dark text-light'>
        <Flex.Item order='1' align='left'>
          Bootflex - by Intelliflex Software
        </Flex.Item>
        <Flex.Item order='2' align='right'>
          <Pagination id='main-pagination' tableId={_state.activeTable} right color='white' />
        </Flex.Item>
      </Layout.Footer>
    </Layout>
  )
}
// eslint-disable-next-line
export default UserInterface

const MainNav = (props) => {
  return (
    <Navbar collapseOnSelect bg='dark' variant='dark' expand='lg' className='m-0 p-0 w-100'>
      {/* <CgSidebar size='2em' className='text-light' /> */}
      <Navbar.Brand as={Link} className='p-0 ml-4' to='/'>
        <img src={Logo} alt='TRUSTPOINT' />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls='basic-navbar-nav' />
      <Navbar.Collapse id='basic-navbar-nav'>
        <Nav className='mr-auto'>
          <Nav.Link as={Link} to='/'>
            Home
          </Nav.Link>
          <Nav.Link as={Link} to='/getstarted'>
            Getting Started
          </Nav.Link>
          <NavDropdown title='UI / Layout'>
            <NavDropdown.Item as={Link} eventKey='1' to='/intro'>
              Introduction & Demo
            </NavDropdown.Item>
            <NavDropdown.Item as={Link} eventKey='2' to='/layouts'>
              Layout Options
            </NavDropdown.Item>
            <NavDropdown.Item as={Link} eventKey='3' to='/buttons'>
              Layout Buttons
            </NavDropdown.Item>
            <NavDropdown.Item as={Link} eventKey='4' to='/tabbar'>
              Mini Tab Bar
            </NavDropdown.Item>
            <NavDropdown.Item as={Link} eventKey='5' to='/context'>
              Context
            </NavDropdown.Item>
          </NavDropdown>
          <NavDropdown title='Form Control'>
            <NavDropdown.Item as={Link} eventKey='10' to='/formintro'>
              Basic Usage
            </NavDropdown.Item>
            <NavDropdown.Item as={Link} eventKey='11' to='/formadvanced'>
              Nested Forms
            </NavDropdown.Item>
          </NavDropdown>

          <NavDropdown title='Other Features'>
            <NavDropdown.Item as={Link} eventKey='20' to='/card'>
              FlexCard Panel Cards
            </NavDropdown.Item>
            <NavDropdown.Item as={Link} eventKey='21' to='/rdt'>
              RDT Data Tables Extension
            </NavDropdown.Item>
            <NavDropdown.Item as={Link} eventKey='22' to='/rdtfull'>
              RDT Full Height Example
            </NavDropdown.Item>
            <NavDropdown.Item as={Link} eventKey='23' to='/select'>
              React Select
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
        <Form inline>
          <FormControl type='text' placeholder='Search (demo)' className='mr-sm-2' />
          <Button className='mt-2 mt-lg-0' variant='outline-success'>
            Search
          </Button>
        </Form>
      </Navbar.Collapse>
    </Navbar>
  )
}

let AppTabBar = (props) => {
  // eslint-disable-next-line
  const [state, flex, _state] = useFlexContext()

  if (_state.overrideTabBar) return <></>
  return (
    <Layout.TabBar id='main-tabbar' className='bg-dark' defaultVisibility={true}>
      <Layout.MiniTabBtn
        style={{ width: '165px', left: '5px' }}
        className='ml-2 bg-dark-orange text-light'
        title={
          <span>
            <FaBars className='mr-2' />
            App Sidebar
          </span>
        }
        onClick={() => flex._togglePanel('main-left')}
      />

      <Layout.MiniTabBtn
        style={{ width: '110px', right: '5px' }}
        className='ml-2 bg-dark-green text-light'
        title='Show Context'
        onClick={() => console.log(_state)}
      />
    </Layout.TabBar>
  )
}

const AppSidebar = (props) => {
  // eslint-disable-next-line
  let [state, flex, _state] = useFlexContext()
  return (
    <Layout.Panel
      id='main-left'
      target='main-responsive'
      //visible={ctx.getPanel('main-left', true)}
      autohide='md'
      visibleDefault={true}
      width='250px'
      className='bg-light-gray p-2'
      position='left'
    >
      <Frame className='w-100 h-100 p-1 bg-light overflow-hidden'>
        <Heading>
          <b>GLOBAL SIDEBAR</b>
        </Heading>
        <Heading bg='#3E4551'>
          <i>These buttons log to the console, so open your developer tools</i>
        </Heading>
        <Spacer />
        <Button
          className='w-100'
          onClick={() => {
            flex._setTabBar('main-tabbar', false)
          }}
        >
          Hide Mini Tab Bar
        </Button>
        <Button
          className='mt-2 w-100'
          onClick={() => {
            flex._setTabBar('main-tabbar', true)
            // Ctx.showTabBar('main-layout', true)
          }}
        >
          Show Mini Tab Bar
        </Button>
        <Button className='btn-success mt-2 w-100' onClick={() => console.log(state)}>
          Log User Context
        </Button>
        <Button className='bg-dark-indigo mt-2 w-100' onClick={() => console.log(_state)}>
          Log Bootflex Context
        </Button>
        <Button className='bg-dark-indigo mt-2 w-100' onClick={() => console.log(flex)}>
          Log Bootflex Methods
        </Button>
        <Button className='bg-dark-indigo mt-2 w-100' onClick={() => console.log(_state.dom)}>
          Log DOM
        </Button>
        <Button className='bg-dark-indigo mt-2 w-100' onClick={() => console.log(_state.panel)}>
          Log Panels
        </Button>
        <Button className='bg-dark-indigo mt-2 w-100' onClick={() => console.log(_state.panel)}>
          Log Pagination
        </Button>
        <Button className='bg-dark-indigo mt-2 w-100' onClick={() => console.log(_state.tabs)}>
          Log Tabs
        </Button>
        {/* <Button className='btn-danger mt-2 w-100' onClick={() => flex._set({ hello: 'mummaxxxx' })}>
          SET CONTEXT
        </Button> */}
      </Frame>
    </Layout.Panel>
  )
}
