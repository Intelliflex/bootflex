import React, { useState } from 'react'
import {
  Container,
  Jumbotron,
  Card,
  Form,
  Button,
  Row,
  Col
} from 'react-bootstrap'
import { useFlexContext } from 'bootflex'

const Component1 = (props) => {
  let [state, flex] = useFlexContext()
  const [testInput, setTestInput] = useState()

  return (
    <Card>
      <Card.Header>Component 1</Card.Header>
      <Card.Body>
        <Card.Text>
          Type below and your text will be duplicated in Component 2
        </Card.Text>
        <Form.Control
          value={testInput}
          onChange={(e) => {
            setTestInput(e.target.value)
            flex.set({ stuff: e.target.value })
          }}
          as='textarea'
          rows={3}
          type='text'
        ></Form.Control>
        <Form.Group controlId='xxx'>
          <Row>
            <Col size='12' className='m-0 p-0 mt-2'>
              <Button
                variant='outline-primary'
                type=''
                className='mr-2 mb-2'
                onClick={(e) => {
                  flex.set({
                    component3visibility: !flex.get(
                      'component3visibility',
                      true
                    )
                  })
                }}
              >
                TOGGLE COMPONENT 3 VISIBILITY
              </Button>
              <Button
                variant='outline-primary'
                type=''
                className='mr-2'
                onClick={(e) => {
                  console.log(state)
                }}
              >
                LOG CONTEXT
              </Button>
            </Col>
          </Row>
        </Form.Group>
      </Card.Body>
    </Card>
  )
}

const Component2 = (props) => {
  let [state, flex] = useFlexContext()
  const [person, setPerson] = useState({ name: 'Fred', age: 40, height: '6ft' })
  return (
    <Card>
      <Card.Header>Component 2</Card.Header>
      <Card.Body>
        <Card.Text as='div' className='mb-2'>
          <div>The text below originates from component 1</div>
          <i className='text-primary'>{state.stuff}</i>
        </Card.Text>
        <Form>
          <Row>
            <Col size='4' className='p-1'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='text'
                value={person.name}
                onChange={(e) => setPerson({ ...person, name: e.target.value })}
              />
            </Col>
            <Col size='4' className='p-1'>
              <Form.Label>Age</Form.Label>
              <Form.Control
                type='text'
                value={person.age}
                onChange={(e) => setPerson({ ...person, age: e.target.value })}
              />
            </Col>
            <Col size='4' className='p-1'>
              <Form.Label>Height</Form.Label>
              <Form.Control
                type='text'
                value={person.height}
                onChange={(e) =>
                  setPerson({ ...person, height: e.target.value })
                }
              />
            </Col>
          </Row>
        </Form>
        <Button
          variant='outline-danger'
          className='mt-2'
          onClick={() => flex.set({ person: person })}
        >
          Post Values to Component 3
        </Button>
      </Card.Body>
    </Card>
  )
}

const Component3 = (props) => {
  const { visible } = props
  // eslint-disable-next-line
  let [state, flex] = useFlexContext()
  return (
    <Card className={visible ? '' : 'd-none'}>
      <Card.Header>Component 3</Card.Header>
      <Card.Body>
        <Card.Text>These values come from Component 2</Card.Text>
        <Form>
          <Row>
            <Col size='4' className='p-1'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='text'
                readOnly
                value={flex.get('person.name', '')}
              />
            </Col>
            <Col size='4' className='p-1'>
              <Form.Label>Age</Form.Label>
              <Form.Control
                type='text'
                readOnly
                value={flex.get('person.age', '')}
              />
            </Col>
            <Col size='4' className='p-1'>
              <Form.Label>Height</Form.Label>
              <Form.Control
                type='text'
                readOnly
                value={flex.get('person.height', '')}
              />
            </Col>
          </Row>
        </Form>
      </Card.Body>
    </Card>
  )
}

