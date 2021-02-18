import React from 'react'
import RDT from 'react-select'
import { useForm, Form, Input } from 'bootflex'

let schema = {
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
  fruits: {
    type: 'select',
    label: 'Fruits',
    options: ['apple', 'peach', 'banana'],
    props: {
      isMulti: true
    }
  }
}

const SelectTester = (props) => {
  let form = useForm(schema, { fruits: ['banana'] })

  // SUBMISSION HANDLER
  const onSubmit = (values) => {
    console.log('Form Submit', values)
  }

  let test = [
    { label: 'Apple', value: 'apple' },
    { label: 'Peach', value: 'peach' },
    { label: 'Banana', value: 'banana' }
  ]

  // Let test2 = ['apple', 'peach', 'banana']

  return (
    <>
      <Form id='test-select' form={form} onSubmit={onSubmit} className='p-2'>
        <RDT options={test} value={[{ label: 'Peach', value: 'peach' }]} />
        <Input md='12' name='fruits' />
      </Form>
    </>
  )
}

export default SelectTester
