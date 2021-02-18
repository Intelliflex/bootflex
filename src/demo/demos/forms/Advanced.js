import React, { useEffect, useState } from 'react'
import 'react-datepicker/dist/react-datepicker.css'
import { Container, Jumbotron, Row, Col, Tab, Tabs } from 'react-bootstrap'
import {
  useFlexContext,
  Layout,
  Form,
  Lead,
  Info,
  Spacer,
  Input,
  Button,
  Code,
  H,
  B,
  getScreenWidth,
  getScreenSize,
  Frame,
  Heading,
  useForm,
  useNest
} from 'bootflex'
import { FaPlus } from 'react-icons/fa'

// FOR RE-RENDERING EFFICIENCY DEFINE DEFAULTS OUTSIDE OF COMPONENT
let defaults = {
  name: 'George Washington',
  address: `The Whitehouse\n1600 Pennsylvania Avenue`,
  email: 'george@capital.com',
  city: 'Washington',
  state: 'DC',
  zipcode: '20500',
  invoice: 'AA-99-7523',
  items: [
    {
      code: 'hat',
      description: 'Mens Hat',
      qty: 1,
      price: 123
    },
    {
      code: 'jacket',
      description: 'Sports Jacket',
      qty: 1,
      price: 456.78
    },
    {
      code: 'shirt',
      description: 'Business Shirt',
      qty: 2,
      price: 1024.61
    },
    {
      code: 'trousers',
      description: 'Dress Trousers',
      qty: 245,
      price: 0.87
    }
  ]
}
let renderCount = 0

const FormIntro = (props) => {
  // eslint-disable-next-line
  const [state, flex] = useFlexContext()
  // HIDE GLOBAL SIDEBAR FOR THIS PAGE
  useEffect(() => {
    flex._setPanel('main-left', false)
    flex._setTabBar('main-tabbar', false)
    return () => {
      flex._setPanel('main-left', true)
      flex._setTabBar('main-tabbar', true)
    }
    // eslint-disable-next-line
  }, [])

  // Change to Fluid Container at less than lg
  let fluid = flex._isBreakpoint('lg') ? true : false

  return (
    <Layout.Responsive
      id='layout-demo-responsive'
      variant='fixed'
      collapse='md'
    >
      <Layout.Panel
        id='form-sidebar'
        target='layout-demo-responsive'
        width='200px'
        position='left'
      >
        <Sidebar />
      </Layout.Panel>
      <Layout.Panel
        id='demo-content'
        target='layout-demo-responsive'
        overflow='overflow-y'
        className={`container${fluid ? '-fluid' : ''} p-2`}
      >
        <Jumbotron>
          <Container fluid={fluid}>
            <H x1>Form Control</H>
            <Lead className='mt-2' justify>
              In addition to schema and simplified layouts, Bootflex also allows
              nested row based based forms suitable for CRUD
              (Create/Read/Update/Delete) operations. The visual layout of the
              nested layouts is some what opionated in design layout however
              additional flexibility may be provided in future releases based on
              feedback and demand.
            </Lead>
          </Container>
        </Jumbotron>
        <Container fluid={fluid}>
          <TabContent></TabContent>
        </Container>

        <Spacer x2 />
      </Layout.Panel>
    </Layout.Responsive>
  )
}

export default FormIntro