const Main = (props) => {
  // eslint-disable-next-line
  let [state, flex] = useFlexContext()
  return (
    <div className='w-100'>
      <Row>
        <Col cols='12' className='p-1'>
          <Jumbotron className='py-4'>
            <Container>
              <h1>Context</h1>
              <p className='lead'>
                When you wrap yor application inside of Bootflex Context you can
                utilise the useFlexContext() hook to easily share data and props
                between your own components throughout your entire application.
                Some fixed context properties and setters are provided for
                internal Bootflex functionality such as side panel navigation
                and data table navigation, but ad-hoc context is also made
                available that can be read and set without the normal
                complexities of reducers, payloads and dispatch operations.
              </p>
            </Container>
          </Jumbotron>
        </Col>
      </Row>
      <Container>
        <Row>
          <Col size='12'>
            <p className='lead'>
              Here is an example of three unrelated components talking to each
              other using Bootflex context.
            </p>
          </Col>
        </Row>
        <Row>
          <Col size='4'>
            <Component1 />
          </Col>
          <Col size='4'>
            <Component2 />
          </Col>
          <Col size='4'>
            <Component3 visible={flex.get('component3visibility', true)} />
          </Col>
        </Row>
        <Row className='mt-3'>
          <Col size='12'>
            <h4>Usage</h4>
            <div className='lead'>
              <p className='mb-2'>
                In order to use Bootflex Context simply include Context from
                react-boostrap-extension
                <br />
                <span className='text-primary'>
                  <b>{`import {useFlexContext} from 'bootflex`}</b>
                </span>
              </p>
              <p className='mb-2'>
                To use context, add the following to each component (Bootflex is
                an arbitary variable name)
                <br />
                <span className='text-primary'>
                  <b>const [state,flex] = useFlexContext()</b>
                </span>
              </p>
              <div className='mb-2'>
                To set Context you must supply key pair values - where the first
                value being the ID of the context value and the second value to
                context value. You may also have multiple or nested key pair
                values, as shown in the examples below.
                <br />
                <div className='text-primary'>
                  <b>{`flex.set ({myName: 'Fred'})`}</b>
                </div>
                <div className='text-primary'>
                  <b>{`flex.set ({person: {name: 'Fred', age: 40, height: '6ft})`}</b>
                </div>
                <div className='text-primary'>
                  <b>{`flex.set ({color: 'red', fruit: 'apple', sense: 'touch})`}</b>
                </div>
              </div>
              <div className='mb-2'>
                {`To use the Context value a getter is provided flex.get({ID}, defaultValue) - where ID is a string path (or tag) representing the context field. You may also directly refer to context value as state.{id}. The benefit of using the getter function is that a default value (if Context value not found) can also be provided as a second argument. Here are some examples:`}
                <br />
                <div className='text-primary'>
                  <b>{`let val = flex.get ('myName', 'No name defined')`}</b>
                </div>
                <div className='text-primary'>
                  <b>{`let val = flex.get ('person', null)`}</b>
                </div>
                <div className='text-primary'>
                  <b>{`let color = flex.get ('color'); let fruit=flex.get('fruit')`}</b>
                </div>
              </div>
            </div>
          </Col>
        </Row>
        <Row className='mt-3'>
          <Col size='12'>
            <h4>Here is the Complete Code for This Page</h4>
            <pre className='w-100 flex-code-block m-0 p-2'>
              <code>{code}</code>
            </pre>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Main

let code = `
import React, { useState } from 'react'
import { Container, Jumbotron, Card, Form, Button, Row, Col } from 'react-bootstrap'
import { useFlexContext } from '../../lib/xflex'

const Component1 = (props) => {
  let [state, flex] = useFlexContext()
  const [testInput, setTestInput] = useState()

  return (
    <Card>
      <Card.Header>Component 1</Card.Header>
      <Card.Body>
        <Card.Text>Type below and your text will be duplicated in Component 2</Card.Text>
        <Form.Control
          value={testInput}
          onChange={(e) => {
            setTestInput(e.target.value)
            flex.set({ stuff: e.target.value })
          }}
          as='textarea'
          rows={3}
          type='text'
        ></Form.Control>
        <Form.Group controlId='xxx'>
          <Row>
            <Col size='12' className='m-0 p-0 mt-2'>
              <Button
                variant='outline-primary'
                type=''
                className='mr-2 mb-2'
                onClick={(e) => {
                  flex.set({ component3visibility: !flex.get('component3visibility', true) })
                }}
              >
                TOGGLE COMPONENT 3 VISIBILITY
              </Button>
              <Button
                variant='outline-primary'
                type=''
                className='mr-2'
                onClick={(e) => {
                  console.log(state)
                }}
              >
                LOG CONTEXT
              </Button>
            </Col>
          </Row>
        </Form.Group>
      </Card.Body>
    </Card>
  )
}

const Component2 = (props) => {
  let [state, flex] = useFlexContext()
  const [person, setPerson] = useState({ name: 'Fred', age: 40, height: '6ft' })
  return (
    <Card>
      <Card.Header>Component 2</Card.Header>
      <Card.Body>
        <Card.Text as='div' className='mb-2'>
          <div>The text below originates from component 1</div>
          <i className='text-primary'>{state.stuff}</i>
        </Card.Text>
        <Form>
          <Row>
            <Col size='4' className='p-1'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='text'
                value={person.name}
                onChange={(e) => setPerson({ ...person, name: e.target.value })}
              />
            </Col>
            <Col size='4' className='p-1'>
              <Form.Label>Age</Form.Label>
              <Form.Control
                type='text'
                value={person.age}
                onChange={(e) => setPerson({ ...person, age: e.target.value })}
              />
            </Col>
            <Col size='4' className='p-1'>
              <Form.Label>Height</Form.Label>
              <Form.Control
                type='text'
                value={person.height}
                onChange={(e) => setPerson({ ...person, height: e.target.value })}
              />
            </Col>
          </Row>
        </Form>
        <Button
          variant='outline-danger'
          className='mt-2'
          onClick={() => flex.set({ person: person })}
        >
          Post Values to Component 3
        </Button>
      </Card.Body>
    </Card>
  )
}

const Component3 = (props) => {
  const { visible } = props
  // eslint-disable-next-line
  let [state, flex] = useFlexContext()
  return (
    <Card className={visible ? '' : 'd-none'}>
      <Card.Header>Component 3</Card.Header>
      <Card.Body>
        <Card.Text>These values come from Component 2</Card.Text>
        <Form>
          <Row>
            <Col size='4' className='p-1'>
              <Form.Label>Name</Form.Label>
              <Form.Control type='text' readOnly value={flex.get('person.name', '')} />
            </Col>
            <Col size='4' className='p-1'>
              <Form.Label>Age</Form.Label>
              <Form.Control type='text' readOnly value={flex.get('person.age', '')} />
            </Col>
            <Col size='4' className='p-1'>
              <Form.Label>Height</Form.Label>
              <Form.Control type='text' readOnly value={flex.get('person.height', '')} />
            </Col>
          </Row>
        </Form>
      </Card.Body>
    </Card>
  )
}

const Main = (props) => {
  // eslint-disable-next-line
  let [state, flex] = useFlexContext()
  return (
    <div className='w-100'>
      <Row>
        <Col cols='12' className='p-1'>
          <Jumbotron className='py-4'>
            <Container>
              <h1>Context</h1>
              <p className='lead'>
                When you wrap yor application inside of Bootflex Context you can utilise the
                useFlexContext() hook to easily share data and props between your own components
                throughout your entire application. Some fixed context properties and setters are
                provided for internal Bootflex functionality such as side panel navigation and data table
                navigation, but ad-hoc context is also made available that can be read and set
                without the normal complexities of reducers, payloads and dispatch operations.
              </p>
            </Container>
          </Jumbotron>
        </Col>
      </Row>
      <Container>
        <Row>
          <Col size='12'>
            <p className='lead'>
              Here is an example of three unrelated components talking to each other using Bootflex
              context.
            </p>
          </Col>
        </Row>
        <Row>
          <Col size='4'>
            <Component1 />
          </Col>
          <Col size='4'>
            <Component2 />
          </Col>
          <Col size='4'>
            <Component3 visible={flex.get('component3visibility', true)} />
          </Col>
        </Row>
        <Row className='mt-3'>
          <Col size='12'>
            <h4>Usage</h4>
            <div className='lead'>
              <p className='mb-2'>
                In order to use Bootflex Context simply include Context from react-boostrap-extension
                <br />
                <span className='text-primary'>
                  <b>import Context from 'bootflex'</b>
                </span>
              </p>
              <p className='mb-2'>
                To use context, add the following to each component (Bootflex is an arbitary variable
                name)
                <br />
                <span className='text-primary'>
                  <b>const [state,flex] = useFlexContext()</b>
                </span>
              </p>
              <div className='mb-2'>
                To set Context you must supply key pair values - where the first value being the ID
                of the context value and the second value to context value. You may also have
                multiple or nested key pair values, as shown in the examples below.
                <br />
                <div className='text-primary'>
                  <b>{flex.set ({myName: 'Fred'})}</b>
                </div>
                <div className='text-primary'>
                  <b>{flex.set ({person: {name: 'Fred', age: 40, height: '6ft})}</b>
                </div>
                <div className='text-primary'>
                  <b>{flex.set ({color: 'red', fruit: 'apple', sense: 'touch})}</b>
                </div>
              </div>
              <div className='mb-2'>
                {To use the Context value a getter is provided flex.get({ID}, defaultValue) - where ID is a string path (or tag) representing the context field. You may also directly refer to context value as state.{id}. The benefit of using the getter function is that a default value (if Context value not found) can also be provided as a second argument. Here are some examples:}
                <br />
                <div className='text-primary'>
                  <b>{let val = flex.get ('myName', 'No name defined')}</b>
                </div>
                <div className='text-primary'>
                  <b>{let val = flex.get ('person', null)}</b>
                </div>
                <div className='text-primary'>
                  <b>{let color = flex.get ('color'); let fruit=flex.get('fruit')}</b>
                </div>
              </div>
            </div>
          </Col>
        </Row>
        <Row className='mt-3'>
          <Col size='12'>
            <h4>Here is the Complete Code for This Page</h4>
            <pre className='w-100 flex-code-block m-0 p-2'>
              <code>{code}</code>
            </pre>
          </Col>
        </Row>
      </Container>
    </div>
  )
}
`
