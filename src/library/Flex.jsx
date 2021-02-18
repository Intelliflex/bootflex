import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Jumbotron, Container, Table } from 'react-bootstrap'
import logo from './bootflex110.png'

export const Tester = () => {
  return (
    <div className='w-100 bg-warning' style={{ height: '200px' }}>
      <img src={logo} alt='logo' />
    </div>
  )
}

export const Row = (props) => {
  const { children, compact, flush, style, className, ...o } = props
  const sty = style || {}
  // If Compact reduce gutter sizes (same as react-bootstrap Form.Row)
  if (compact) {
    sty.marginLeft = '-5px'
    sty.marginRight = '-5px'
  }
  return (
    <div className={`row flex-row ${flush ? 'm-0 p-0' : ''} ${className || ''} `} {...o}>
      {children}
    </div>
  )
}
Row.propTypes = {
  compact: PropTypes.bool,
}
Row.defaultProps = {
  compact: false,
}

export const Col = (props) => {
  const { cols, size, as, className, compact, flush, xs, sm, md, lg, xl, flag, children, ...o } = props

  let cls = ''
  if (size) cls += `col-${size}`
  else {
    if (cols) cls += `col-${cols}`
    if (xs) cls += ` col-xs-${xs}`
    if (sm) cls += ` col-sm-${sm}`
    if (md) cls += ` col-md-${md}`
    if (lg) cls += ` col-lg-${lg}`
    if (xl) cls += ` col-xl-${xl}`
  }
  return (
    <div
      className={`flex-col ${cls} ${flush ? 'm-0 p-0' : ''} ${compact ? 'm-0 p-1' : ''}  ${className || ''}`}
      {...o}
    >
      {children}
    </div>
  )
}
Row.propTypes = {
  flush: PropTypes.bool,
}
Row.defaultProps = {
  flush: false,
}

export const Span = (props) => {
  const { children, ...o } = props
  return (
    <span className='w-100' style={{ padding: 0 }} {...o}>
      {children}
    </span>
  )
}

// flex-ITEMS ARE FOR SECTIONS WITHIN BootflexBOX (D-Bootflex) CONTAINER
export const Item = (props) => {
  const { order, content, className, children, ...o } = props
  return (
    <div className={`flex-grow-1 order-${order} ${className || ''}`} {...o}>
      {content || <Fragment />}
      {children}
    </div>
  )
}
Item.propTypes = {
  align: PropTypes.oneOf(['left', 'center', 'right']),
}
Item.defaultProps = {
  order: 1,
  align: 'left',
}

export const Heading = (props) => {
  const { children, className, dark, light, color, bg, ...o } = props
  let sty
  if (dark || bg === undefined) {
    sty = {
      backgroundColor: '#2E2E2E',
      color: '#fafafa',
    }
  } else if (light) {
    sty = {
      color: '#fafafa',
      backgroundColor: '#2E2E2E',
    }
  } else {
    sty = {
      backgroundColor: bg,
      color: color,
    }
  }
  return (
    <div style={sty} className={`flex-heading p-2 mb-2 ${className || ''}`} {...o}>
      {children}
    </div>
  )
}

Heading.propTypes = {
  color: PropTypes.string,
  bg: PropTypes.string,
  dark: PropTypes.bool,
  light: PropTypes.bool,
}
Heading.defaultProps = {
  color: 'white',
}

export const Lead = (props) => {
  const { children, justify, center, right, left, className, ...o } = props
  let cls
  if (justify) cls = 'text-justify'
  if (center) cls = 'text-center'
  if (right) cls = 'text-left'
  if (left) cls = ''
  return (
    <div className={`lead pt-1 ${cls} ${className || ''}`} {...o}>
      {children}
    </div>
  )
}
Lead.propTypes = {
  justify: PropTypes.bool,
  center: PropTypes.bool,
  right: PropTypes.bool,
  left: PropTypes.bool,
}

export const Info = (props) => {
  const { children, justify, center, right, left, className, ...o } = props
  let cls
  if (justify) cls = 'text-justify'
  if (center) cls = 'text-center'
  if (right) cls = 'text-left'
  if (left) cls = ''
  return (
    <div className={`flex-info py-1  ${cls} ${className || ''}`} {...o}>
      {children}
    </div>
  )
}
Info.propTypes = {
  justify: PropTypes.bool,
  center: PropTypes.bool,
  right: PropTypes.bool,
  left: PropTypes.bool,
}

// HEADER CLASS
export const H = (props) => {
  const {
    x1,
    x2,
    x3,
    x4,
    x5,
    x6,
    bg,
    className,
    primary,
    danger,
    success,
    info,
    warning,
    dark,
    light,
    color,
    children,
    ...o
  } = props

  let hClass = 'h3'
  if (x1) hClass = 'h1'
  if (x2) hClass = 'h2'
  if (x3) hClass = 'h3'
  if (x4) hClass = 'h4'
  if (x5) hClass = 'h5'
  if (x6) hClass = 'h6'
  let cls = ''
  if (primary) cls = 'text-primary'
  if (danger) cls = 'text-danger'
  if (success) cls = 'text-success'
  if (info) cls = 'text-info'
  if (warning) cls = 'text-warning'
  if (dark) cls = 'text-dark'
  if (light) cls = 'text-light'
  const sty = {}
  if (color) sty.color = color
  if (bg) sty.backgroundColor = bg

  return (
    <div className={`${hClass} ${cls} ${className || ''}`} style={sty} {...o}>
      {children}
    </div>
  )
}

