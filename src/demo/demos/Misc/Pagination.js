import React, { useEffect } from 'react'
import movieData from './sampleMovieData'
import RDT from 'react-data-table-component'
import { useFlex } from 'bootflex'

const Outside = ({ tableId }) => {
  let [flex] = useFlex()
  return (
    <div>
      <button onClick={() => flex._pageAction(tableId, 'first')}>FIRST</button>
      <button onClick={() => flex._pageAction(tableId, 'prev')}>PREV</button>
      <button onClick={() => flex._pageAction(tableId, 'next')}>NEXT</button>
      <button onClick={() => flex._pageAction(tableId, 'last')}>LAST</button>
      <button onClick={() => flex._pageAction(tableId, '5')}>PAGE 5</button>
    </div>
  )
}

// Using outside global
let lastTrigger = null

/******************************************************************
 *** ContextPagination() - Context Pagination Component For RDT *** 
 ******************************************************************
 Note: This will not render the pagination controls (use Pagination component for this) 
 What it does is to expose RDT Pagination to Context API
 ***/

// PAGINATION CONTROL - BOUND TO CONTEXT
const ContextPagination = (props) => {
  let [flex, _state] = useFlex()
  const {
    tableId,
    rowsPerPage,
    rowCount,
    onChangePage,
    onChangeRowsPerPage,
    currentPage
  } = props

  let totalPages = Math.ceil(rowCount / rowsPerPage)

  let pageCtx = flex._get(`pagination.${tableId}`, null)
  let pageTrigger = _state && _state.pageTrigger[tableId]
  // Console.log('Page Trigger is', pageTrigger)

  const adjustPage = (mode) => {
    let newPage
    if (mode === 'first') newPage = 1
    else if (mode === 'last') newPage = totalPages
    else if (mode === 'next')
      newPage = currentPage >= totalPages ? totalPages : currentPage + 1
    else if (mode === 'prev') newPage = currentPage <= 1 ? 1 : currentPage - 1
    else newPage = parseInt(mode)

    console.log('Adjust', mode, currentPage, newPage)
    onChangePage(newPage)
  }

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
      flex._setpagination(tableId, {
        rowsPerPage,
        rowCount,
        currentPage
      })
    }
    // eslint-disable-next-line
  }, [
    tableId,
    rowsPerPage,
    rowCount,
    onChangePage,
    onChangeRowsPerPage,
    currentPage,
    pageCtx
  ])

  return (
    <>
      <button id='backer' onClick={() => adjustPage(currentPage - 1)}>
        BACK
      </button>
      <button onClick={() => adjustPage(currentPage + 1)}>FORWARD</button>
      Page {currentPage} Row Count {rowCount}
    </>
  )
}

const PaginationTester = () => {
  const columns = React.useMemo(
    () => [
      {
        name: 'Title',
        selector: 'title',
        sortable: true,
        minWidth: '150px'
      },
      {
        name: 'Year',
        selector: 'year',
        sortable: true,
        width: '100px'
      },
      {
        name: 'Director',
        selector: 'director',
        sortable: true
      }
    ],
    []
  )

  let id = 'test-rdt'

  const Pagination = ({ ...o }) => <ContextPagination tableId={id} {...o} />

  return (
    <div className='p-3'>
      <RDT
        id={id}
        data={movieData}
        columns={columns}
        paginationComponent={Pagination}
        pagination={true}
        paginationPerPage={10}
      />
      <Outside tableId={id} />
    </div>
  )
}
export default PaginationTester