const FormExample = (props) => {
  const { fluid } = props
  const [state, flex] = useFlexContext()

  const [invoiceTotal, setInvoiceTotal] = useState(0)

  /**********************************************************************************
   **** DEFINE SCHEMA - NO DYNAMIC SCHEMA UPDATES HERE SO IT CAN BE SIMPLE OBJECT ***
   **********************************************************************************/
  let schema = {
    name: {
      type: 'input',
      label: 'Name',
      validation: { required: 'Name is required' }
    },
    email: {
      type: 'email',
      label: 'Email'
    },
    address: {
      type: 'input',
      as: 'textarea',
      rows: 3,
      label: 'Address'
    },
    city: {
      label: 'Town / City'
    },
    state: {
      label: 'State'
    },
    zipcode: {
      label: 'Zip Code'
    },
    phone: {
      label: 'Phone No',
      validation: {
        required: 'Phone is required'
      }
    },
    invoice: {
      type: 'input-mask',
      label: 'Invoice Number AA-99-9999',
      validation: { required: 'Invoice Number is Required' },
      props: {
        mask: 'aa-99-9999'
      }
    },
    date: {
      type: 'date',
      label: 'Joining Date'
    },
    items: {
      code: {
        type: 'select',
        label: 'Code',
        options: [
          { value: 'hat', label: 'Hat' },
          { value: 'jacket', label: 'Jacket' },
          { value: 'scaff', label: 'Scaff' },
          { value: 'shirt', label: 'Shirt' },
          { value: 'skirt', label: 'Skirt' },
          { value: 'trousers', label: 'Trousers' }
        ],
        validation: { required: 'Code is required' }
      },
      description: {
        type: 'input',
        label: 'description',
        validation: { required: 'Description is Required' }
      },
      qty: {
        type: 'number-format',
        label: 'Quantity',
        right: true,
        validation: { required: 'Qty is required' },
        props: {
          onBlur: (e) => updateTotals()
        }
      },
      price: {
        type: 'number-format',
        label: 'Price',
        right: true,
        validation: { required: 'Price is Required' },
        props: {
          thousandSeparator: true,
          decimalScale: 2,
          fixedDecimalScale: true,
          onBlur: (e) => setTimeout(() => updateTotals(), 100)
        }
      },
      linetotal: {
        type: 'number-format',
        label: 'Total',
        right: true,
        calc: {
          fields: ['qty', 'price'],
          fn: (qty, price) => {
            return parseFloat(qty) * parseFloat(price)
          }
        },
        props: {
          thousandSeparator: true,
          decimalScale: 2,
          fixedDecimalScale: true,
          disabled: true,
          prefix: '$',
          className: 'flex-form-disabled'
        }
      }
    },
    invoiceTotal: {
      type: 'number-format',
      right: true,
      props: {
        thousandSeparator: true,
        decimalScale: 2,
        fixedDecimalScale: true,
        disabled: true,
        prefix: '$',
        className: 'flex-form-disabled'
      }
    }
  }

  // THE MAGIC - FORM HOOK AND NTESTED ITEMS HOOK
  let form = useForm(schema, defaults)
  let { control, setValue, getValues } = form
  let nest = useNest({
    name: 'items',
    control: control,
    defaults: { code: '', description: '', qty: '', price: '', linetotal: '' }
  })

  // OPTIONAL METHOD TO MAKE FOR VALUES AVAILABLE TO OUTSIDE COMPONENTS USING Bootflex CONTEXT
  // Make Form Values available to outside components (eg: The sidebar) by adding to Bootflex user context
  useEffect(() => {
    flex.set({
      testformAddRow: () =>
        nest.append({
          code: '',
          description: '',
          qty: '',
          price: '',
          linetotal: ''
        })
    })
    flex.set({ testformGetValues: () => form.getValues() })
    flex.set({ testformGetSchema: () => form.schema })
    flex.set({ testformGetObject: () => form })
    // Note: We cant pass in Bootflex context to a dependency array so prevent warnings instead
    // eslint-disable-next-line
  }, [])

  // UPDATE TOTALS (CALCULATED WHEN ITEM VALUES CHANGE OR ON INIT )
  const updateTotals = React.useCallback(() => {
    let values = getValues()
    let invTotal = 0
    if ((values && !values.items) || !values.items.length) return
    for (let idx = 0; idx < values.items.length; idx++) {
      let qty = parseFloat(getValues(`items[${idx}].qty`)) || 0
      let price = parseFloat(getValues(`items[${idx}].price`)) || 0
      let total = qty * price
      setValue(`items[${idx}].linetotal`, total)
      invTotal += total
    }
    setInvoiceTotal(invTotal)
  }, [setValue, getValues])

  // TRIGGER TOTALS UPDATE WHEN NEST VALUES CHANGE
  useEffect(() => {
    updateTotals()
  }, [nest.fields, updateTotals])

  // JSX TO RENDER THE TOTALS ROW (TOTALLY USER DEFINABLE)
  const totalRow = (
    <>
      <Col sm='10' className='d-flex align-self-center justify-content-end'>
        <div className='pr-2'>
          <B x2>TOTALS</B>
        </div>
      </Col>
      <Input
        colClass='flex-nest-col'
        className='flex-nest-total'
        sm='2'
        name='invoiceTotal'
        value={invoiceTotal}
      />
    </>
  )

  // FORM SUBMISSION HANDLER
  const onSubmit = (values) => {
    console.log('Form Submit', values)
  }

  renderCount++
  return (
    <>
      <Container fluid={fluid}>
        <Info className='mt-1' justify>
          The example below shows a layout form suitable for invoicing. Inspect
          the source code and notice the simplicity of code required for layout.
          The form complexities are handled in the schema and these are
          intuitive and easy to understand. Use your browser Dev Tools to adjust
          screen sizes and mobile layouts and notice how the nested items scroll
          horizontally according to the responsive property break on small (sm)
          screen sizes and then collapses to vertical layout below this size.
          Also observe the mininmal render count for form changes, resulting
          primarily from the adoption of uncontrolled inputs using
          react-hook-form library.
        </Info>
      </Container>
      <Spacer x2 />
      <Container fluid={fluid}>
        <Row>
          <Col lg='12'>
            <Form
              id='test-form'
              form={form}
              submit={state.submit}
              onSubmit={onSubmit}
              className='p-2'
            >
              <h4 className='text-success'>
                SAMPLE Bootflex FORM (INVOICE LAYOUT)
              </h4>
              <H danger x6>
                Screen Width {getScreenWidth()} Size {getScreenSize()} Render
                Count {renderCount}
              </H>
              <Form.Row>
                <Col sm='6'>
                  <Input name='name' />
                  <Input as='textarea' name='address' />
                  <Input placeholder='City / Town' name='city' />
                  <Input name='state' />
                  <Input name='zipcode' />
                </Col>
                <Col sm='6'>
                  <Input name='invoice' />
                  <Input name='email' />
                  <Input name='phone' />
                </Col>
              </Form.Row>
              <Spacer x2 />
              {/* DEFINE RESPONSIVE NESTED FORM - RESPOSIVE AT SM BREAK / COLLAPES TO VERTICAL AT XS */}
              <Form.Nest
                nest={nest}
                deleteBtn={true}
                insertBtn={false}
                totalRow={totalRow}
                update={updateTotals}
                responsive='md' // Responsive (horizontal scroll) for small screens
                collapse='xs' // Collapse to veritical layout on extra small
                debuginfo
              >
                <Input size={2} name='code' />
                <Input size={4} name='description' />
                <Input size={2} name='qty' />
                <Input size={2} name='price' />
                <Input size={2} name='linetotal' />
              </Form.Nest>
              <Form.Row>
                <Button
                  id='test-form-add-record'
                  md='6'
                  className='btn-success'
                  onClick={() =>
                    nest.append({
                      code: '',
                      description: '',
                      qty: '',
                      price: '',
                      linetotal: ''
                    })
                  }
                >
                  {<FaPlus />} ADD RECORD
                </Button>
                <Button md='6' className='btn-primary' type='submit'>
                  Submit
                </Button>
              </Form.Row>
            </Form>
          </Col>
        </Row>
        <Button
          id='test-form-hidden-show-values-button'
          className='d-none'
          onClick={() => console.log(getValues())}
        >
          SHOW VALUES
        </Button>
      </Container>
    </>
  )
}

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
      <Tab eventKey='layout' title='Layout Code'>
        <Code title='Layout Code'>{layoutCode}</Code>
      </Tab>
      <Tab eventKey='schema' title='Schema'>
        <Code title='Schema'>{schemaCode}</Code>
      </Tab>
    </Tabs>
  )
}

