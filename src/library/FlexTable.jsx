import React, { Fragment, useEffect, useLayoutEffect, useState, useRef, useMemo } from 'react'
import RDT from 'react-data-table-component'
import { useFlex } from './Context.jsx'
import { H } from './Flex.jsx'
import FlexCard from './FlexCard.jsx'
import PropTypes from 'prop-types'
import lodash_set from 'lodash/set'
import uuid from 'uuid/v4'
import { FaAngleDoubleLeft, FaAngleDoubleRight, FaAngleLeft, FaAngleRight } from 'react-icons/fa'

export const FlexSelectNative = (props) => {
  let { onChange, options, ...o } = props
  return (
    <select onChange={(e) => onChange(e.target.value)} {...o}>
      {options.map((item) => (
        <option key={item.value} label={item.label}>
          {item.value}
        </option>
      ))}
    </select>
  )
}

const PaginationBtn = (props) => {
  const { icon, action, ...o } = props
  return (
    <button
      onClick={() => {
        action()
      }}
      className='btn py-0 px-1 tp-hover btn-transparent'
      {...o}
    >
      {icon}
    </button>
  )
}

const Pagination = (props) => {
  const { tableId, color, className, right } = props
  const [options, setOptions] = useState([])
  const [flex, _state] = useFlex()

  let totalPages
  let pValues = flex._get(`pagination.${tableId}`, null)
  if (pValues) {
    totalPages = Math.ceil(pValues.rowCount / pValues.rowsPerPage)
  }
  useEffect(() => {
    if (totalPages) {
      let pages = totalPages > 25 ? 25 : totalPages
      let arr = Array(pages)
        .fill()
        .map((_, i) => {
          return { label: `${i + 1}`, value: i + 1 }
        })
      setOptions(arr)
    }
    // eslint-disable-next-line
  }, [totalPages])

  // DO NOT SHOW PAGINATION IF CONTEXT IS INACTIVE
  if (!_state.activeTable) return <div></div>

  if (!pValues) return <></>
  return (
    <div className={`d-flex  ${right ? 'justify-content-end' : ''} ${className || ''}`}>
      <PaginationBtn
        disabled={pValues.currentPage <= 1}
        action={() => flex._pageAction(tableId, 'first')}
        icon={<FaAngleDoubleLeft color={color} />}
      />
      <PaginationBtn
        disabled={pValues.currentPage <= 1}
        action={() => flex._pageAction(tableId, 'prev')}
        icon={<FaAngleLeft color={color} />}
      />
      {/* <FlexSelect options={options} menuPosition='top' /> */}
      {/* <FlexSelectNative options={options} /> */}
      <span className='px-2'>
        Page{' '}
        <FlexSelectNative
          value={pValues.currentPage}
          onChange={(page) => flex._pageAction(page)}
          options={options}
        />{' '}
        of {totalPages}
      </span>
      <PaginationBtn
        disabled={pValues.currentPage >= totalPages}
        action={() => flex._pageAction(tableId, 'next')}
        icon={<FaAngleRight color={color} />}
      />
      <PaginationBtn
        disabled={pValues.currentPage >= totalPages}
        action={() => flex._pageAction(tableId, 'last')}
        icon={<FaAngleDoubleRight color={color} />}
      />
    </div>
  )
}

/******************************************************************
 *** ContextPagination() - Context Pagination Component For RDT *** 
 ******************************************************************
 Note: This will not render the pagination controls (use Pagination component for this) 
 What it does is to expose RDT Pagination to Context API
 ***/
