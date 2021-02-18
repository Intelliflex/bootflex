import React, { Fragment, useEffect, useState, useRef } from 'react'
import PropTypes from 'prop-types'
import {
  FaChevronLeft,
  FaChevronRight,
  FaBars,
  FaQuestion,
  FaTimes
} from 'react-icons/fa'
import { BsThreeDotsVertical } from 'react-icons/bs'
import useDeepCompareEffect from 'use-deep-compare-effect'
import { useFlex } from './Context.jsx'
import {
  getScreenWidth,
  getScreenSize,
  getLayoutId,
  getSizeInt,
  getSize,
  getNextBreak,
  getDimensions,
  isResponsiveBreakGE,
  isResponsiveBreakLE,
  getResponsiveBreakWidth
} from './LayoutFunctions'

/***************************************
 *** Layout - Primary Layout Control ***
 ***************************************/
const Layout = (props) => {
  const {
    id,
    noselect,
    outerClass,
    controlButtons,
    embed,
    className,
    children,
    ...o
  } = props

  let [flex, _state] = useFlex()
  let ref = useRef()

  const updateDimensions = (resizeFlag = false) => {
    if (!ref && ref.current) return
    // STORE DIMENSIONS OF LAYOUT IN CONTEXT (Property matches id)
    let size = getScreenSize()
    let obj = {
      screenSize: size,
      viewport: {
        width: window.innerWidth,
        height: window.innerHeight
      }
    }
    if (resizeFlag) {
      obj.resize = _state.dom.resize + 1
    }
    flex._dom(obj)
  }

  // SET screenSize Context on Screen Resize
  useEffect(() => {
    let ele = document.getElementById(id)
    if (ele) {
      updateDimensions()
      window.addEventListener('resize', () => {
        if (!_state.dom.resizing)
          flex._dom({ resizing: true, resizeFinished: false })
        updateDimensions()
        clearTimeout(window.resizedFinished)
        window.resizedFinished = setTimeout(function () {
          flex._dom({
            //resizeCount: _state.dom.resizeCount + 1,
            resizing: false,
            resizeFinished: true
          })
          // Console.log('Resize Finished')
          updateDimensions(true)
        }, 250)
      })
      return () => {
        // Unmount
        window.removeEventListener('resize', () => {})
      }
    }
    // eslint-disable-next-line
  }, [])

  // Return with full height , full width absolute position wrapper and inner flex-box container
  return (
    <div
      id={id}
      ref={ref}
      className={`position-absolute h-100 w-100 overflow-hidden p-0 m-0 flex-layout-wrapper ${
        outerClass || ''
      } ${noselect ? 'flex-noselect-none' : ''}`}
    >
      {controlButtons}
      <div
        className={`d-flex flex-column w-100 h-100 flex-layout ${
          className || ''
        }`}
        {...o}
      >
        {children}
      </div>
    </div>
  )
}
Layout.propTypes = {
  id: PropTypes.string.isRequired,
  noselect: PropTypes.bool
}
Layout.defaultProps = {
  noselect: false
}

const Layout_Body = (props) => {
  let { id, controlButtons, className, children, ...o } = props
  return (
    // OUTER WRAPPER CONTAINER IS RELATIVE TO SIZE BETWEEN HEADER & FOOTER
    <div className='position-relative h-100 w-100 m-0 p-0'>
      {controlButtons}
      {/* LAYOUT CONTAINER IS ABSOLUTE TO CONTRAIN CONTENT TO REGION BETWEEN BODY & FOOTER */}
      <div
        className={`position-absolute h-100 w-100 overflow-auto ${
          className || ''
        }`}
        {...o}
      >
        {/* CONTENT CONTAINER IS Bootflex TO ALLOW PANEL ORDER AND flex-LAYOUT */}
        <div className='d-flex h-100 w-100'>{children}</div>
      </div>
    </div>
  )
}
Layout_Body.propTypes = {
  id: PropTypes.string.isRequired,
  collapse: PropTypes.string,
  variant: PropTypes.oneOf(['fixed', 'grow'])
}
Layout_Body.defaultProps = {
  collapse: 'md',
  variant: 'grow'
}