const Sidebar = (props) => {
  // eslint-disable-next-line
  let [state, flex, _state] = useFlexContext()
  return (
    <Container className='h-100 p-2'>
      <Frame className='w-100 h-100 p-1 bg-light overflow-hidden'>
        <Heading>
          <b className='text-center'>FORM DEMONSTRATION SIDEBAR</b>
        </Heading>
        <Heading bg='#3E4551'>
          <i>
            Some of these buttons log to the console, so open your developer
            tools
          </i>
        </Heading>
        <Spacer />
        <Button
          expand
          space
          className='btn-success'
          // TO PROVIDE EXTENRAL INTERACTION WITH FORM A HIDDEN BUTTON IS CREATED WITH ID {FormId}-add
          onClick={() => console.log(state.testformAddRow())}
          // OnClick={()=> }
        >
          Add Record
        </Button>
        <Button
          expand
          space
          className='btn-primary'
          // TO PROVIDE EXTENRAL INTERACTION WITH FORM A HIDDEN BUTTON IS CREATED WITH ID {FormId}-submit
          onClick={() => document.getElementById('test-form-submit').click()}
        >
          Submit Form
        </Button>
        <Button
          expand
          space
          className='btn-info'
          onClick={() => console.log(state.testformGetSchema())}
        >
          Log Schema
        </Button>
        <Button
          expand
          space
          className='btn-info'
          onClick={() => console.log(state.testformGetValues())}
        >
          Log RHF Values
        </Button>
        <Button
          expand
          space
          className='btn-info'
          onClick={() => console.log(state.testformGetObject())}
        >
          Log RHF Object
        </Button>
      </Frame>
    </Container>
  )
}

