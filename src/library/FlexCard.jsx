import React from 'react'
import PropTypes from 'prop-types'

//Outer Wrapper for Full height full width in resposive layout
const FlexCardWrapper = ({ children, ...o }) => {
  return (
    <div className='position-absolute h-100 w-100' {...o}>
      {children}
    </div>
  )
}

const FlexCard = (props) => {
  const {
    fill,
    children,
    noborder,
    square,
    flush,
    cascade,
    height,
    outerClass,
    className,
    ...o
  } = props
  let sty = props && props.style ? { ...props.style } : {}
  if (height && !fill) {
    sty.height = height
  }

  if (flush) {
    sty.padding = '0px'
  }

  console.log('fill', fill, flush)

  // Note: position-absolute for wrapper is necessary for full height wheen collapsed
  if (fill)
    return (
      <div
        className={`flex-card-outer h-100 w-100 overflow-hidden ${
          outerClass || ''
        } ${flush ? 'm-0 p-0' : ''}`}
      >
        <div className='position-relative h-100 w-100 overflow-auto'>
          <div
            style={sty}
            className={`card flex-card ${noborder ? 'border-0' : ''} ${
              square ? 'rounded-0' : ''
            } ${fill ? 'h-100 w-100' : ''} ${
              cascade ? 'flex-card-cascade' : ''
            } ${className || ''}  `}
            {...o}
          >
            {children}
          </div>
        </div>
      </div>
    )
  return (
    <div
      className={`${
        fill ? 'flex-card-outer h-100 w-100 overflow-hidden' : ''
      } ${outerClass || ''} ${flush ? 'm-0 p-0' : ''}`}
    >
      <div
        style={sty}
        className={`card flex-card ${noborder ? 'border-0' : ''} ${
          square ? 'rounded-0' : ''
        } ${fill ? 'h-100 w-100' : ''} ${cascade ? 'flex-card-cascade' : ''} ${
          className || ''
        }  `}
        {...o}
      >
        {children}
      </div>
    </div>
  )
}
FlexCard.propTypes = {
  fill: PropTypes.bool,
  lush: PropTypes.bool,
  square: PropTypes.bool
}
FlexCard.defaultProps = {
  fill: false,
  flush: false,
  square: false
}

/************************************************
 *** FlexCardHeader() - Card Header Component ***
 ************************************************
 Note: cols can be used to define column widths left,center,right eg: 6,2,4
 We do not use bootstrap card-header because ::first-child gets border rounding and we are providing
 */
export const FlexCardHeader = (props) => {
  const { children, bg, square, cascade, className, ...o } = props

  return (
    <header
      className={`flex-card-header  d-flex ${
        cascade ? 'flex-card-header-cascade' : ''
      } ${square ? 'border-0' : ''} ${className || ''} ${bg || ''}`}
      {...o}
    >
      {children}
    </header>
  )
}

export const FlexCardBody = React.forwardRef((props, ref) => {
  const { children, variant, style, flush, outerClass, className, ...o } = props

  // console.log('Style is', style)
  return (
    <content
      ref={ref}
      // style={{ minHeight: '500px' }}
      className={`flex-card-body card-body ${
        variant === 'fixed' ? 'h-100 overflow-auto' : ''
      } ${flush ? 'p-0' : ''} ${className || ''}`}
      {...o}
    >
      {children}
    </content>
  )
})
FlexCardBody.propTypes = {
  variant: PropTypes.oneOf(['fixed', 'grow'])
}
FlexCardBody.defaultProps = {
  variant: 'fixed'
}

export const FlexCardFooter = (props) => {
  const { children, className, ...o } = props
  return (
    <footer
      className={`flex-card-footer position-fixed-bottom card-footer d-flex ${
        className || ''
      }`}
      {...o}
    >
      {children}
    </footer>
  )
}

FlexCard.Wrapper = FlexCardWrapper
FlexCard.Header = FlexCardHeader
FlexCard.Body = FlexCardBody
FlexCard.Footer = FlexCardFooter

export default FlexCard
