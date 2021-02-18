import React from 'react'
import { useImmerReducer } from 'use-immer'
import lodash_get from 'lodash/get'
//import lodash_set from 'lodash/set'
import PropTypes from 'prop-types'
import uuidv4 from 'uuid/v4'

/******************************************************
 **** DEFINE INITIAL STATE FOR Flex INTERNAL CONTEXT ***
 ******************************************************/
let initialFlexState = {
  panel: {},
  responsive: {},
  dom: {
    screenSize: 'lg',
    resizing: false,
    resizeFinished: true,
    panelChange: 0
  },
  pagination: {},
  pageTrigger: {},
  pageAction: {},
  tabs: {},
  tabbar: {},
  editor: {}
}

/*********************************************************************************
 **** CREATE CONTEXTS (Application Adhoc State, Flex Application and Dispatch ) ***
 *********************************************************************************/
const AppStateContext = React.createContext()
const FlexStateContext = React.createContext()
const FlexDispatchContext = React.createContext()

/**************************************
 *** INTERNAL DISPATCH ACTION TYPES ***
 **************************************/
const ACTION = {
  SET: 'SET',
  TABS: 'TABS',
  TABBAR: 'TABBAR',
  PANEL: 'PANEL',
  LAYOUT: 'LAYOUT',
  DOM: 'DOM',
  RESPONSIVE: 'RESPONSIVE',
  TOGGLELAYOUT: 'TOGGLE',
  // PAGESET: 'PAGESET',
  PAGESET: 'PAGESET',
  PAGEACTION: 'PAGEACTION',
  PAGETRIGGER: 'PAGETRIGGER',
  // PAGE: 'PAGE',
  CARD: 'CARD',
  EDITORDATA: 'EDITORDATA',
  EDITORACTIVE: 'EDITORACTIVE',
  // EDITORDIRTY: 'EDITORDIRTY',
  EDITORRESET: 'EDITORRESET',
  EDITORSUBMIT: 'EDITORSUBMIT'
}

/**********************************************
 **** Flex Reducer (For Internal Flex usage) ****
 **********************************************/
const FlexReducer = (draft, action) => {
  switch (action.type) {
    case ACTION.SET:
      // Assign Context for every key value in passed Object
      Object.keys(action.payload).map((key) => {
        draft[key] = action.payload[key]
        return null
      })
      return
    case ACTION.PANEL:
      draft.panel = { ...draft.panel, ...action.payload }
      draft.dom = {
        ...draft.dom,
        ...{
          panelChange: draft.dom.panelChange ? draft.dom.panelChange + 1 : 1
        }
      }
      return
    case ACTION.CARD:
      draft.card = { ...draft.card, ...action.payload }
      return
    case ACTION.TABBAR:
      draft.tabbar = { ...draft.tabbar, ...action.payload }
      return
    case ACTION.LAYOUT:
      draft.layout = { ...draft.layout, ...action.payload }
      return
    case ACTION.RESPONSIVE:
      draft.responsive[action.payload.id] = action.payload.obj
      return
    case ACTION.TOGGLELAYOUT: {
      draft.responsive[action.payload].fixed = !lodash_get(
        draft.responsive,
        `${action.payload}.fixed`,
        false
      )
      return
    }
    case ACTION.DOM: {
      draft.dom = { ...draft.dom, ...action.payload }
      return
    }
    case ACTION.TABS: {
      draft.tabs[action.payload.id] = action.payload.jsx
      return
    }
    // case ACTION.PAGESET: {
    //   draft.pagination = { ...draft.pagination, ...action.payload }
    //   return
    // }
    case ACTION.PAGESET: {
      let { id, settings } = action.payload
      draft.pagination[id] = { ...draft.pagination[id], ...settings }
      return
    }
    case ACTION.PAGEACTION: {
      let { id, pageAction } = action.payload
      draft.pageAction[id] = pageAction
      draft.pageTrigger[id] = uuidv4()
      return
    }
    case ACTION.EDITORDATA: {
      if (typeof draft.editor[action.payload.id] === 'undefined')
        draft.editor[action.payload.id] = {}
      draft.editor[action.payload.id].data = action.payload.data
      return
    }
    case ACTION.EDITORACTIVE: {
      if (typeof draft.editor[action.payload.id] === 'undefined')
        draft.editor[action.payload.id] = {}
      draft.editor[action.payload.id].active = action.payload.flag
      return
    }
    // case ACTION.EDITORDIRTY: {
    //   if (typeof draft.editor[action.payload.id] === 'undefined') draft.editor[action.payload.id] = {}
    //   draft.editor[action.payload.id].dirty = action.payload.flag
    //   return
    // }
    case ACTION.EDITORRESET: {
      // TRIGGER FORM CLICK EVENT
      console.log('Reset', `${action.payload.id}-reset`)
      let ele = document.getElementById(`${action.payload.id}-reset`)
      if (!ele)
        throw new Error(`Could not trigger Reset of form ${action.payload.id}`)
      ele.click()
      return
    }

    case ACTION.EDITORSUBMIT: {
      // TRIGGER FORM CLICK EVENT
      console.log('Submit', `${action.payload.id}-submit`)
      let ele = document.getElementById(`${action.payload.id}-submit`)
      if (!ele)
        throw new Error(`Could not trigger Reset of form ${action.payload.id}`)
      ele.click()
      return
    }

    default: {
      if (action && action.payload && action.field) {
        draft[action.field] = action.payload
      }
      return
    }
  }
}

