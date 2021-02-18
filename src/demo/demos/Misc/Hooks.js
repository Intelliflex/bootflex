import React from 'react'
import { Container } from 'react-bootstrap'
import { useRecord, Layout } from 'bootflex'
const Test = (props) => {
  let [record, REC] = useRecord(
    { fruit: 'apple', edible: 'no' },
    { custom: () => console.log('My name is ', REC.get('name', 'unknown')) }
  )

  return (
    <Layout.Responsive id='layout-dev-body' collapse='md' className='bg-white'>
      <Container>
        <h1>useRecord Tester</h1>
        <br />
        <button onClick={() => console.log(record)}>SHOW RECORD</button>
        <button onClick={() => console.log(REC)}>SHOW DISPATCH</button>
        <button onClick={() => REC.set({ animal: 'duck' })}>DUCK</button>
        <button onClick={() => REC.set({ name: 'Mike' })}>NAME</button>
        <button onClick={() => REC.set({ fruit: 'peach', animal: 'emu' })}>
          CHANGE
        </button>
        <button
          onClick={() => {
            let x = REC.get('name', 'no name defined')
            console.log(x)
          }}
        >
          GET NAME
        </button>
        <button onClick={() => REC.custom()}>CUSTOM</button>
        <button onClick={() => REC.clear(['edible', 'name'])}>CLEAR</button>
      </Container>
    </Layout.Responsive>
  )
}
export default Test