const layoutCode = `
<Form id='test-form' form={form} onSubmit={onSubmit} className='p-2'>
	<h4 className='text-success'>SAMPLE Bootflex FORM</h4>
	<h6>Render Count {renderCount}</h6>
	<Form.Row>
		<Input sm='6' name='name' />
		<Input sm='6' name='email' />
	</Form.Row>
	<Form.Row>
		<Input as='textarea' sm='6' name='address' />
		<Input sm='6' placeholder='City / Town' name='city' />
		<Input sm='6' name='state' />
		<Input sm='6' name='zipcode' />
		<Input sm='6' name='phone' />
		<Input sm='6' name='funds' />
	</Form.Row>
	{/* DEFINE RESPONSIVE NESTED FORM - RESPOSIVE AT SM BREAK / COLLAPES TO VERTICAL AT XS */}
	<Form.Nest
		nest={nest}
		deleteBtn={true}
		insertBtn={false}
		totalRow={totalRow}
		update={updateTotals}
		responsive='sm'
	>
		<Input xs={2} name='code' />
		<Input xs={4} name='description' />
		<Input xs={2} name='qty' />
		<Input xs={2} name='price' />
		<Input xs={2} name='linetotal' />
	</Form.Nest>
	<Spacer x2 />
	<Form.Row>
		<Button
			md='6'
			className='btn-success'
			onClick={() =>
				nest.append({ code: '', description: '', qty: '', price: '', linetotal: '' })
			}
		>
			{<FaPlus />} ADD RECORD
		</Button>
		<Button md='6' className='btn-primary' type='submit'>
			Submit
		</Button>
	</Form.Row>
</Form>
`

const schemaCode = `
/**********************************************************************************
 **** DEFINE SCHEMA - NO DYNAMIC SCHEMA UPDATES HERE SO IT CAN BE SIMPLE OBJECT ***
 **********************************************************************************/
let schema = {
	name: {
		type: 'input',
		label: 'Name',
		validation: { required: 'Name is required' },
	},
	email: {
		type: 'email',
		label: 'Email',
	},
	address: {
		type: 'input',
		as: 'textarea',
		rows: 3,
		label: 'Address',
	},
	city: {
		label: 'Town / City',
	},
	state: {
		label: 'State',
	},
	zipcode: {
		label: 'Zip Code',
	},
	phone: {
		label: 'Phone No',
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
		},
	},
	date: {
		type: 'date',
		label: 'Joining Date',
	},
	items: {
		code: {
			type: 'input',
			label: 'Code',
			validation: { required: 'Code is required' },
		},
		description: {
			type: 'input',
			label: 'description',
			validation: { required: 'Description is Required' },
		},
		qty: {
			type: 'number-format',
			label: 'Quantity',
			right: true,
			validation: { required: 'Qty is required' },
			props: {
				onBlur: (e) => updateTotals(e),
			},
		},
		price: {
			type: 'number-format',
			label: 'Price',
			right: true,
			validation: { required: 'Price is Required' },
			props: {
				thousandSeparator: true,
				decimalScale: 2,
				fixedDecimalScale: true,
				onBlur: (e) => setTimeout(() => updateTotals(), 100),
			},
		},
		linetotal: {
			type: 'number-format',
			label: 'Total',
			right: true,
			calc: {
				fields: ['qty', 'price'],
				fn: (qty, price) => {
					return parseFloat(qty) * parseFloat(price)
				},
			},
			props: {
				thousandSeparator: true,
				decimalScale: 2,
				fixedDecimalScale: true,
				disabled: true,
				prefix: '$',
				className: 'flex-form-disabled',
			},
		},
	},
	invoiceTotal: {
		type: 'number-format',
		right: true,
		props: {
			thousandSeparator: true,
			decimalScale: 2,
			fixedDecimalScale: true,
			disabled: true,
			prefix: '$',
			className: 'flex-form-disabled',
		},
	},
}
`
