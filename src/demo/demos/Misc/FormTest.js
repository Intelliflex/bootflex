import React from 'react'
import { useForm, Controller } from 'react-hook-form'
import { ErrorMessage } from '@hookform/error-message'
import { Form } from 'react-bootstrap'
import Select from 'react-select'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

//import "bootstrap/dist/css/bootstrap.css"

const FlexSelect = React.forwardRef((props, ref) => {
  const { name, children, clearErrors, ...o } = props
  // Custom Style So that boostrap is-invalid field border shows correctly
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      backgroundColor: 'transparent',
      border: 0
    })
  }
  return (
    <Select
      onFocus={(e) => {
        clearErrors(name)
      }}
      styles={customStyles}
      {...o}
    >
      {children}
    </Select>
  )
})

const Tester = (props) => {
  const {
    control,
    register,
    errors,
    handleSubmit,
    clearErrors,
    getValues
  } = useForm()
  const onSubmit = (values) => {
    // form is valid
    console.log(values)
  }

  return (
    <>
      <div className='container'>
        <div className='row mb-5'>
          <div className='col-lg-12 text-center'>
            <h1 className='mt-5'>Login form with React Hook Form</h1>
          </div>
        </div>
        <Form onSubmit={handleSubmit(onSubmit)}>
          {/* <Select
          components={{ Input }}
          options={[
            { value: 'chocolate', label: 'Chocolate' },
            { value: 'strawberry', label: 'Strawberry' },
            { value: 'vanilla', label: 'Vanilla' },
          ]}
        /> */}

          <Form.Group>
            <Form.Label className='flex-label' htmlFor='email'>
              Email
            </Form.Label>
            <Form.Control
              as='input'
              name='email'
              placeholder='Enter email'
              className={`flex-input form-control ${
                errors.email ? 'is-invalid' : ''
              }`}
              ref={register({
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message: 'Invalid email address format'
                }
              })}
            />
            <ErrorMessage
              className='invalid-feedback'
              name='email'
              as='div'
              errors={errors}
            />
          </Form.Group>

          <div className='form-group'>
            <label className='flex-label' htmlFor='password'>
              Password
            </label>
            <input
              name='password'
              placeholder='Enter password'
              className={`flex-input form-control ${
                errors.password ? 'is-invalid' : ''
              }`}
              ref={register({
                required: 'Password is required',
                validate: (value) =>
                  value.length > 3 || 'Password must be 3 characters at minimum'
              })}
            />
            <ErrorMessage
              className='invalid-feedback'
              name='password'
              as='div'
              errors={errors}
            />
          </div>
          <Form.Label className='flex-label' htmlFor='iceCreamType'>
            Ice-cream Type
          </Form.Label>
          <Controller
            name='iceCreamType'
            as={FlexSelect}
            className={`flex-input form-control p-0 m-0 mb-2 ${
              errors.iceCreamType ? 'is-invalid' : ''
            }`}
            clearErrors={clearErrors}
            options={[
              { value: 'chocolate', label: 'Chocolate' },
              { value: 'strawberry', label: 'Strawberry' },
              { value: 'vanilla', label: 'Vanilla' }
            ]}
            defaultValue={{ value: 'chocolate', label: 'Chocolate' }}
            control={control}
            rules={{ required: 'Selection is Required' }}
          />
          <ErrorMessage
            className='invalid-feedback'
            name='iceCreamType'
            as='div'
            errors={errors}
          />
          <Form.Label className='flex-label' htmlFor='testdate'>
            Test Date Input
          </Form.Label>
          <Controller
            defaultValue={new Date()}
            name='testdate'
            control={control}
            rules={{ required: 'Date is Required' }}
            render={({ onChange, value }) => (
              <DatePicker
                className='flex-input form-control mb-2'
                dateFormat='eee dd MMM yyy'
                selected={value}
                onChange={onChange}
              />
            )}
          />

          <button className='btn btn-primary btn-block' type='submit'>
            Submit
          </button>
          <button
            className='btn btn-primary btn-block'
            type='button'
            onClick={() => {
              console.log(getValues())
            }}
          >
            Show Error
          </button>
        </Form>
      </div>
    </>
  )
}

export default Tester
