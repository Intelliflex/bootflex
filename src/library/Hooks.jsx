import { useState } from 'react'
import { useImmerReducer } from 'use-immer'
import lodash_get from 'lodash/get'
import lodash_set from 'lodash/set'

/********************************************************************
 *** useValue() = Simple Hook to put use State into single object ***
 *** with value property and set method                           ***
 ********************************************************************/
export const useValue = (options) => {
  const [state, setState] = useState(options)
  const set = (obj) => {
    if (typeof obj === 'object') {
      // Set a single object property and retain other object values
      setState({ ...state, ...obj })
    } else {
      // If useValue is not an object - then just set to value
      setState(obj)
    }
  }
  return { value: state, set }
}

/***********************************************************************
 *** useRecord() - State Management for more than one field (record) ***
 *** uses Immer for Immutable State Management                       ***
 *** Also allows custom functions to be passed as a third paramater  ***
 ***********************************************************************/
export const RECORD_ACTION = {
  SET: 'SET',
  CLEAR: 'CLEAR',
  SETPATH: 'SEPPATH'
}
const clear = (obj, exclude = [], defaults = {}) => {
  for (const key in obj) {
    if (exclude.indexOf(key) < 0) {
      if (typeof obj[key] === 'string') obj[key] = ''
      if (typeof obj[key] === 'number') obj[key] = 0
      if (typeof obj[key] === 'boolean') obj[key] = false
      if (typeof obj[key] === 'object') {
        if (obj[key] && obj[key].length) obj[key] = []
        else obj[key] = null
      }
    }
  }
  obj = { ...obj, ...defaults }
  return obj
}
const recordReducer = (draft, action) => {
  switch (action.type) {
    case RECORD_ACTION.SET:
      // Assign Context for every key value in passed Object
      Object.keys(action.payload).map((key) => {
        draft[key] = action.payload[key]
        return null
      })
      return
    case RECORD_ACTION.SETPATH:
      console.log('action', action)
      lodash_set(draft, action.path, action.payload)
      return

    case RECORD_ACTION.CLEAR:
      // Clear all fields in record (except named in array of fields)
      draft = clear(draft, action.exceptions)
      return

    default: {
      if (action && action.payload && action.field) {
        draft[action.field] = action.payload
      }
    }
  }
}
export const useRecord = (initial, functions) => {
  const [record, dispatch] = useImmerReducer(recordReducer, initial)
  // SET RECORD VALUE (FOR EACH KEY PAIR VALUE PASSED IN AS VAL)
  const set = (val) => {
    dispatch({
      type: RECORD_ACTION.SET,
      payload: val
    })
  }
  const setPath = (path, val) => {
    dispatch({
      type: RECORD_ACTION.SETPATH,
      path: path,
      payload: val
    })
  }
  // GET RECORD VALUE (BASED ON STRING PATH)
  const get = (path, fallback) => {
    return lodash_get(record, path, fallback)
  }
  // CLEAR RECORD VALUES
  const clear = (exceptions = []) => {
    dispatch({
      type: RECORD_ACTION.CLEAR,
      exceptions: exceptions
    })
  }

  return [record, { set, setPath, get, clear, dispatch, ...functions }]
}
