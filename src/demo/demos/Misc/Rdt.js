import React, { useState, useEffect } from 'react'
import movieData from './sampleMovieData'
import { Container, Jumbotron } from 'react-bootstrap'
import { useFlex, FlexTable, Pagination } from 'bootflex'
import { useForm, Flex, FlexCard, Lead, H, B, Form, Input } from 'bootflex'
import { FaPlus, FaTimes, FaCheck, FaUndo } from 'react-icons/fa'
import uuidv4 from 'uuid/v4'

//import get from 'lodash/get'

let schema = {
  id: {
    type: 'input',
    props: {
      className: 'd-none'
    }
  },
  title: {
    type: 'input',
    label: 'Title',
    validation: { required: 'Title is required' }
  },
  year: {
    type: 'input',
    label: 'Year',
    validation: { required: 'Name is required' }
  },
  runtime: {
    type: 'input',
    label: 'Run Time (minutes)',
    validation: { required: 'Name is required' }
  },
  genres: {
    type: 'select',
    label: 'Genres',
    options: [
      'Fantasy',
      'Comedy',
      'Music',
      'Drama',
      'Adventure',
      'Thriller',
      'Horror',
      'Romance',
      'Mystery',
      'Biography',
      'Sport',
      'War',
      'Crime',
      'Family',
      'Film-Noir',
      'Sci-Fi',
      'History',
      'Animation'
    ],
    validation: { required: 'Genres is Required' },
    props: {
      isMulti: true
    }
  },
  director: {
    type: 'input',
    label: 'Director'
  },
  actors: {
    type: 'input',
    label: 'Actors'
  },
  plot: {
    type: 'input',

    label: 'Plot',
    rows: 3,
    props: {
      as: 'textarea'
    }
  },
  posterUrl: {
    type: 'input',
    label: 'URL for Poster'
  }
}

const EditRecord = ({ onChange, record }) => {
  let form = useForm(schema, record)
  let [flex] = useFlex()

  // SUBMISSION HANDLER
  const onSubmit = (values) => {
    console.log('Form Submit', values)
    flex._editorActive('sample-table-editor', false)
    if (onChange) onChange(values)
  }

  return (
    <>
      <Form id='movie-form' form={form} onSubmit={onSubmit} className='p-2'>
        <div>State {form.formState.isDirty ? 'dirty' : 'ok'}</div>
        <Form.Row>
          <Input md='12' name='id' />
          <Input md='12' name='title' />
        </Form.Row>
        <Form.Row>
          <Input md='4' name='year' />
          <Input md='4' name='runtime' />
          <Input md='4' name='director' />
        </Form.Row>
        <Form.Row>
          <Input md='12' name='genres' />
        </Form.Row>
        <Form.Row>
          <Input md='12' name='actors' />
        </Form.Row>{' '}
        <Form.Row>
          <Input md='12' name='plot' />
        </Form.Row>
        <Form.Row>
          <Input md='12' name='posterUrl' />
        </Form.Row>
      </Form>
    </>
  )
}

const TableHeaderControls = (props) => {
  let [flex] = useFlex()

  // Console.log('--->', _state.editorActive[], flex._editorIsActive())
  if (flex._editorIsActive('sample-table-editor')) {
    return (
      <div className='d-flex display-row justify-content-end'>
        <div
          className='order-1 ml-2 flex-table-button'
          onClick={() => flex._editorReset('movie-form')}
        >
          <FaUndo className='flex-table-icon' title='Undo' />
        </div>
        <div
          className='order-3 ml-2 flex-table-button'
          onClick={() => {
            flex._editorSubmit('movie-form')
          }}
        >
          <FaCheck className='flex-table-icon' title='Save & Exit' />
        </div>
        <div
          className='order-1 ml-2 flex-table-button'
          onClick={() => flex._editorActive('sample-table-editor', false)}
        >
          <FaTimes className='flex-table-icon' title='Exit without saving' />
        </div>
      </div>
    )
  } else {
    return (
      <div className='ml-2 flex-table-button'>
        <FaPlus className='flex-table-icon' />
      </div>
    )
  }
}

