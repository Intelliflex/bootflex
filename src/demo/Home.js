import React from 'react'
import { Container, Jumbotron } from 'react-bootstrap'
import { useFlexContext, Lead, Info, B, H } from 'bootflex'

const Home = (props) => {
  // eslint-disable-next-line
  const [state, flex, _state] = useFlexContext()
  return (
    <Container fluid className='bg-white p-3'>
      <Jumbotron>
        <Container>
          <h1>Bootflex</h1>
          <Lead>
            Responsive User Interface & Layouts, Super Easy Forms and Simplified
            State Management.
          </Lead>
          <Lead>Version 1.0</Lead>
        </Container>
      </Jumbotron>
      <Container>
        <Info justify>
          <H x4>Overview</H>
          Bootflex provides a user interface shell for your application, easy to
          use Context for global state management and higher order form controls
          to greatly simplify form development and performance. Bootflex
          utililises performant state of the art libraries, including
          <B primary>
            react-boostrap, react-hook-form, immer, react-data-table-component,
            react-select and react-datepicker
          </B>
          . You may use all features of Bootflex or simply pick the ones you
          need. For instance Form Control does not depend on user interface or
          Context.
        </Info>
        <Info justify>
          <H x4>Layout</H>
          The user interface provides what is sometimes referred to as the
          Holygrail layout, with a header (usually containg a Navigation bar),
          footer (that is fixed to bottom of your viewport), side panels with
          fluid and responsive content containers that scroll between the header
          and the footer. Bootflex provides for full height scrolling content
          and side panels that strecth to your content or contrained layouts
          that scroll between the header and footer. This web-site is an example
          using flex. You are not required to have a header and footer, indeed
          Bootflex may simply be used standalone for its context wrapper or form
          control functioknality. You can elect to utilise Bootflex's other
          extensions as required.
        </Info>
        <Info justify>
          <H x4>Form Control</H>
          With Bootflex you may define a schema for your form and then use Input
          components that require only a name prop. Each input component has
          responsive breaks that can be used without the need to wrap inside Col
          components. Your form layout code is greately reduced in size and
          complexity. CRUD Operations using nested row based data is made
          extremely simple. Great care has been taken to ensure that re-renders
          are kept to a bare minimum, making your application{' '}
          <B x1 danger>
            blazingly fast
          </B>
          .
        </Info>

        <Info justify>
          <H x4>Context - Component data sharing (State Management)</H>When
          developing in React a constant challenge is making components interact
          or share data with related siblings, parents, children or unrelated
          components. This may be acheived with prop drilling, redux or with the
          context API. While the context API is great, it is often difficult or
          time consuming to setup reducers, dispatchers and providers. Issues
          often arise altering context changes within react effects or with
          excessive component re-rendering, especially when using a single
          context for both state and dispatch. Using the most recent
          recommendations from React guru Kent C Dodds, Bootflex splits contexts
          between the Bootflex application state, the dispatch logic and user
          state (provided for you to use). Immer is used internally for
          immutable state management and reducer functions. Bootflex provides a
          context wrapper for your entire application that allows ad-hoc context
          to be created which is easily shared between unrelated or distant
          component. Access to context is provided through a single
          useFlexContext() hook which exposes the triplet values of state,
          dispatch functions and internal Bootflex state.
        </Info>

        <Info justify>
          Use the top navigation bar to explore the main features. Be sure to
          try this out on various mobile devices in both landscape and portrait
          modes or simulate mobile modes and various screen sizes using your
          browsers developer tools. The sidebar at the left acts to demomstrate
          the persistent sidebar facilities provided by the layout control but
          also provides some handy logging (console log) information.
        </Info>
        <Info justify>
          The documentation is still in development so please be patient as this
          roles out to provide more comprehensive information as well as code
          sandbox examples. Collaborators are welcome!
        </Info>
        <Info>
          Cheers Mike Thomson (chief arhitect) <br />
          Intelliflex Software
        </Info>
      </Container>
    </Container>
  )
}
export default Home