const Layout_Responsive = (props) => {
  const {
    id,
    collapse,
    style,
    variant,
    controlButtons,
    className,
    children,
    ...o
  } = props
  const [flex, _state] = useFlex()
  let responsive = flex._get(`responsive.${id}`, {
    flex: 'row',
    fixed: variant
  })
  let flexMode = useRef()

  useEffect(() => {
    if (flex._isBreakpoint(collapse)) {
      flex._setResponsive(id, { flex: 'column', fixed: false })
    } else {
      let fixed =
        flexMode.current !== undefined ? flexMode.current : variant === 'fixed'
      flex._setResponsive(id, { flex: 'row', fixed: fixed })
    }
    // eslint-disable-next-line
  }, [_state.dom.screenSize])

  // Keep reference to last (non collapse) Responsivle variant
  useEffect(() => {
    if (!flex._isBreakpoint(collapse)) flexMode.current = responsive.fixed
    // eslint-disable-next-line
  }, [responsive.fixed])

  // Let flexMode = responsive.flex === 'row' ? flex._get(`responsive.${id}.flex`, 'row')
  let fixStyle = flex._get(`responsive.${id}.fixed`, true)
    ? { maxHeight: '100%', minHeight: '100%' }
    : { minHeight: '100%' }

  // Console.log('Fix Style', fixStyle)
  return (
    <div className={`position-absolute h-100 w-100 overflow-auto`}>
      {controlButtons}
      {/* INNER DIV - MUST BE D-Bootflex (BootflexBOX LAYOUT) ITH STRETCH (NOT H-100) SO BACKGROUND ALSO EXPANDS TO LIMITS */}
      <div
        style={fixStyle}
        className={`d-flex align-items-stretch flex-${responsive.flex} ${
          className || ''
        }`}
        {...o}
      >
        {children}
      </div>
    </div>
  )
}
Layout_Responsive.propTypes = {
  id: PropTypes.string.isRequired
}
Layout_Responsive.defaultProps = {
  collapse: 'md',
  variant: 'fixed'
}

const Layout_Header = (props) => {
  const { className, controlButtons, tabBar, height, children, ...o } = props
  // eslint-disable-next-line
  const [flex, _state] = useFlex()
  let ref = useRef()
  let sty = height ? { minHeight: height } : {}
  if (props && props.style) sty = { ...props.style, ...sty }
  let layoutId = getLayoutId(ref.current)
  return (
    <div className='position-relative'>
      {controlButtons}
      <header
        ref={ref}
        style={sty}
        className={`d-flex align-items-center flex-layout-header ${
          className || ''
        }`}
        {...o}
      >
        {children}
      </header>
      {layoutId && _state.tabs[layoutId] ? _state.tabs[layoutId] : tabBar}
    </div>
  )
}
const Layout_TabBar = (props) => {
  const {
    id,
    className,
    defaultVisibility,
    height,
    overlay,
    children,
    ...o
  } = props
  let ref = useRef()
  const [flex] = useFlex()

  useEffect(() => {
    flex._setTabBar(id, defaultVisibility)
    // eslint-disable-next-line
  }, [id, defaultVisibility])

  let sty = props && props.style ? props.style : {}
  if (sty && !sty.height) sty.height = height
  if (overlay) {
    sty.marginTop = `-${height}`
    sty.left = 0
  }

  if (!flex._get(`tabbar.${id}`, false)) return <></>
  return (
    <div>
      <div
        id={id}
        ref={ref}
        style={sty}
        className={`flex-layout-mini-tab ${className || ''} ${
          overlay ? 'w-100 position-fixed' : ''
        }`}
        {...o}
      >
        {children}
      </div>
    </div>
  )
}
Layout_TabBar.propTypes = {
  id: PropTypes.string.isRequired
}
Layout_TabBar.defaultProps = {
  className: 'bg-primary',
  height: '6px',
  overlay: false
}

const Layout_MiniTabBtn = (props) => {
  const { className, title, width, children, ...o } = props
  let sty = props && props.style ? props.style : {}
  if (width) sty.width = width
  return (
    <div className={`btn ${className || ''} flex-layout-mini-tab-btn`} {...o}>
      {title}
    </div>
  )
}
Layout_MiniTabBtn.propTypes = {
  //title: PropTypes.string.isRequired,
}
Layout_MiniTabBtn.defaultProps = {
  title: '',
  className: 'btn-warning'
}

const Layout_Footer = (props) => {
  const { className, height, controlButtons, children, ...o } = props
  let sty = height ? { minHeight: height } : {}
  if (props && props.style) sty = { ...props.style, ...sty }
  // align-items-center justify-content-center j
  return (
    <div className='position-relative'>
      {controlButtons}
      <footer
        style={sty}
        className={`d-flex flex-layout-footer ${className || ''}`}
        {...o}
      >
        {children}
      </footer>
    </div>
  )
}

/**********************
 *** Layout.Panel() ***
 **********************/