// READ DATA AND ASSIGN UNIUQUE ID
// const getData = (filter) => {
//   let dt = movieData.map((rec) => {
//     rec.id = uuidv4()
//     return rec
//   })
//   return dt
// }

const Rdt = () => {
  // const [flex, _state] = useFlex()
  const [data, setData] = useState()
  // eslint-disable-next-line
  const [filter, setFilter] = useState()
  useEffect(() => {
    setData(fetchData(movieData, filter))
    //setData(fetchData(movieData, filter))
  }, [filter])

  const columns = React.useMemo(
    () => [
      {
        name: 'Title',
        selector: 'title',
        sortable: true,
        minWidth: '150px'
      },
      {
        name: 'Year',
        selector: 'year',
        sortable: true,
        width: '100px'
      },
      {
        name: 'Director',
        selector: 'director',
        sortable: true
      }
    ],
    []
  )

  const editorChange = (values) => {
    // Modify copy of immutable data
    let dt = [...data]
    dt.find((rec, index) => {
      if (rec.idx === parseInt(values.id)) {
        dt[index] = { ...values, idx: rec.idx, id: uuidv4() }
        // Console.log('Index is', index)
        // MovieData[2] = { ...values, id: parseInt(values.id) }
      }
      return null
    })
    setData(dt)
  }

  // F-CRUD OPERATIONS
  const fetchData = (data, filter) => {
    return data.map((rec, i) => {
      let { id, title, year, director } = rec
      return { idx: id, id: uuidv4(), title, year, director }
    })
  }
  const createRecord = (rec) => {
    data.push(rec)
  }
  const readRecord = (key) => {
    // Get Movie Data Index from Table Array
    let lookupId = data.find((rec) => rec.id === key)
    // Get Record from Movie Data
    if (lookupId) return movieData.find((rec) => rec.id === lookupId.idx)
  }
  const updateRecord = (key, rec) => {
    console.log('Here at update record')
    data[key] = rec
  }
  const deleteRecord = (key) => {
    delete data[key]
  }

  const PaginationComponent = () => {
    return (
      <>
        <Flex.Item order='1' align='left'>
          <Pagination tableId='sample-table' />
        </Flex.Item>
        <Flex.Item
          order='2'
          align='right'
          content='Notice -This footer has its own pagination'
        />
      </>
    )
  }

  if (!data) return <></>
  return (
    <FlexCard.Wrapper>
      <FlexCard fill={true}>
        <FlexCard.Header className='bg-white'>
          <Jumbotron className='w-100 p-4 mb-1'>
            <Container>
              <H x1>FlexTable </H>
              <Lead className='mt-2' justify>
                A flexible and versatile datatable using the excellent RDT
                (react-data-table-component) package under the hood. Enhanced to
                include context pagination , auto pagination sizing, card layout
                and{' '}
                <B danger x2>
                  Editor Component.
                </B>{' '}
                                                                              Try Clicking on Row to Edit a record. Note: In a production
                evironment you would be using asyncronous calls to fetch and
                update data.
              </Lead>
            </Container>
          </Jumbotron>
        </FlexCard.Header>
        <FlexCard.Body>
          <FlexTable
            id='sample-table'
            keyField='id'
            rowHeight='28px'
            file={true}
            className='w-100'
            striped
            responsive
            paginationContext={true}
            tableHeader={
              <>
                <Flex.Item order='1' align='left'>
                  <h4>Movie List</h4>
                </Flex.Item>
                <Flex.Item order='1' align='right'>
                  <TableHeaderControls className='flex-table-button' />
                </Flex.Item>
              </>
            }
            tableFooter={<PaginationComponent />}
            editor={
              <EditRecord
                onChange={(values) => editorChange(values)}
                create={(rec) => createRecord(rec)}
                read={readRecord}
                update={(key, rec) => updateRecord(key, rec)}
                delete={(rec) => deleteRecord(rec)}
              />
            }
            columns={columns}
            data={data}
          />
        </FlexCard.Body>
      </FlexCard>
    </FlexCard.Wrapper>
  )
}

export default Rdt
