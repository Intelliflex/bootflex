import React, { Fragment, useState, useEffect } from 'react'
import Form from 'react-bootstrap/form'
import { Col, Button as Btn } from 'react-bootstrap'
import {
  useForm as useHookForm,
  FormProvider,
  useFormContext,
  Controller,
  useFieldArray
} from 'react-hook-form'
import {
  isResponsiveBreakLE,
  getNextBreak,
  getResponsiveBreakWidth
} from './LayoutFunctions'
import { ErrorMessage } from '@hookform/error-message'
import NumberFormat from 'react-number-format'
import InputMask from 'react-input-mask'
import ReactSelect from 'react-select'
import ReactDatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import lodash_get from 'lodash/get'
import lodash_pick from 'lodash/pick'
import { FaTrashAlt, FaIndent } from 'react-icons/fa'
import lodash_find from 'lodash/find'
import lodash_toString from 'lodash/toString'
import $_findInGroup from 'dollar-underscore/findInGroup'
import PropTypes from 'prop-types'

export const useForm = (schema, defaults, options = {}) => {
  const form = useHookForm({ defaultValues: defaults, ...options })
  // Add Schema to Form Object (will be availabe to useFormContext)
  form.schema = schema
  return form
}

export const useNest = (opts) => {
  const nest = useFieldArray(opts)
  nest._name = opts.name
  return nest
}

export const DatePicker = (props) => {
  const { className, name, children, ...o } = props
  const { control, schema } = useFormContext()
  return (
    <Fragment>
      <Controller
        name={name}
        defaultValue={new Date()}
        control={control}
        rules={schema[name].validation}
        render={({ onChange, value }) => (
          <ReactDatePicker
            className={`px-2 flex-input form-control mb-2 ${className || ''}`}
            dateFormat='dd MMM yyy'
            selected={value}
            onChange={onChange}
            {...o}
          />
        )}
      />
    </Fragment>
  )
}

export const Custom = (props) => {
  const {
    as,
    errorClass,
    options,
    validation,
    className,
    name,
    children,
    ...o
  } = props
  const { control } = useFormContext()
  const ele = React.cloneElement(as, {
    ...o
  })
  return (
    <>
      <Controller
        name={name}
        as={ele}
        options={options}
        control={control}
        className={className}
        rules={validation}
      >
        {children}
      </Controller>
    </>
  )
}

export const Select = (props) => {
  const {
    name,
    validation,
    options,
    className,
    menuPosition,
    children,
    ...o
  } = props
  const { control, clearErrors } = useFormContext()
  const [selectOptions, setSelectOptions] = useState(options)
  const [optionsSanitized, setOptionsSanitized] = useState(false)

  useEffect(() => {
    if (options && options.length) {
      let first = options[0]
      if (typeof first !== 'object') {
        let opts = options.map((rec, i) => {
          return { label: rec, value: rec }
        })
        setSelectOptions(opts)
      }
    }
    setOptionsSanitized(true)
  }, [options])

  if (!optionsSanitized) return <></>
  return (
    <>
      <Controller
        name={name}
        as={FlexSelect}
        clearErrors={clearErrors}
        options={selectOptions}
        onchange={(y) => console.log('yyyyy', y)}
        control={control}
        rules={validation}
        menuPosition={menuPosition}
        className={className}
        {...o}
      >
        {children}
      </Controller>
    </>
  )
}
Select.propTypes = {
  options: PropTypes.array.isRequired
}
Select.defaultProps = {
  menuPosition: 'fixed'
}