const Layout_Panel = (props) => {
  const {
    id,
    target,
    position,
    style,
    width,
    overlay,
    visibleDefault,
    autohide,
    controlButtons,
    className,
    children,
    ...o
  } = props
  let [flex, _state] = useFlex()
  const [visible, setVisible] = useState(visibleDefault)

  useDeepCompareEffect(() => {
    if (_state.panel && typeof _state.panel[id] === 'undefined') {
      flex._setPanel(id, visibleDefault)
    }
    if (autohide) {
      if (getSizeInt(_state.dom.screenSize) <= getSizeInt(autohide)) {
        setVisible(false)
      } else {
        setVisible(_state.panel[id])
      }
    } else {
      setVisible(_state.panel[id])
    }
  }, [_state.dom.screenSize, _state.panel, id, autohide])

  let order = position === 'left' ? 1 : position === 'right' ? 3 : 2
  let responsive = flex._get(`responsive.${target}`, {
    flex: 'row',
    fixed: false
  })
  let sty = { ...style }
  if (width) {
    sty.minWidth = responsive.flex === 'column' ? 'unset' : width
    sty.maxWidth = responsive.flex === 'column' ? 'unset' : width
  }
  if (overlay) {
    sty.position = 'absolute'
    if (position === 'right') sty.right = 0
    sty.minHeight = '100%'
  }

  // Note: Inner container must be set to position relative for row layout (otherwise height will be zero when embedded)
  return (
    <div
      style={sty}
      className={`flex-grow-1 overflow-y order-${order} ${
        visible ? '' : 'd-none'
      }`}
      {...o}
    >
      <div
        className={`${
          responsive.flex === 'row'
            ? 'position-relative h-100 w-100 m-0 p-0'
            : ''
        }`}
      >
        {controlButtons}
        <div className={`h-100 w-100 ${className || ''}`}>{children}</div>
      </div>
    </div>
  )
}

Layout_Panel.propTypes = {
  id: PropTypes.string.isRequired,
  target: PropTypes.string.isRequired,
  position: PropTypes.oneOf(['left', 'right', 'center']),
  visibleDefault: PropTypes.bool
}
Layout_Panel.defaultProps = {
  overlay: false,
  position: 'center',
  style: {},
  visibleDefault: true
}

const getButton = (btn, props) => {
  let { title, innerClass, color, variant, size, children } = props
  let btnType = null
  let sty = {}
  if (typeof children === 'undefined') {
    switch (variant) {
      case 'chevron-left':
        btnType = (
          <FaChevronLeft
            size={size}
            color={color}
            className={`${btn.class} ${innerClass || ''}`}
          />
        )
        break
      case 'chevron-right':
        btnType = (
          <FaChevronRight
            size={size}
            color={color}
            className={`${btn.class}  ${innerClass || ''}`}
          />
        )
        break
      case 'bars':
        btnType = (
          <FaBars
            size={size}
            color={color}
            className={`${btn.class} ${innerClass || ''}`}
          />
        )
        break
      case 'dots':
        btnType = (
          <BsThreeDotsVertical
            color={color}
            className={`${btn.class} ${innerClass || ''}`}
            size={size || '1.5em'}
          />
        )
        break
      case 'cross':
        btnType = (
          <FaTimes
            size={size}
            color={color}
            className={`${btn.class} ${innerClass || ''}`}
          />
        )
        break
      case 'expander':
        sty = {}
        if (btn.style.left === undefined) sty.right = 0
        else sty.left = 0
        btnType = (
          <div
            style={sty}
            className={`flex-layout-button-expander ${
              btn.style && btn.style.right === undefined
                ? 'left-radius'
                : 'right-radius'
            } ${btn.class} ${innerClass || ''}`}
          >
            {title}
          </div>
        )
        break
      case 'dropexpander':
        sty = { width: btn.style.width }
        btnType = (
          <div
            style={sty}
            className={`flex-layout-button-dropexpander ${innerClass || ''}`}
          >
            {title}
          </div>
        )
        break
      default:
        btnType = (
          <div className={`${btn.class} ${innerClass || ''}`}>
            {children || <FaQuestion color='red' size='1.5em' />}
          </div>
        )
    }
    return btnType
  }
  return <></>
}

/************************
 *** Layout.Button() ***
 ************************/