let lastTrigger = null
const ContextPagination = (props) => {
  let [flex, _state] = useFlex()
  const { tableId, rowsPerPage, rowCount, onChangePage, onChangeRowsPerPage, currentPage } = props

  let totalPages = Math.ceil(rowCount / rowsPerPage)

  let pageCtx = flex._get(`pagination.${tableId}`, null)
  let pageTrigger = _state && _state.pageTrigger[tableId]

  const adjustPage = (mode) => {
    let newPage
    if (mode === 'first') newPage = 1
    else if (mode === 'last') newPage = totalPages
    else if (mode === 'next') newPage = currentPage >= totalPages ? totalPages : currentPage + 1
    else if (mode === 'prev') newPage = currentPage <= 1 ? 1 : currentPage - 1
    else newPage = parseInt(mode)
    onChangePage(newPage)
  }

  // ADJUST PAGE ACCORDING TO CONTEXT
  useEffect(() => {
    if (pageTrigger) {
      let pageCommand = flex._get(`pageAction.${tableId}`)
      if (pageTrigger !== lastTrigger) {
        adjustPage(pageCommand)
      }
      lastTrigger = pageTrigger
    }
    // eslint-disable-next-line
  }, [tableId, pageTrigger, adjustPage, currentPage])

  // SET CONTEXT WHEN CHANGES
  useEffect(() => {
    // Apply Any Changes to Context
    let adjust = !pageCtx
    if (!adjust) adjust = pageCtx.currentPage !== currentPage
    if (!adjust) adjust = pageCtx.rowCount !== rowCount
    if (!adjust) adjust = pageCtx.rowsPerPage !== rowsPerPage
    if (adjust) {
      flex._setPagination(tableId, {
        rowsPerPage,
        rowCount,
        currentPage,
      })
    }
    // eslint-disable-next-line
  }, [tableId, rowsPerPage, rowCount, onChangePage, onChangeRowsPerPage, currentPage, pageCtx])

  return <></>
}

const getCrudOp = (op, props, required = true) => {
  if (props && props[op]) return props[op]
  else if (required) throw new Error(`FlexTable Editor requires [${op}] prop `)
  else return null
}

const FlexEditor = ({ row, keyField, editor }) => {
  let readRecord = getCrudOp('read', editor.props)
  // Let createRecord = getCrudOp('create', editor.props)
  // Let updateRecord = getCrudOp('update', editor.props)
  // Let deleteRecord = getCrudOp('delete', editor.props, false)
  const [data, setData] = useState({})

  // GET DATA VIA READ RECORD
  useEffect(() => {
    if (row && Object.keys(row).length) {
      let data = readRecord(row[keyField])
      setData(data)
    }
  }, [row, keyField, readRecord])

  const Editor = (props) => {
    let editorJsx = React.cloneElement(editor, {
      key: uuid(),
      record: data,
    })
    return <>{editorJsx}</>
  }

  return (
    <div className='p-2'>
      <Editor />
    </div>
  )
}

// Let renderCount = 0