export const FlexSelect = React.forwardRef((props, ref) => {
  let {
    name,
    value,
    disabled,
    options,
    clearErrors,
    onChange,
    label,
    cols,
    ...o
  } = props
  const [selected, setSelected] = useState(value)
  useEffect(() => {
    let val
    if (value) {
      let grouped = options && options[0] && options[0].options ? true : false
      if (grouped) {
        val = $_findInGroup(
          options,
          'options',
          (rec) => rec.value === lodash_toString(value)
        )
      } else {
        // Handle Multi-Selects
        if (typeof value === 'object' && value.length) {
          val = []
          for (let i in value) {
            val[i] = { label: value[i], value: value[i] }
          }
        } else
          val = lodash_find(
            options,
            (rec) => rec.value === lodash_toString(value)
          )
      }
      setSelected(val)
    } else setSelected(null)
    // eslint-disable-next-line
  }, [value, options])

  // STYLING SAME AS M-D-B INPUT COMPONENTS
  const customStyles = {
    groupHeading: (provided, state) => ({
      ...provided,
      color: 'blue',
      fontWeight: 600
    }),
    control: (provided, state) => ({
      ...provided,
      backgroundColor: 'transparent',
      border: 0
    }),
    menu: (provided, state) => {
      return {
        ...provided,
        width:
          state && state.selectProps && state.selectProps.width
            ? state.selectProps.width
            : '100%'
      }
    }
  }

  // Don't Render if selected data has not been formatted to label, value pairs
  if (selected && selected.length && !selected[0].label) return <></>

  return (
    <div>
      <ReactSelect
        styles={customStyles}
        value={selected}
        options={options}
        onFocus={(e) => {
          clearErrors(name)
        }}
        onChange={(opt) => {
          setSelected(opt)
          if (props && props.onchange) props.onchange(opt)
        }}
        isSearchable={true}
        isDisabled={disabled}
        {...o}
      />
    </div>
  )
})
FlexSelect.propTypes = {
  options: PropTypes.array.isRequired
  //value: PropTypes.any.isRequired,
}

const getCols = (xs, sm, md, lg, xl) => {
  let cols = {}
  if (xs) cols.xs = xs
  if (sm) cols.sm = sm
  if (md) cols.md = md
  if (lg) cols.lg = lg
  if (xl) cols.xl = xl
  if (!Object.keys(cols).length) return null
  return cols
}

export const Button = (props) => {
  const {
    label,
    expand,
    space,
    className,
    colClass,
    children,
    style,
    color,
    bg,
    xs,
    sm,
    md,
    lg,
    xl,
    ...o
  } = props
  let cols = getCols(xs, sm, md, lg, xl)
  let sty = {}
  if (color) sty.color = color
  if (bg) sty.backgroundColor = bg
  if (expand) sty.width = '100%'
  if (space) {
    sty.marginBottom = '8px'
    sty.margintTop = '8px'
  }
  let ele = (
    <Btn
      className={`${cols ? 'w-100' : ''} ${className || ''} `}
      style={{ ...style, ...sty }}
      {...o}
    >
      {label}
      {children}
    </Btn>
  )
  if (cols)
    return (
      <Col className={`${colClass || ''}`} {...cols}>
        {ele}
      </Col>
    )
  else return ele
}

export const InputController = (props) => {
  const {
    name,
    label,
    labelClass,
    render,
    className,
    cols,
    nofeedback,
    children,
    ...o
  } = props
  const { schema, errors, control } = useFormContext()
  let nameKey = name.replace(/\[.*?\]\s?/g, '')
  let schemaKey = lodash_get(schema, nameKey, false)
  if (!schemaKey) {
    throw new Error(
      `FLEXInput requires Schema for form field [${nameKey}] to be passed to useForm `
    )
  }
  return (
    <>
      {label ? (
        <Form.Label
          className={`flex-label ${cols ? 'w-100 pr-2' : ''} ${
            labelClass || ''
          }`}
        >
          {label}
        </Form.Label>
      ) : (
        <></>
      )}
      {render ? (
        <Controller
          name={name}
          className={`flex-input form-control ${
            errors[name] ? 'is-invalid' : ''
          } ${className || ''}`}
          control={control}
          rules={lodash_get(schema, `${nameKey}.validation`, null)}
          render={render}
          {...o}
        />
      ) : (
        <>{children}</>
      )}
      {errors && !nofeedback ? (
        <ErrorMessage
          className='invalid-feedback'
          name={name}
          as='div'
          errors={errors}
        />
      ) : (
        <></>
      )}
    </>
  )
}