/*******************************************************
 **** Application Reducer - For Optional Adhoc State ***
 *******************************************************/
const AppReducer = (draft, action) => {
  switch (action.type) {
    case ACTION.SET:
      // Assign Context for every key value in passed Object
      Object.keys(action.payload).map((key) => {
        draft[key] = action.payload[key]
        return null
      })
      return

    default: {
      if (action && action.payload && action.field) {
        draft[action.field] = action.payload
      }
      return
    }
  }
}

/***************************************************************
 **** DEFINE HOOKS (NOTE ONLY THE useFlexContext() Hook is Exported) ***
 ***************************************************************/
const errText =
  "Be sure to wrap your application with <Flex></Flex> after import Flex from 'Flex-boostrap-extensions'."
const useAppState = (initial) => {
  const context = React.useContext(AppStateContext)
  if (context === undefined) {
    throw new Error(
      `useFlexContext() for ad-hoc context must be used within the FlexProvider without the 'nocontext' option set. ${errText}`
    )
  }
  return { ...context, ...initial }
}
const useFlexContextState = (initial) => {
  const context = React.useContext(FlexStateContext)
  if (context === undefined) {
    throw new Error(
      `useFlexContext() must be used within a FlexProvider. ${errText}`
    )
  }
  return { ...context, ...initial }
}
const useFlexContextDispatch = () => {
  const context = React.useContext(FlexDispatchContext)
  if (context === undefined) {
    throw new Error(
      `Flex Dispatch Methods (set, dispatch, setFlex and seFlexDispatch) must be used within a FlexProvider ${errText}`
    )
  }
  return context
}
// MAIN HOOK (AMALGAMATES ALL THREE CONTEXTS)
const useFlexContext = () => {
  return [useAppState(), useFlexContextDispatch(), useFlexContextState()]
}

const useFlex = () => {
  return [useFlexContextDispatch(), useFlexContextState()]
}

/******************************
 **** MAIN PROVIDER EXPORT ****
 ******************************/
