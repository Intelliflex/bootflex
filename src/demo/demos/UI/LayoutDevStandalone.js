import React, { useEffect, useRef, useState } from 'react'
import { Button } from 'react-bootstrap'
import { useFlex } from 'bootflex'
import PropTypes from 'prop-types'

const LayoutResponsive = (props) => {
  const { id, collapse, style, variant, className, children, ...o } = props
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
LayoutResponsive.propTypes = {
  id: PropTypes.string.isRequired
}
LayoutResponsive.defaultProps = {
  collapse: 'md',
  variant: 'fixed'
}

const LayoutPanel = (props) => {
  const {
    id,
    target,
    position,
    style,
    width,
    overlay,
    className,
    children,
    ...o
  } = props
  let [flex] = useFlex()
  let order = position === 'left' ? 1 : position === 'right' ? 3 : 1
  let responsive = flex._get(`responsive.${target}`, {
    flex: 'row',
    fixed: false
  })
  let sty = { ...style }
  if (width) {
    //sty.width = responsive.flex === 'column' ? 'unset' : width
    sty.minWidth = responsive.flex === 'column' ? 'unset' : width
    sty.maxWidth = responsive.flex === 'column' ? 'unset' : width
  }
  if (overlay) {
    sty.position = 'absolute'
    if (position === 'right') sty.right = 0
    sty.minHeight = '100%'
  }

  return (
    <div
      style={sty}
      className={`flex-grow-1 overflow-auto order-${order} ${className || ''}`}
      {...o}
    >
      <div className='position-relative'>
        <div className='position-absolute h-100 w-100'>{children}</div>
      </div>
    </div>
  )
}

LayoutPanel.propTypes = {
  id: PropTypes.string.isRequired,
  target: PropTypes.string.isRequired,
  position: PropTypes.oneOf(['left', 'right', 'center'])
}
LayoutPanel.defaultProps = {
  overlay: false,
  position: 'center',
  style: {}
}

const LayoutDevStandalone = (props) => {
  let [flex] = useFlex()
  const [fixed, setFixed] = useState('fixed')

  // eslint-disable-next-line
  useEffect(() => {
    flex._setPanel('main-left', false)
    return () => {
      flex._setPanel('main-left', true)
    }
    // eslint-disable-next-line
  }, [])

  return (
    <LayoutResponsive id='responsive-tester1' variant={fixed} collapse='md'>
      {/* CONTENT DIVS ARE SET TO record.flex-GROW-1, ORDER 1,2,3 FOR LEFT, CONTENT, RIGHT AND OVERFLOW AUTO */}
      <LayoutPanel
        id='left-test-1'
        target='responsive-tester1'
        className='bg-warning'
        width='250px'
        position='left'
      >
        <Left title='LEFT PANEL' />
      </LayoutPanel>
      <LayoutPanel
        id='main-test-1'
        target='responsive-tester1'
        className='bg-info'
      >
        <Content
          title='MAIN CONTENT'
          target='responsive-tester1'
          fixed={fixed}
          setFixed={setFixed}
        />
      </LayoutPanel>
      <LayoutPanel
        id='right-test-1'
        target='responsive-tester1'
        className='bg-success'
        width='150px'
        position='right'
      >
        <Right title='RIGHT PANEL' />
      </LayoutPanel>
    </LayoutResponsive>
  )
}
export default LayoutDevStandalone

const Content = (props) => {
  const { target, title, fixed } = props
  // eslint-disable-next-line
  let [flex, _state] = useFlex()
  const [content, setContent] = useState()
  let responsive = flex._get(`responsive.${target}`, {
    flex: 'row',
    fixed: false
  })

  return (
    <div>
      <p>
        {title} Screen Size is {_state.dom.screenSize}
      </p>
      <p>
        LAYOUT MODE IS {fixed ? 'FIXED' : 'GROW'} : {responsive.flex} / $
        {responsive.fixed ? 'FIXED' : 'GROW'}
      </p>
      <Button
        onClick={() => {
          console.log('Target is', target)
          flex._setResponsive(target, {
            flex: responsive.flex === 'row' ? 'column' : 'row'
          })
        }}
      >
        TOGGLE ROW/COL
      </Button>
      <Button
        className='ml-2'
        onClick={() =>
          flex._setResponsive(target, {
            fixed: responsive.fixed ? false : true
          })
        }
      >
        TOGGLE FIXED/GROW
      </Button>
      {/* <Button className='ml-2' onClick={() => REC.set({ rightOverlay: !record.rightOverlay })}>
        TOGGLE RIGHT OVERLAY
      </Button>
      <Button className='ml-2' onClick={() => REC.set({ rightVisible: !record.rightVisible })}>
        TOGGLE RIGHT VISIBILITY
      </Button>{' '} */}
      <p>
        <Button onClick={() => setContent(content ? null : loremContent)}>
          EXPAND CONTENT
        </Button>
      </p>
      <p>{content}</p>
    </div>
  )
}

const Left = (props) => {
  const { title } = props
  const [content, setContent] = useState()
  return (
    <>
      <p>{title}</p>
      <p>
        <Button onClick={() => setContent(content ? null : loremAside)}>
          EXPAND CONTENT
        </Button>
      </p>
      <p>{content}</p>
    </>
  )
}

const Right = (props) => {
  const { title } = props
  const [content, setContent] = useState()
  return (
    <>
      <p>{title}</p>
      <p>
        <Button onClick={() => setContent(content ? null : loremAside)}>
          EXPAND CONTENT
        </Button>
      </p>
      <p>{content}</p>
    </>
  )
}

let loremContent = `Lorem ipsum dolor sit, amet consectetur adipisicing elit. Maiores, iusto eveniet repellendus placeat, ducimus nulla quam obcaecati debitis eos nisi sint et non pariatur perferendis corporis modi rerum vel reprehenderit?
Adipisci corporis odio illo modi, odit officia. Delectus veritatis asperiores ea officiis necessitatibus nulla, explicabo at voluptas aliquam illum cumque modi ipsam unde odio maiores, eveniet dolorem atque nihil sint.
Commodi neque et vel ullam aliquam necessitatibus, incidunt iusto expedita dolor dicta consectetur ex, eum saepe ipsam dignissimos placeat quas odio sit quaerat nesciunt. Quaerat officiis deleniti dicta voluptas doloribus!
Suscipit exercitationem deleniti at porro temporibus totam tempore commodi asperiores quo corrupti vero, delectus est ullam? Aut, tempore id odit dolores ullam vel voluptatem molestias quam, ab excepturi hic est?
Minima molestias nemo magni nam rem sapiente facere. Illum eum earum autem. Id in quasi fuga, consectetur blanditiis, totam nam consequatur dicta neque voluptatum eum cupiditate expedita! Dicta, ipsam facere.
Nisi harum quisquam recusandae facilis, explicabo accusantium quam. Animi quo nemo fugit illo deleniti labore, ex totam voluptates voluptatem, dolores eligendi tenetur asperiores repellat, assumenda porro temporibus magni praesentium perspiciatis!
Autem est eligendi distinctio consequatur a rerum, non quod sequi commodi harum praesentium? Temporibus tempora distinctio officia! Voluptatibus laboriosam sapiente laudantium possimus, adipisci praesentium repellendus fuga beatae corrupti facere eaque.
Voluptate rerum mollitia consequatur, illum possimus sapiente eius accusantium aperiam quidem! Voluptatem iste deleniti, autem earum fugit nemo quos. Cumque, necessitatibus sit ea amet placeat harum. Nemo labore temporibus illo!
Reiciendis veritatis ab nihil maiores sapiente ex molestiae, facilis assumenda cupiditate voluptatem autem recusandae, ipsum voluptates, minus mollitia. Fugiat velit quae vel nobis et fugit tempora autem dolorum perferendis aperiam?
Maxime velit nihil tempora eum cupiditate magnam, laborum voluptas facere iure aliquam voluptates sit aspernatur provident ipsa modi! Totam quia laboriosam neque culpa dignissimos cum nesciunt temporibus! Fugiat, optio labore!
Sequi labore saepe suscipit ullam, blanditiis neque hic et qui corporis assumenda illum sed ipsam porro eligendi nulla accusamus optio deleniti aspernatur, dolores excepturi rem! Rerum, quia iste! Dolores, ab?
Doloribus voluptatum delectus numquam itaque aliquid dignissimos non repellendus ad maiores, blanditiis debitis cupiditate omnis, repudiandae provident quidem recusandae rem dicta reiciendis ipsam. Eius, itaque omnis mollitia debitis vel similique!
Quaerat temporibus recusandae dolores nesciunt sint rem quae, blanditiis provident. Labore suscipit consequatur sapiente iste impedit temporibus, pariatur, fuga asperiores nam sit praesentium necessitatibus itaque aut quam placeat, quos vero?
Asperiores exercitationem veritatis illum consectetur laudantium, alias reiciendis at odio hic, eligendi veniam nostrum, dignissimos qui fugiat? Dicta aliquid hic impedit nobis, quae fugiat eum blanditiis aut, eligendi voluptatibus obcaecati?
Fuga nobis, optio reiciendis accusamus et autem commodi debitis earum? Totam et dolores sint sequi cupiditate rem a quaerat dolorem rerum obcaecati doloribus temporibus, alias quasi porro placeat voluptatum explicabo.
Fugiat exercitationem eius quod! Nesciunt fugit at voluptatum eveniet ipsum similique laboriosam, nobis aliquid rerum ipsa. Nam dolor accusantium ullam porro illum, eius perspiciatis! Qui aliquid quod corrupti! Est, expedita?
Praesentium, atque iure. Delectus veritatis asperiores ea officiis necessitatibus nulla, explicabo at voluptas aliquam illum cumque modi ipsam unde odio maiores, eveniet dolorem atque nihil sint.
Commodi neque et vel ullam aliquam necessitatibus, incidunt iusto expedita dolor dicta consectetur ex, eum saepe ipsam dignissimos placeat quas odio sit quaerat nesciunt. Quaerat officiis deleniti dicta voluptas doloribus!
Suscipit exercitationem deleniti at porro temporibus totam tempore commodi asperiores quo corrupti vero, delectus est ullam? Aut, tempore id odit dolores ullam vel voluptatem molestias quam, ab excepturi hic est?
Minima molestias nemo magni nam rem sapiente facere. Illum eum earum autem. Id in quasi fuga, consectetur blanditiis, totam nam consequatur dicta neque voluptatum eum cupiditate expedita! Dicta, ipsam facere.
Nisi harum quisquam recusandae facilis, explicabo accusantium quam. Animi quo nemo fugit illo deleniti labore, ex totam voluptates voluptatem, dolores eligendi tenetur asperiores repellat, assumenda porro temporibus magni praesentium perspiciatis!
Autem est eligendi distinctio consequatur a rerum, non quod sequi commodi harum praesentium? Temporibus tempora distinctio officia! Voluptatibus laboriosam sapiente laudantium possimus, adipisci praesentium repellendus fuga beatae corrupti facere eaque.
Voluptate rerum mollitia consequatur, illum possimus sapiente eius accusantium aperiam quidem! Voluptatem iste deleniti, autem earum fugit nemo quos. Cumque, necessitatibus sit ea amet placeat harum. Nemo labore temporibus illo!
Reiciendis veritatis ab nihil maiores sapiente ex molestiae, facilis assumenda cupiditate voluptatem autem recusandae, ipsum voluptates, minus mollitia. Fugiat velit quae vel nobis et fugit tempora autem dolorum perferendis aperiam?
Maxime velit nihil tempora eum cupiditate magnam, laborum voluptas facere iure aliquam voluptates sit aspernatur provident ipsa modi! Totam quia laboriosam neque culpa dignissimos cum nesciunt temporibus! Fugiat, optio labore!
Sequi labore saepe suscipit ullam, blanditiis neque hic et qui corporis assumenda illum sed ipsam porro eligendi nulla accusamus optio deleniti aspernatur, dolores excepturi rem! Rerum, quia iste! Dolores, ab?
Doloribus voluptatum delectus numquam itaque aliquid dignissimos non repellendus ad maiores, blanditiis debitis cupiditate omnis, repudiandae provident quidem recusandae rem dicta reiciendis ipsam. Eius, itaque omnis mollitia debitis vel similique!
Quaerat temporibus recusandae dolores nesciunt sint rem quae, blanditiis provident. Labore suscipit consequatur sapiente iste impedit temporibus, pariatur, fuga asperiores nam sit praesentium necessitatibus itaque aut quam placeat, quos vero?
Asperiores exercitationem veritatis illum consectetur laudantium, alias reiciendis at odio hic, eligendi veniam nostrum, dignissimos qui fugiat? Dicta aliquid hic impedit nobis, quae fugiat eum blanditiis aut, eligendi voluptatibus obcaecati?
Fuga nobis, optio reiciendis accusamus et autem commodi debitis earum? Totam et dolores sint sequi cupiditate rem a quaerat dolorem rerum obcaecati doloribus temporibus, alias quasi porro placeat voluptatum explicabo.
Fugiat exercitationem eius quod! Nesciunt fugit at voluptatum eveniet ipsum similique laboriosam, nobis aliquid rerum ipsa. Nam dolor accusantium ullam porro illum, eius perspiciatis! Qui aliquid quod corrupti! Est, expedita?
Praesentium, atque iure. 
`
let loremAside = `Notice how I overflow past the end of the viewport together with content and other side panels. Notice how I overflow past the end of the viewport together with content and other side panels.Notice how I overflow past the end of the viewport together with content and other side panels.Notice how I overflow past the end of the viewport together with content and other side panels.Notice how I overflow past the end of the viewport together with content and other side panels.Notice how I overflow past the end of the viewport together with content and other side panels.Notice how I overflow past the end of the viewport together with content and other side panels.Notice how I overflow past the end of the viewport together with content and other side panels.Notice how I overflow past the end of the viewport together with content and other side panels.Notice how I overflow past the end of the viewport together with content and other side panels.Notice how I overflow past the end of the viewport together with content and other side panels.Notice how I overflow past the end of the viewport together with content and other side panels. `
