import React, { useState } from 'react'
import 'react-datepicker/dist/react-datepicker.css'
import { Container, Jumbotron, Row, Col, Tabs, Tab } from 'react-bootstrap'
import {
  Layout,
  Lead,
  Info,
  Code,
  Spacer,
  Input,
  Button,
  B,
  H,
  useRecord,
  useForm,
  Form
} from 'bootflex'
import InputMask from 'react-input-mask'

let renderCount = 0

const FormIntro = (props) => {
  return (
    <Layout.Responsive
      id='layout-demo-responsive'
      variant='fixed'
      collapse='md'
    >
      <Layout.Panel
        id='demo-content'
        target='layout-demo-responsive'
        overflow='overflow-y'
        className='p-2'
      >
        <Jumbotron>
          <Container>
            <H x1>Form Control</H>
            <Lead className='mt-2' justify>
              Form development made easy and <i>a little bit sexy.</i>{' '}
              <B primary>React-Bootstrap </B> form controls,{' '}
              <B primary>React-Select</B> and <B primary>React-Datepicker</B>
              {` `}
              are wrapped into a higher order form component with a state
              managament hook that supports schema mapping for form validation
              and custom props.
            </Lead>
          </Container>
        </Jumbotron>
        <Container>
          <TabContent />
        </Container>
      </Layout.Panel>
    </Layout.Responsive>
  )
}

export default FormIntro

const TabContent = (props) => {
  const { fluid } = props
  const [key, setKey] = useState('home')
  return (
    <Tabs
      id='page-tabs'
      fluid={fluid}
      activeKey={key}
      onSelect={(k) => setKey(k)}
    >
      <Tab eventKey='home' title='Example'>
        <FormExample fluid={fluid} />
      </Tab>
      <Tab eventKey='types' title='Documentation'></Tab>
      <Tab eventKey='schema' title='Schema'>
        <Code title='Schema'>{schemaCode}</Code>
      </Tab>
    </Tabs>
  )
}

