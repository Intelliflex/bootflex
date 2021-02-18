import React from 'react'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import './App.css'
import 'bootflex/flex.scss'
import Main from './Main'
import Home from './Home'
import GetStarted from './GetStarted'
import FLEX from 'bootflex'
import Intro from './demos/UI/Intro'
import Layouts from './demos/UI/Layouts'
import Buttons from './demos/UI/Buttons'
import Minimal from './demos/UI/Minimal'
import Context from './demos/Context/ContextMain'
import Hooks from './demos/Misc/Hooks'
import FormIntro from './demos/forms/Intro'
import FormAdvanced from './demos/forms/Advanced'
import Rdt from './demos/Misc/Rdt'
import RdtFullHeight from './demos/Misc/RdtFullHeight'
import CardDemo from './demos/Misc/CardDemo'
import PaginationTester from './demos/Misc/Pagination'
import ReactSelect from './demos/Misc/ReactSelect'
import CSS from './demos/Misc/CSS'

function App() {
  return (
    <FLEX>
      <Router>
        <Main>
          <Switch>
            <Route path='/' component={Home} exact />
            <Route path='/getstarted' component={GetStarted} />
            <Route path='/intro' component={Intro} />
            <Route path='/layouts' component={Layouts} />
            <Route path='/minimal' component={Minimal} />
            <Route path='/buttons' component={Buttons} />
            <Route path='/context' component={Context} />
            <Route path='/hooks' component={Hooks} />
            <Route path='/formintro' component={FormIntro} />
            <Route path='/formadvanced' component={FormAdvanced} />
            <Route path='/rdt' component={Rdt} />
            <Route path='/rdtfull' component={RdtFullHeight} />
            <Route path='/card' component={CardDemo} />
            <Route path='/pagination' component={PaginationTester} />
            <Route path='/select' component={ReactSelect} />
            <Route path='/css' component={CSS} />
          </Switch>
        </Main>
      </Router>
    </FLEX>
  )
}

export default App
