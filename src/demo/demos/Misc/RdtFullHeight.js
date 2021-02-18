import React from 'react'
import data from './sampleMovieData'

import { FlexTable } from 'bootflex'
const Rdt = () => {
  // Const [state, flex, _state] = useFlexContext()

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

  const ExpanderRow = () => {
    return (
      <div className='bg-light p-5 '>
        <h4>Expander</h4>
        Notice how when rows are expanded the layout becomes responsive to
        accomodate extra room required, while still preserving layout and dixed
        pagination control position.
      </div>
    )
  }

  return (
    <>
      <FlexTable
        id='sample-table'
        tableHeader={<h4>FlexTable with Fill mode and set Row Height</h4>}
        rowHeight='25px'
        className='w-100'
        striped
        responsive
        resizeOffset={0}
        paginationContext={true}
        expandableRows={true}
        expandableRowsComponent={<ExpanderRow />}
        columns={columns}
        data={data}
      />
    </>
  )
}

export default Rdt