export const Input = React.forwardRef((props, ref) => {
  const { schema, errors, register, setValue } = useFormContext()
  const nameKey = props.name.replace(/\[.*?\]\s?/g, '')
  const schemaKey = lodash_get(schema, nameKey, false)
  if (!schemaKey) {
    throw new Error(
      `FLEXInput requires Schema for form field [${nameKey}] to be passed to useForm `
    )
  }
  let { validation, type, options, label, right } = schemaKey
  // const [inputValidation, setInputValidation] = useState(validation)
  const [schemaValidation, setSchemaValidation] = useState(validation)

  // COMINE PROPS FROM SCHEMA WITH PROPS ON INPUT (INPUT TAKES PRIORITY)
  const combinedProps = { ...schemaKey.props, ...props }
  let {
    name,
    as,
    index,
    className,
    colClass,
    xs,
    sm,
    md,
    lg,
    xl
  } = combinedProps
  if (right) {
    colClass += ' text-right'
    className += ' text-right'
  }

  // ISOLATE PROPS THAT BELONG TO INPUTCONTROLLER
  const controllerProps = lodash_pick(combinedProps, [
    'name',
    'nofeedback',
    'labelClass',
    'colClass'
  ])
  controllerProps.label = lodash_get(combinedProps, 'label', label) // Add Labels from Schema (outside props)

  // Remove Controller Props so they are not passed as invalid to target component
  delete combinedProps.nofeedback
  delete combinedProps.labelClass
  delete combinedProps.colClass

  // combinedProps.id = `input_${name}_${Math.random}`

  // IF ANY BREAKS SPCIFY THEN WE WRAP INSIDE COL ELEMENT
  const cols = getCols(xs, sm, md, lg, xl)
  controllerProps.cols = cols

  useEffect(() => {
    if (type === 'email') {
      const obj =
        typeof schemaValidation === 'object' ? { ...schemaValidation } : {}
      obj.pattern = {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
        message: 'Invalid email address format'
      }
      setSchemaValidation(obj)
    }

    // eslint-disable-next-line
  }, [validation])

  // GET ERROR CODE (INCLUDING NESTED)
  if (index) {
    // Nested Value
  }
  const error =
    index === undefined
      ? lodash_get(errors, name, false)
      : lodash_get(errors, name, false)
  const errorClass = error ? 'is-invalid' : ''

  // ========================
  // PROCESS EACH INPUT TYPE
  // ========================
  let ele
  switch (type) {
    case 'date':
      ele = (
        <InputController
          render={({ onChange, onBlur, value }) => (
            <ReactDatePicker
              className={`px-2 flex-input form-control mb-2 ${
                className || ''
              } ${errorClass}`}
              dateFormat='dd MMM yyy'
              selected={value}
              onChange={onChange}
              onBlur={onBlur}
              {...combinedProps}
            />
          )}
          {...controllerProps}
        />
      )
      break
    case 'select':
      ele = (
        <InputController cols={cols} {...controllerProps}>
          <Select
            name={name}
            type={type}
            label={label}
            options={options}
            onchange={(val) => {
              // Convert from Object {value, label} to string (but can be an array of strings if multi select)
              let arr
              if (val && val.length) {
                // MultiSelect
                arr = []
                for (let i in val) {
                  arr[i] = val[i].value
                }
              } else arr = val.value
              setValue(name, arr)
            }}
            validation={schemaValidation}
            {...combinedProps}
            className={`flex-input form-control m-0 p-0 ${
              className || ''
            } ${errorClass}`}
          />
        </InputController>
      )
      break
    case 'checkbox':
    case 'radio':
      ele = (
        <InputController cols={cols} {...controllerProps}>
          <Form.Check
            type={type !== undefined ? type : 'checkbox'}
            name={name}
            label={label}
            ref={register(schemaValidation)}
            {...combinedProps}
            className={`flex-checkbox mb-2 ${className || ''} ${errorClass}`}
          />
        </InputController>
      )
      break
    case 'number-format':
      ele = (
        <InputController
          render={({ onChange, onBlur, value }) => (
            <NumberFormat
              onChange={onChange}
              onBlur={onBlur}
              value={value}
              {...combinedProps}
              className={`px-2 flex-input form-control mb-2 ${
                className || ''
              } ${errorClass}`}
            />
          )}
          {...controllerProps}
        />
      )
      break
    case 'input-mask':
      ele = (
        <InputController
          render={({ onChange, onBlur, value }) => (
            <InputMask
              onChange={onChange}
              onBlur={onBlur}
              value={value}
              {...combinedProps}
              className={`px-2 flex-input form-control mb-2 ${
                className || ''
              } ${errorClass}`}
            />
          )}
          {...controllerProps}
        />
      )
      break
    case 'custom':
      ele = (
        <InputController cols={cols} {...controllerProps}>
          <Custom
            as={as}
            name={name}
            type={type}
            {...combinedProps}
            className={`flex-input form-control ${
              className || ''
            } ${errorClass}`}
          />
        </InputController>
      )
      break
    default:
      // STANDARD INPUT (DEFAULT) type === 'input', 'email,
      ele = (
        <InputController cols={cols} {...controllerProps}>
          <Form.Control
            as={as}
            name={name}
            type={type}
            // placeholder={placeholder}
            ref={register(schemaValidation)}
            {...combinedProps}
            className={`flex-input ${className || ''} ${errorClass}`}
          />
        </InputController>
      )
      break
  }
  if (cols)
    return (
      <Col className={`${colClass || ''}`} {...cols}>
        {ele}
      </Col>
    )
  else return ele
})
Input.propTypes = {
  name: PropTypes.string.isRequired,
  labelClass: PropTypes.string
}