const FormExample = (props) => {
  const [code, setCode] = useState({
    code: layoutCode,
    title: 'Layout Source Code'
  })

  // DEFINE SCHEMA (This can be a const or useState, however useRecord allows easy dynamic alteration)
  let [schema, SCHEMA] = useRecord({
    name: {
      type: 'input',
      label: 'Name',
      validation: { required: 'Name is required' },
      props: {
        className: 'text-success',
        onBlur: (e) => console.log('Val', e.target.value),
        placeholder: 'Name'
      }
    },
    email: {
      type: 'email',
      label: 'Email Address',
      validation: { required: 'Valid Email is required' }
    },
    playsport: {
      label: 'Plays Sport',
      type: 'checkbox'
    },
    favsport: {
      type: 'select',
      label: 'Favourite Sport',
      validation: { required: 'Sport is Required' }
    },
    icecream: {
      type: 'select',
      label: 'Favourite Icecream',
      options: [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' }
      ],
      validation: { required: 'Icecream is Required' }
    },
    joindate: {
      type: 'date',
      label: 'Joining Date'
    },
    funds: {
      type: 'number-format',
      label: 'Funds',
      right: true,
      validation: { required: 'Funds are required' },
      props: {
        className: 'text-right',
        labelClass: 'text-right',
        thousandSeparator: true,
        decimalScale: 2,
        fixedDecimalScale: true,
        prefix: '$',
        onBlur: (e) => console.log('Blur', e.target)
      }
    },
    security: {
      type: 'input-mask',
      label: 'Secrity Number aa-9999-99',
      validation: { required: 'Security Number Required' },
      props: {
        className: 'text-uppercase',
        mask: 'aa-9999-99'
      }
    },
    custom: {
      type: 'custom',
      label: 'Custom aa-aaa-999-9999',
      validation: { required: 'Mask is required' },
      props: {
        className: 'text-uppercase',
        mask: 'aa-aaa-999-9999',
        as: <InputMask />
      }
    }
  })

  // WHEN OPTIONS PASSED TO SELECT INPUT ARE DYNAMIC THEY SHOULD HAVE THEIR OWN STATE AND NOT BE INCLUDED IN SCHEMA
  let [sportOptions, setSportOptions] = useState([
    { value: 'golf', label: 'Golf' },
    { value: 'tennis', label: 'Tennis' },
    { value: 'baseball', label: 'Baseball' }
  ])

  // SUBMISSION HANDLER
  const onSubmit = (values) => {
    console.log('Form Submit', values)
  }

  renderCount++

  // DEFINE DEFAULTS (THIS COULD BE DATA READ FROM YOUR SERVER API)
  let defaults = {
    email: 'fred@smith.com',
    playsport: true,
    phone: '07 3400 2100',
    favsport: { value: 'golf', label: 'Golf' },
    joindate: new Date('2020-01-01'),
    funds: 123.4,
    security: 'AB-1234-56',
    custom: 'AA-XXXX-123-1234'
  }

  // THE MAGIC - FORM HOOK
  let form = useForm(schema, defaults)
  return (
    <>
      <Container>
        <Info className='mt-2' justify>
          This form control leverages <B success> react-hook-form</B> (RHF) for
          the heavy lifting of state management and re-rendering efficiencies
          using uncontrolled inputs. Functionality and props are inherited from
          react-hook-form with the additional Bootflex specific properties
          provided. You may assign responsive column breaks within each input
          without having to wrap them in separate Col components (as shown in
          layout code).
        </Info>
        <Info className='my-2' justify>
          Note: HTML5 validation and Bootstrap form-control / feedback is
          supported on all elements. This <B danger>includes react-select</B>{' '}
          which does not have this ability natively for required selections. Try
          submitting the demo form to see validation in effect.
        </Info>
      </Container>
      <Spacer x2 />
      <Container>
        <Row>
          <Col lg='6'>
            {/* FORM DEFINITION - IT'S THAT SIMPLE (SEXY ISN"T IT) */}
            <Form
              id='test-form'
              form={form}
              onSubmit={onSubmit}
              className='p-2'
            >
              <h4 className='text-success'>SAMPLE Bootflex FORM</h4>
              <h6>Render Count {renderCount}</h6>
              <Form.Row>
                <Input md='6' name='name' />
                <Input md='6' name='email' />
              </Form.Row>
              <Form.Row>
                <Input md='6' name='playsport' />
              </Form.Row>
              <Form.Row>
                <Input
                  md='6'
                  name='favsport'
                  nofeedback
                  options={sportOptions}
                />
                <Input md='6' name='icecream' />
              </Form.Row>
              <Form.Row>
                <Input md='6' name='joindate' />
                <Input md='6' name='funds' />
              </Form.Row>
              <Form.Row>
                <Input md='6' name='security' />
                <Input md='6' name='custom' />
              </Form.Row>
              <Form.Row className='mb-2'>
                <Button
                  lg='12'
                  className='mt-2 btn btn-primary btn-block'
                  type='submit'
                >
                  Submit
                </Button>
              </Form.Row>
            </Form>
            <Row className='pb-2'>
              <Button
                md='6'
                className='border-0 bg-gradient-green-reverse'
                onClick={() => {
                  SCHEMA.set({ name: { label: 'XXXXXX CHanged' } })
                  setCode({ title: 'Button Code', code: btnChangeNameLabel })
                }}
              >
                Change Name Label
              </Button>
              <Button
                md='6'
                className='border-0 bg-gradient-orange-reverse'
                onClick={() => {
                  setSportOptions([
                    { value: 'football', label: 'Football' },
                    { value: 'badminton', label: 'Badminton' },
                    { value: 'cricket', label: 'Cricket' }
                  ])
                  form.setValue('favsport', null)
                  setCode({ title: 'Button Code', code: btnChangeOptions })
                }}
              >
                Change Options
              </Button>
            </Row>
            <Row className='pb-2'>
              <Button
                md='6'
                className='w-100 border-0 bg-gradient-purple-reverse'
                onClick={() => {
                  form.setValue('name', 'Jim Jones')
                  setCode({ title: 'Button Code', code: btnChangeName })
                }}
              >
                Change Name
              </Button>
              <Button
                md='6'
                className='w-100 border-0 text-primary bg-gradient-rainbow'
                onClick={() => {
                  SCHEMA.setPath('name.props.className', 'text-primary')
                  setCode({ title: 'Button Code', code: btnChangeNameColor })
                }}
              >
                Change Name Color
              </Button>
            </Row>
            <Row className='pb-2'>
              <Button
                md='6'
                className='w-100 border-0 bg-gradient-aqua'
                onClick={() => {
                  console.log('Schema', schema)
                  setCode({ title: 'Layout Code', code: layoutCode })
                }}
              >
                Log Schema
              </Button>
              <Button
                md='6'
                className='w-100 border-0 bg-gradient-aqua'
                onClick={() => {
                  console.log('Schema', form.getValues())
                  setCode({ title: 'Layout Code', code: layoutCode })
                }}
              >
                Log RHF State
              </Button>
            </Row>
            <Row className='pb-2'>
              <Button
                md='6'
                className='w-100 border-0 bg-gradient-aqua'
                onClick={() => {
                  console.log('Form', form)
                }}
              >
                Log Form Control
              </Button>
              <Button
                md='6'
                className='w-100 border-0 bg-gradient-aqua'
                onClick={() => {
                  console.log('Form', form)
                }}
              >
                Log Form Control
              </Button>
            </Row>
          </Col>
          <Col lg='6'>
            <Code title={code.title}>{code.code}</Code>
          </Col>
        </Row>
      </Container>
    </>
  )
}