export const Layout_Button = (props) => {
  const {
    id,
    parentId,
    layoutId,
    position,
    color,
    opacity,
    boxShadow,
    title,
    variant,
    top,
    left,
    right,
    bottom,
    bg,
    width,
    height,
    sprout,
    style,
    customBtn,
    className,
    innerClass,
    scrollWidth,
    visible,
    size,
    target,
    children,
    ...o
  } = props

  let ref = useRef()
  // Const [dimensions, setDimensions] = useState()
  const [btn, setBtn] = useState({ position: {}, style: {} })
  const [btnDef, setBtnDef] = useState(<></>)

  // try {
  //   console.log('ref', ref.current.closest('.flex-layout-wrapper'))
  // } catch {}

  useEffect(() => {
    let {
      id,
      left,
      right,
      top,
      bottom,
      color,
      width,
      height,
      opacity,
      bg,
      variant,
      position,
      sprout,
      style
    } = props
    if (ref.current) {
      // Get Btn Style
      const btnStyle = {
        position: position,
        justifyContent: 'center',
        alignItems: 'center',
        lineHeight: '1em',
        // Clear: style && style.right === undefined ? 'left' : 'right',
        padding: '0px',
        margin: '0px',
        zIndex: 3,
        ...style,
        // Float: style && style.right === undefined ? 'left' : 'right',
        boxShadow:
          props && props.boxShadow
            ? '0 0 6px #000'
            : props && props.boxShadow
            ? props.boxShadow
            : 'unset'
      }

      // Apply Overrides
      if (left) btnStyle.left = getSize(left, position)
      else if (right) btnStyle.right = getSize(right, position)
      if (top) btnStyle.top = getSize(top, position)
      else if (bottom) btnStyle.bottom = getSize(bottom, position)
      if (color) btnStyle.color = color
      if (width) btnStyle.width = getSize(width)
      if (height) btnStyle.height = getSize(height)
      if (opacity) btnStyle.opacity = opacity
      if (bg) btnStyle.backgroundColor = bg

      // ADJUSTMENTS FOR STICKY ELEMENTS (APPLY FLOAT TO COUNTERACT BUTTON PUSHING OUT CONTENT)
      if (btnStyle.position === 'sticky') {
        if (btnStyle.right !== undefined && !btnStyle.left)
          btnStyle.float = 'right'
        else btnStyle.float = 'left'
      }

      // Get Target Panel (Needed for percentage widths and heights)
      let layoutPanel = ref.current.closest('.flex-layout-wrapper')
      if (!layoutPanel) throw new Error(`Button [${id}] has no layout parent`)
      let parentPanel = ref.current.closest('.flex-layout-panel')
      if (!parentPanel) {
        // If no parent Panel - base on Layout Container
        parentPanel = ref.current.closest('.flex-layout-body')
      }
      if (!layoutPanel) throw new Error(`Button [${id}] has not layout body`)

      // Other Adjustments
      //if (type === 'static') btnStyle.position = 'static !important'
      if (variant === 'expander' && !btnStyle.backgroundColor)
        btnStyle.backgroundColor = 'red'
      if (variant === 'dropexpander' && !btnStyle.backgroundColor)
        btnStyle.backgroundColor = 'blue'
      let hover =
        sprout && !(variant === 'expander' || variant === 'dropexpander')
          ? 'flex-layout-button-sprout'
          : ''

      setBtn({
        style: btnStyle,
        class: hover
      })
    }
    setBtnDef(getButton(btn, props))
    if (id === 'layoutBtn3') console.log(id)
    // eslint-disable-next-line
  }, [ref.current])

  // Let btnType = getButton(btn, props)

  return (
    <div
      id={id}
      ref={ref}
      className={`flex-layout-button ${className || ''} ${
        visible ? '' : 'd-none'
      }`}
      onClick={() => {}}
      style={btn.style}
      {...o}
    >
      {btnDef}
      {children}
    </div>
  )
}

Layout_Button.propTypes = {
  type: PropTypes.oneOf(['static', 'relative', 'absolute', 'fixed']),
  target: PropTypes.string,
  color: PropTypes.string,
  top: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  left: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  variant: PropTypes.oneOf([
    'expander',
    'dropexpander',
    'chevron-left',
    'chevron-right',
    'bars',
    'dots',
    'cross',
    'custom'
  ]),
  sprout: PropTypes.bool,
  title: PropTypes.string
}
Layout_Button.defaultProps = {
  visible: true,
  position: 'absolute',
  target: 'panel',
  top: 0,
  left: 0,
  customBtn: <Fragment />,
  // Positioning: 'content',
  color: null,
  sprout: true
}

// Layout.Container = Layout_Container
Layout.Header = Layout_Header
Layout.Body = Layout_Body
Layout.Footer = Layout_Footer
Layout.Panel = Layout_Panel
Layout.TabBar = Layout_TabBar
Layout.MiniTabBtn = Layout_MiniTabBtn
Layout.Button = Layout_Button
Layout.getDimensions = getDimensions
Layout.Responsive = Layout_Responsive

export default Layout
export {
  getScreenWidth,
  getScreenSize,
  getLayoutId,
  getSizeInt,
  getSize,
  getNextBreak,
  getDimensions,
  isResponsiveBreakGE,
  isResponsiveBreakLE,
  getResponsiveBreakWidth
}
