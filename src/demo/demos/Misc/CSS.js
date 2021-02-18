import React from 'react'
//import './flex.scss'

import { Tester, H, ExampleComponent } from 'bootflex'
//import FlexTable from 'bootflex/FlexTable'
//import 'bootflex/index.css'

const App = () => {
  return (
    <div className='bg-light-purple'>
      <H>THIS IS HEADER</H>
      <ExampleComponent text='Create React Library Example 😄' />
      <Tester />
    </div>
  )
}

export default App