const FLEX = (props) => {
  let { nocontext, children } = props
  // DEFINE REDUCER
  const [state, dispatch] = useImmerReducer(AppReducer, {})
  const [_state, _dispatch] = useImmerReducer(FlexReducer, initialFlexState)

  // METHODS FOR INTERNAL TBE USE (ALL INTERNAL METHODS ARE PREFIXED WITH UNDERSCORE)
  const _set = (val) => {
    _dispatch({
      type: ACTION.SET,
      payload: val
    })
  }
  const _get = (path, fallback) => {
    return lodash_get(_state, path, fallback)
  }
  const _togglePanel = (id) => {
    _dispatch({
      type: ACTION.PANEL,
      payload: { [id]: !lodash_get(_state.panel, id, false) }
    })
  }
  const _openPanel = (id) => {
    _dispatch({
      type: ACTION.PANEL,
      payload: { [id]: true }
    })
  }
  const _closePanel = (id) => {
    _dispatch({
      type: ACTION.PANEL,
      payload: { [id]: false }
    })
  }
  const _setPanel = (id, flag) => {
    _dispatch({
      type: ACTION.PANEL,
      payload: { [id]: flag }
    })
  }
  const _setCard = (id, obj) => {
    _dispatch({
      type: ACTION.CARD,
      payload: { [id]: obj }
    })
  }

  const _setLayout = (id, type) => {
    _dispatch({
      type: ACTION.LAYOUT,
      payload: { [id]: type }
    })
  }
  const _setResponsive = (id, obj) => {
    _dispatch({
      type: ACTION.RESPONSIVE,
      payload: { id, obj }
    })
  }
  const _toggleLayout = (id) => {
    _dispatch({
      type: ACTION.TOGGLELAYOUT,
      payload: id
    })
  }
  const _dom = (attr) => {
    _dispatch({
      type: ACTION.DOM,
      payload: attr
    })
  }
  const _tabs = (id, jsx) => {
    _dispatch({
      type: ACTION.TABS,
      payload: { id, jsx }
    })
  }
  const _layout = (settings) => {
    _dispatch({
      type: ACTION.LAYOUT,
      payload: settings
    })
  }
  const _setTabBar = (id, flag) => {
    _dispatch({
      type: ACTION.TABBAR,
      payload: { [id]: flag }
    })
  }
  const getSizeInt = (sz) => {
    let result = ['xs', 'sm', 'md', 'lg', 'xl', 'xxl', 'xxxl'].indexOf(sz) + 1
    return result
  }
  // Compare Current screen size with supplied breakpoint
  const _isBreakpoint = (breakpoint) => {
    let result = getSizeInt(_state.dom.screenSize) <= getSizeInt(breakpoint)
    return result
  }
  const _isVisible = (id) => {
    return lodash_get(_state.panel, id, false)
  }

  const _setPagination = (id, settings) => {
    _dispatch({
      type: ACTION.PAGESET,
      payload: { id, settings }
    })
  }

  const _pageAction = (id, pageAction) => {
    _dispatch({
      type: ACTION.PAGEACTION,
      payload: { id, pageAction }
    })
  }

  const _editorActive = (id, flag) => {
    _dispatch({
      type: ACTION.EDITORACTIVE,
      payload: { id, flag }
    })
  }

  const _editorIsActive = (id) => {
    return _get(`editor.${id}.active`, false)
  }

  const _editorGetData = (id) => {
    return _get(_state, `editorData.${id}`, {})
  }

  const _editorSetData = (id, data) => {
    _dispatch({
      type: ACTION.EDITORDATA,
      payload: { id, data }
    })
  }

  const _editorReset = (id) => {
    _dispatch({
      type: ACTION.EDITORRESET,
      payload: { id }
    })
  }

  const _editorSubmit = (id) => {
    _dispatch({
      type: ACTION.EDITORSUBMIT,
      payload: { id }
    })
  }

  // Next,Prev, First, Last or Page No
  const _page = (page) => {
    _dispatch({
      type: ACTION.PAGE,
      payload: page
    })
  }

  // OBJECT FOR CUSTOM Flex METHODS (THEY ARE DESTRUCTURED IN EXPORT)
  let dev = {
    _set,
    _get,
    _dispatch,
    _togglePanel,
    _openPanel,
    _closePanel,
    _setPanel,
    _setLayout,
    _setCard,
    _tabs,
    _setTabBar,
    _setResponsive,
    _toggleLayout,
    _dom,
    _layout,
    _isBreakpoint,
    _isVisible,
    _setPagination,
    _page,
    _pageAction,
    _editorActive,
    _editorIsActive,
    _editorGetData,
    _editorSetData,
    _editorReset,
    _editorSubmit
  }

  // ADHOC APPLICATION CONTEXT METHODS
  const set = (val) => {
    dispatch({
      type: ACTION.SET,
      payload: val
    })
  }
  const get = (path, fallback) => {
    return lodash_get(state, path, fallback)
  }
  if (nocontext) {
    return (
      // NO CONTEXT - DO NOT INCLUDE USER CONTEXT (STATE) PROVIDER
      <FlexStateContext.Provider value={_state}>
        <FlexDispatchContext.Provider value={{ ...dev }}>
          {children}
        </FlexDispatchContext.Provider>
      </FlexStateContext.Provider>
    )
  } else {
    return (
      // INCLUDE USER CONTEXT AS DEFAULT
      <FlexStateContext.Provider value={_state}>
        <AppStateContext.Provider value={state}>
          <FlexDispatchContext.Provider value={{ set, get, dispatch, ...dev }}>
            {children}
          </FlexDispatchContext.Provider>
        </AppStateContext.Provider>
      </FlexStateContext.Provider>
    )
  }
}
FLEX.propTypes = {
  nocontext: PropTypes.bool
}
FLEX.defaultProps = {
  nocontext: false
}

// Note: No need to memoise anything as Dispacth context is static functions and state and _state are single dependents
export default FLEX
export { useFlexContext, useFlex, ACTION }