const layoutCode = `
let form = useForm(schema, defaults)
{/* FORM DEFINITION - IT'S THAT SIMPLE (SEXY ISN"T IT) */}
<Form id='test-form' form={form} onSubmit={onSubmit} className='p-2'>
	<h4 className='text-success'>SAMPLE Bootflex FORM</h4>
	<h6>Render Count {renderCount}</h6>
	<Form.Row>
		<Input md='6' name='name' />
		<Input md='6' name='email' />
	</Form.Row>
	<Form.Row>
		<Input md='6' name='playsport' />
	</Form.Row>
	<Form.Row>
		<Input md='6' name='favsport' nofeedback options={sportOptions} />
		<Input md='6' name='icecream' />
	</Form.Row>
	<Form.Row>
		<Input md='6' name='joindate' />
		<Input md='6' name='funds' />
	</Form.Row>
	<Form.Row>
		<Input md='6' name='security' />
		<Input md='6' name='custom' />
	</Form.Row>
	<Form.Row className='mb-2'>
		<Button lg='12' className='mt-2 btn btn-primary btn-block' type='submit'>
			Submit
		</Button>
	</Form.Row>
</Form>
`
const schemaCode = `
/ // DEFINE SCHEMA (This can be a const or useState, however useRecord allows easy dynamic alteration)
  let [schema, SCHEMA] = useRecord({
    name: {
      type: 'input',
      label: 'Name',
      validation: { required: 'Name is required' },
      props: {
        className: 'text-success',
        onBlur: (e) => console.log('Val', e.target.value),
        placeholder: 'Name',
      },
    },
    email: {
      type: 'email',
      label: 'Email Address',
      validation: { required: 'Valid Email is required' },
    },
    playsport: {
      label: 'Plays Sport',
      type: 'checkbox',
    },
    favsport: {
      type: 'select',
      label: 'Favourite Sport',
      validation: { required: 'Sport is Required' },
    },
    icecream: {
      type: 'select',
      label: 'Favourite Icecream',
      options: [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' },
      ],
      validation: { required: 'Icecream is Required' },
    },
    joindate: {
      type: 'date',
      label: 'Joining Date',
    },
    funds: {
      type: 'number-format',
      label: 'Funds',
      right: true,
      validation: { required: 'Funds are required' },
      props: {
        className: 'text-right',
        labelClass: 'text-right',
        thousandSeparator: true,
        decimalScale: 2,
        fixedDecimalScale: true,
        prefix: '$',
        onBlur: (e) => console.log('Blur', e.target),
      },
    },
    security: {
      type: 'input-mask',
      label: 'Secrity Number aa-9999-99',
      validation: { required: 'Security Number Required' },
      props: {
        className: 'text-uppercase',
        mask: 'aa-9999-99',
      },
    },
    custom: {
      type: 'custom',
      label: 'Custom aa-aaa-999-9999',
      validation: { required: 'Mask is required' },
      props: {
        className: 'text-uppercase',
        mask: 'aa-aaa-999-9999',
        as: <InputMask />,
      },
    },
  })

`

const btnChangeNameLabel = `
Button
	md='6'
	className='border-0 bg-gradient-green-reverse'
	onClick={() => SCHEMA.set({ name: { label: 'Changed Name Label' } })}
>
	Change Name Label
</Button>
`

const btnChangeOptions = `
<Button
	md='6'
	className='border-0 bg-gradient-orange-reverse'
	onClick={() => {
		setSportOptions([
			{ value: 'football', label: 'Football' },
			{ value: 'badminton', label: 'Badminton' },
			{ value: 'cricket', label: 'Cricket' },
		])
		form.setValue('favsport', null)
	}}
>
	Change Sport Options
</Button>
`

const btnChangeName = `
<Button
	md='6'
	className='w-100 border-0 bg-gradient-purple-reverse'
	onClick={() => form.setValue('name', 'Jim Jones')}
>
	Change Name
</Button>
`

const btnChangeNameColor = `
<Button
	md='6'
	className='w-100 border-0 text-primary bg-gradient-rainbow'
	onClick={() => SCHEMA.setPath('name.props.className', 'text-primary')}
>
	Change Name Color
</Button>
`