const FlexFormNest = (props) => {
  const {
    nest,
    totalRow,
    totalIcon,
    collapse,
    responsive,
    update,
    deleteBtn,
    insertBtn,
    rightOffset,
    debuginfo,
    children,
    height,
    ...o
  } = props
  const { getValues, setValue } = useFormContext()
  let name = nest._name
  const { fields, insert } = nest
  let ref = React.useRef()
  const [divWidth, setDivWidth] = useState(0)

  // RESPONSIVE BREAKS (EXAMPLES)
  // responsive = 'md' Nest is responsive (horizontal scroll) when md or less
  // collapse = 'xs' Responsive will not apply at or below this break (Col break property on inputs should match this value)
  let isCollapsed = collapse ? isResponsiveBreakLE(collapse) : false
  let isResponsive = responsive
    ? isCollapsed
      ? false
      : isResponsiveBreakLE(responsive)
    : false
  let responsiveWidthStyle = isResponsive
    ? { minWidth: getResponsiveBreakWidth(responsive) }
    : {}
  let eleBreak = collapse ? getNextBreak(collapse) : 'xs' // Get Break For Column // Input Sizes (Replaced size)

  // Get Max Width of Icons Column DIV
  useEffect(() => {
    if (ref.current && ref.current.offsetWidth) {
      if (ref.current.offsetWidth > divWidth) {
        setDivWidth(ref.current.offsetWidth)
      }
    }
  }, [divWidth])
  let outerStyle = {
    overflowX: 'auto'
  }
  if (height) outerStyle.minHeight = height

  return (
    <div style={outerStyle}>
      <div style={responsiveWidthStyle}>
        {debuginfo ? (
          <h6>
            Responsive={isResponsive ? 'true' : 'false'} Collapsed=
            {isCollapsed ? 'true' : 'false'}
          </h6>
        ) : (
          <></>
        )}
        {fields.map((item, index) => {
          // return <React.Fragment key={`${item}_${index}`}></React.Fragment>
          return (
            <React.Fragment key={`${item}_${index}`}>
              <div className='w-100 d-inline-flex'>
                <Form.Row className='flex-nest-row bg-light'>
                  {React.Children.map(children, (child) => {
                    let size = child && child.props && child.props.size
                    if (!size)
                      throw new Error(
                        `size property must be provided to Nested input element '${child.props.name}'`
                      )
                    return (
                      <React.Fragment key={index}>
                        {React.cloneElement(child, {
                          index,
                          [eleBreak]: size,
                          key: `${name}_${child.props.name}_${index}`,
                          name: `${name}[${index}].${child.props.name}`,
                          // nest: true,
                          label: index > 0 ? '' : child.props.label,
                          colClass: 'flex-nest-col',
                          defaultValue: `${item[child.props.name]}`, // make sure to set up defaultValue
                          ...o
                        })}
                      </React.Fragment>
                    )
                  })}
                </Form.Row>

                <div ref={ref} className='ml-2 mt-2 float-right text-danger'>
                  {index <= 0 ? (
                    <Form.Label className='flex-label'>&nbsp;</Form.Label>
                  ) : (
                    <></>
                  )}
                  <div className='d-flex'>
                    <div className='flex-nest-bin inline-block'>
                      {typeof deleteBtn === 'object' ? (
                        deleteBtn
                      ) : deleteBtn ? (
                        <FaTrashAlt
                          onClick={() => {
                            // let arr = form.getValues(fields)
                            let vals = getValues()
                            setValue(
                              name,
                              vals[name].filter((val, idx) => idx !== index)
                            )
                          }}
                          className='flex-nest-bin-icon'
                        />
                      ) : (
                        <></>
                      )}
                    </div>
                    <div className='flex-nest-insert inline-block'>
                      {typeof insertBtn === 'object' ? (
                        insertBtn
                      ) : insertBtn ? (
                        <FaIndent
                          onClick={() => {
                            insert(index, {
                              code: 'appendCode',
                              description: 'appendDescription'
                            })
                          }}
                          className='flex-nest-insert-icon'
                        />
                      ) : (
                        <></>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </React.Fragment>
          )
        })}
        {/* CREATE ICONS BUTTON COULMN DIV BASED ON MAX SIZE OF DIV WITHIN ROWS */}
        <div className='w-100 d-inline-flex'>
          <Form.Row className='flex-nest-row'>{totalRow}</Form.Row>
          <div
            style={{ width: `${divWidth}px` }}
            className='ml-2 mt-2 float-right text-danger overflow-hidden'
          >
            {totalIcon}
          </div>
        </div>
      </div>
    </div>
  )
}

// let isDirtyRef = false

// FLEX-FORM WRAPS FO WITH CONTEXT PROVIDER SUPPLIED BY REACT-HOOK-FORM
const FlexForm = (props) => {
  const { id, form, submit, onSubmit, className, children, ...o } = props
  const { handleSubmit } = form
  return (
    <FormProvider {...form}>
      <Form
        form={form}
        onSubmit={handleSubmit(onSubmit)}
        className={`{${className || ''}}`}
        {...o}
      >
        {children}
        {/* BUTTONS TO ALLOW EXTERNAL EVENT FIRING */}
        <button id={`${id}-submit`} type='submit' className='d-none' />
        <button
          id={`${id}-reset`}
          type='button'
          className='d-none'
          onClick={() => form.reset()}
        />
      </Form>
    </FormProvider>
  )
}
FlexForm.Nest = FlexFormNest
FlexForm.Row = Form.Row
FlexForm.propTypes = {
  id: PropTypes.string.isRequired
}

export default FlexForm
export { useFormContext }