// WRAPPER FOR STANDARD RDT TABLE (WILL APPLY CUSTOM PAGINATION WHEN PAGINATION PROPERTY SET)
const FlexTable = (props) => {
  const {
    id,
    keyField,
    data,
    title,
    fill,
    height,
    customStyles,
    rowHeight,
    minHeight,
    headerHeight,
    paginationPerPage,
    className,
    aboveTable,
    belowTable,
    paginationContext,
    tableHeader,
    tableFooter,
    editor,
    ...o
  } = props
  const [rowCount, setRowCount] = useState(0)
  const [rowData, setRowData] = useState()
  const ref = useRef()

  // LOAD CONTEXT
  const [flex] = useFlex()

  // DYANMIC VARIABLES
  let headerHgt = headerHeight ? headerHeight : rowHeight ? rowHeight : null
  let customStyle = customStyles ? { ...customStyles } : {}
  if (rowHeight || minHeight) lodash_set(customStyle, 'rows.style.minHeight', `${rowHeight} !important`)
  if (rowHeight) lodash_set(customStyle, 'rows.style.maxHeight', `${rowHeight} !important`)
  if (headerHgt) lodash_set(customStyle, 'headRow.style.minHeight', `${headerHgt} !important`)
  let fillMode = fill !== undefined ? fill : paginationContext || false
  let editorId = `${id}-editor`

  // REGISTER CURRENT TABLE IN CONTECT AS ACTIVETABLE
  useEffect(() => {
    flex._set({ activeTable: id })
    return () => {
      flex._set({ activeTable: false })
    }
    // eslint-disable-next-line
  }, [id])

  // DEFINE EDITOR CONTEXT
  useEffect(() => {
    if (editor) {
      flex._set({ editor: { [editorId]: { active: false, data: {} } } })
    }
    // eslint-disable-next-line
  }, [editor])

  // CALCULATE NUMBER OF ROWS BASED ON CONTAINER DIMENSIONS
  useLayoutEffect(() => {
    setTimeout(() => {
      if (ref && ref.current) {
        const dimensions = ref.current.getBoundingClientRect()
        // Allow 2 pixels top and bottom for header border and 1 pixel for each row
        const rowHgt = rowHeight ? parseInt(rowHeight) : minHeight ? parseInt(minHeight) : null
        const headHgt = headerHeight ? parseInt(headerHeight) : rowHgt
        if (dimensions && rowHgt) {
          let rows = parseInt((dimensions.height - headHgt) / rowHgt)
          // Mininium Rows 25 (if not defined - eg: collapsed - this is fallback that should not occur)
          setRowCount(rows || 2)
        }
      }
    }, 0)
  }, [minHeight, rowHeight, headerHeight])

  const TableHeader = useMemo(
    () => (props) => {
      if (tableHeader) return <FlexCard.Header className='bg-light'>{tableHeader}</FlexCard.Header>
      else if (title)
        return (
          <FlexCard.Header className='bg-light'>
            <H primary x4>
              {title}
            </H>
          </FlexCard.Header>
        )
      else return <></>
    },
    [title, tableHeader]
  )

  const TableFooter = useMemo(
    () => (props) => {
      if (tableFooter) return <FlexCard.Footer>{tableFooter}</FlexCard.Footer>
      else return <Fragment />
    },
    [tableFooter]
  )

  const WrappedContextPagination = useMemo(
    () => ({ ...o }) => {
      return <ContextPagination tableId={id} {...o} />
    },
    [id]
  )

  if (paginationContext && !paginationPerPage && !(height || fillMode))
    throw new Error(
      'FlexTable: You have used paginationContext without fill option or height. paginationPerPage prop must be supplied'
    )

  let stdProps = {
    onRowClicked: (data, x) => {
      setRowData(data)
      flex._editorActive(editorId, true)
    },
  }

  // if (!rowCount && paginationContext) rowCount = 20

  // CREATE BODY DISPLAY ELEMENT (EITHER DATATABLE OR EDITOR )
  // console.log('Render', renderCount++)
  let ele
  if (flex._editorIsActive(editorId)) {
    ele = <FlexEditor id={editorId} keyField={keyField || 'id'} editor={editor} row={rowData} />
  } else if (rowCount && paginationContext) {
    ele = (
      <RDT
        pagination={true}
        paginationPerPage={rowCount}
        paginationComponent={WrappedContextPagination}
        customStyles={customStyle}
        noHeader
        data={data}
        {...stdProps}
        {...o}
      />
    )
  } else if (rowCount && !paginationContext) {
    ele = <RDT customStyles={customStyle} noHeader data={data} {...stdProps} {...o} />
  } else ele = <Fragment />

  // RENDER DISPLAY CARD WITH EMBEDDED TABLE (OR EDITOR)
  return (
    <FlexCard fill={fillMode} height={height} className={`${className || ''}`}>
      <TableHeader />
      <FlexCard.Body ref={ref} flush>
        {ele}
      </FlexCard.Body>
      <TableFooter />
    </FlexCard>
  )
}
FlexTable.propTypes = {
  id: PropTypes.string.isRequired,
}
// FlexTable.defaultProps = {
// }

export default FlexTable
export { Pagination, PaginationBtn }
