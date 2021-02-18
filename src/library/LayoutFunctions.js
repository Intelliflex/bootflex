import lodash_get from 'lodash/get'

/*************************************
 **** Layout - Internal Functions ****
 *************************************/
export const getScreenWidth = () => {
  return window.innerWidth
}

export const getScreenSize = () => {
  let width = window.innerWidth
  let size = ''
  if (width < 576) size = 'xs'
  else if (width < 768) size = 'sm'
  else if (width < 992) size = 'md'
  else if (width < 1200) size = 'lg'
  else if (width < 1900) size = 'xl'
  else if (width < 3000) size = 'xxl'
  else size = 'xxxl'
  return size
}

// Get Bootstrap Break Widths
export const getResponsiveBreakWidth = (sz) => {
  let brk = 0
  if (sz === 'xs') brk = 0
  else if (sz === 'sm') brk = 576
  else if (sz === 'md') brk = 768
  else if (sz === 'lg') brk = 992
  else if (sz === 'xl') brk = 1200
  else if (sz === 'xxl') brk = 1400
  return brk
}

// Get Integer comparision Value for Break Size comparison
export const getSizeInt = (sz) => {
  let result = null
  result = ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'].indexOf(sz) + 1
  return result
}

// Get the Breakpoint name after current
export const getNextBreak = (sz) => {
  let arr = ['xs', 'sm', 'md', 'lg', 'xl', 'xxl']
  let current = arr.indexOf(sz)
  return current >= 5 ? 'xxl' : arr[current + 1]
}

// Get the Breakpoint Before current
export const getPrevBreak = (sz) => {
  let arr = ['xs', 'sm', 'md', 'lg', 'xl', 'xxl']
  let current = arr.indexOf(sz)
  return current <= 0 ? 'xs' : arr[current - 1]
}

// Return true if current screen size is greater than or equal to supplied screen Size
export const isResponsiveBreakGE = (sz) => {
  let currentSize = getScreenSize(sz)
  return getSizeInt(currentSize) >= getSizeInt(sz)
}

// Return true if current screen size is less than or equal to the responsive break
export const isResponsiveBreakLE = (sz) => {
  let currentSize = getScreenSize(sz)
  return getSizeInt(currentSize) <= getSizeInt(sz)
}

// Get Size as integer (if px or string) or as percent if % sign
export const getSize = (sz, position) => {
  if (!sz) return null
  if (position === 'fixed') return parseInt(sz)
  let szStr = String(sz)
  if (szStr.indexOf('%') >= 0) return sz
  else {
    // Console.log('sz', sz, szStr)
    return parseInt(szStr)
  }
}

const getElementDimension = (ele, boundingBody) => {
  if (!ele && ele.id) return
  let dimensions = ele.getBoundingClientRect()
  let result = null
  result = {
    left: parseInt(dimensions.left),
    right: parseInt(dimensions.right),
    top: parseInt(dimensions.top),
    bottom: parseInt(dimensions.bottom),
    width: boundingBody
      ? parseInt(
          dimensions.width > boundingBody.width && boundingBody.width > 0
            ? boundingBody.width
            : dimensions.width
        )
      : dimensions.width,
    height: boundingBody
      ? parseInt(
          dimensions.height > boundingBody.height && boundingBody.height > 0
            ? boundingBody.height
            : dimensions.height
        )
      : dimensions.height,
    clientWidth: parseInt(ele.clientWidth),
    fullWidth: parseInt(dimensions.width),
    fullHeight: parseInt(dimensions.height),
    scrollWidth: parseInt(ele.offsetWidth - ele.clientWidth),
    id: ele.id
  }
  // Console.log('---->', result)
  return result
}

export const getDimensions = (ele) => {
  if (!ele) return null
  // Get Dimensions of Panel and dimensions of viewport container (within header & Footer)
  let panelDimensions = { [ele.id]: getElementDimension(ele) }
  // Get Dimensions of Body (visible Height & Width Cannot exceed this)
  let bodyEle = ele.querySelector('.flex-layout-body')
  let body = getElementDimension(bodyEle)
  // Console.log('@@@', bodyEle)
  let panels = ele.querySelectorAll('.flex-layout-panel')
  for (let i in panels) {
    let id = panels[i].id
    if (id) {
      if (panels[i] && panels[i].id) {
        let dimensions = getElementDimension(panels[i], body)
        panelDimensions = { ...panelDimensions, [id]: dimensions }
        panelDimensions[id].bodyId = body.id
        panelDimensions[id].layoutId = ele.id
      }
    }
  }
  return panelDimensions
}
// CLONE ELEMENTS PASSED AS PROPERTY - ADDING NEW PROPS
// const clonePropertyElements = (obj, newProps) => {
//   return React.Children.map(obj.props.children, (child, index) => {
//     return React.cloneElement(child, {
//       index,
//       ...newProps,
//     })
//   })
// }

export const getMin = (arr) => {
  let min = null
  for (let i in arr) {
    let val = parseFloat(arr[i])
    if (val < 0) val = 0
    if (!min) min = val
    else if (val < min) min = val
  }
  return min
}

// GET PARENT ID FROM DOM
export const getLayoutId = (ele) => {
  let parent = ele ? ele.closest('.flex-layout-wrapper') : null
  if (parent) {
    return parent ? lodash_get(parent, 'id', null) : null
  }
}
