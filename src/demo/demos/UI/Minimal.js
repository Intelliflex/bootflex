import React from 'react'
import { Layout } from 'bootflex'
const Minimal = () => {
  return (
    <Layout.Embed>
      <Layout id='minimal-layout'>
        <Layout.Header>
          <div className='w-100 px-2 py-4 bg-dark text-light text-center '>
            HEADER
          </div>
        </Layout.Header>
        <Layout.Body id='demo-body' variant='fixed'>
          <Layout.Responsive id='button-demo-responsive'>
            <Layout.Panel
              id='demo-left-panel'
              target='button-demo-responsive'
              className='p-2 bg-info'
              width='20%'
            >
              LEFT SIDE PANEL
            </Layout.Panel>
            <Layout.Panel
              id='demo-content'
              target='button-demo-responsive'
              className='p-2 '
            >
              APPLICATION CONTENT
            </Layout.Panel>
            <Layout.Panel
              id='demo-right-panel'
              target='button-demo-responsive'
              position='right'
              width='150px'
              className='p-2 bg-warning'
            >
              RIGHT SIDE PANEL
            </Layout.Panel>
          </Layout.Responsive>
        </Layout.Body>
        <Layout.Footer>
          <div className='w-100 px-2 py-2 bg-danger text-light text-center '>
            FOOTER
          </div>
        </Layout.Footer>
      </Layout>
    </Layout.Embed>
  )
}
export default Minimal