// BOLD TEXT HIGHLIGHT
export const B = (props) => {
  const {
    x0,
    x1,
    x2,
    x3,
    x4,
    bg,
    br,
    className,
    primary,
    danger,
    success,
    info,
    warning,
    dark,
    light,
    color,
    children,
    ...o
  } = props
  let cls = ''
  if (primary) cls = 'text-primary'
  if (danger) cls = 'text-danger'
  if (success) cls = 'text-success'
  if (info) cls = 'text-info'
  if (warning) cls = 'text-warning'
  if (dark) cls = 'text-dark'
  if (light) cls = 'text-light'
  const sty = {}
  if (color) sty.color = color
  if (bg) sty.backgroundColor = bg
  sty.fontWeight = '400'
  if (x1) sty.fontWeight = '500'
  if (x2) sty.fontWeight = '600'
  if (x3) sty.fontWeight = '700'
  if (x4) sty.fontWeight = '800'

  return (
    <Fragment>
      <div className={`d-inline-flex ${cls} ${className || ''}`} style={sty} {...o}>
        {children}
      </div>
      {br ? <br /> : null}
    </Fragment>
  )
}

export const P = (props) => {
  const {
    x0,
    x1,
    x2,
    x3,
    x4,
    x5,
    bg,
    br,
    className,
    primary,
    danger,
    success,
    info,
    warning,
    dark,
    light,
    color,
    children,
    justify,
    center,
    right,
    left,
    ...o
  } = props
  let cls = ''
  if (primary) cls = 'text-primary'
  if (danger) cls = 'text-danger'
  if (success) cls = 'text-success'
  if (info) cls = 'text-info'
  if (warning) cls = 'text-warning'
  if (dark) cls = 'text-dark'
  if (light) cls = 'text-light'
  const sty = {}
  if (color) sty.color = color
  if (bg) sty.backgroundColor = bg
  if (x1) cls += ' my-1'
  if (x2) cls += ' my-2'
  if (x3) cls += ' my-3'
  if (x4) cls += ' my-4'
  if (x5) cls += ' my-5'
  if (justify) cls += ' text-justify'
  if (center) cls += ' text-center'
  if (right) cls += ' text-left'

  return (
    <>
      <div className={`${cls} ${className || ''}`} style={sty} {...o}>
        {children}
      </div>
      {br ? <br /> : null}
    </>
  )
}
P.defaultProps = {
  x1: true,
}

// SPACER WILL INSERT A ROW (WITH HEIGHT DOUBLE STANDARD BOOSTRAP MEASURE)
// OR BY HEIGHT
export const Spacer = (props) => {
  const { size, x1, x2, x3, x4, x5, children, ...o } = props
  let sizeClass = size ? `py-${size}` : ''
  let height
  if (x1) height = '1em'
  if (x2) height = '1.5em'
  if (x3) height = '2em'
  if (x4) height = '2.5em'
  if (x5) height = '3em'
  if (height) sizeClass = ''
  return (
    <Row style={height ? { height: height } : null} className={sizeClass} {...o}>
      {children}
    </Row>
  )
}
Spacer.defaultProps = {
  size: '1',
}

export const Post = (props) => {
  const { title, titleClass, className, children, ...o } = props
  return (
    <div className={`${className || ''} bg-post my-2 p-2`} {...o}>
      {title ? (
        <p className={titleClass ? 'text-success ' + titleClass : 'h4 text-success'}>{title}</p>
      ) : (
        <></>
      )}
      {children}
    </div>
  )
}

export const Code = (props) => {
  const { title, titleClass, className, children, ...o } = props
  return (
    <pre className={`flex-code-block flex-select-text m-0 p-2 ${className || ''}`} {...o}>
      {title ? (
        <p className={titleClass ? 'text-primary ' + titleClass : 'h3 text-primary'}>{title}</p>
      ) : (
        <></>
      )}
      <code>{children}</code>
    </pre>
  )
}

export const Frame = (props) => {
  const { title, className, children, ...o } = props
  return (
    <div className={`flex-frame ${className || ''}`} {...o}>
      <div className='flex-frame-title'>{title}</div>
      <div className={`p-2 ${className || ''}`}>{children}</div>
    </div>
  )
}

export const NotFound = (props) => {
  return (
    <Jumbotron>
      <Container>
        <h1>Oops! - This page was not found</h1>
        <p className='lead'>Please report to system administrator</p>
      </Container>
    </Jumbotron>
  )
}

const Flex = {
  Tester,
  Row,
  Col,
  Span,
  Item,
  Heading,
  Lead,
  Info,
  Spacer,
  Post,
  Code,
  Frame,
  NotFound,
  B,
  H,
}

export default Flex

export const getPropsTable = (props) => {
  let heading = (
    <tr>
      <td style={{ width: 80 }}>Prop</td>
      <td>Description</td>
    </tr>
  )
  let rows = []

  // Console.log('keys', Object.keys(props))
  let rowIdx = 0
  let keys = Object.keys(props)
  for (let idx in keys) {
    let key = keys[idx]
    rows[rowIdx] = (
      <tr key={rowIdx}>
        <td colSpan='2'>
          <H primary x4>
            {key}
          </H>
        </td>
      </tr>
    )
    rowIdx++
    let keys2 = Object.keys(props[key])
    for (let idx2 in keys2) {
      let key2 = keys2[idx2]
      rows[rowIdx] = (
        <tr key={rowIdx}>
          <td>{key2}</td>
          <td>{props[key][key2]}</td>
        </tr>
      )
      rowIdx++
    }
  }
  return (
    <Table className='w-100' responsive striped bordered hover>
      <thead>{heading}</thead>
      <tbody>{rows}</tbody>
    </Table>
  )
}
