import React from 'react'
import './flex.scss'
import Bootflex, { useFlexContext, useFlex } from './Context.jsx'
import Flex, {
  Row,
  Col,
  Span,
  Heading,
  Lead,
  Info,
  Spacer,
  Post,
  Code,
  Frame,
  NotFound,
  B,
  H,
  P,
  getPropsTable,
  Tester,
} from './Flex.jsx'

import { useValue, useRecord } from './Hooks.jsx'
import Layout, {
  getScreenWidth,
  getScreenSize,
  getSizeInt,
  getResponsiveBreakWidth,
  getNextBreak,
  isResponsiveBreakGE,
  isResponsiveBreakLE,
} from './Layout.jsx'
import FlexCard from './FlexCard.jsx'
import FlexTable, { Pagination, PaginationBtn } from './FlexTable.jsx'
import Form, { useForm, useNest, useFormContext, Input, Button } from './Form.jsx'

export const ExampleComponent = ({ text }) => {
  return <div>EEExample Component: {text}</div>
}

export default Bootflex
export {
  Flex,
  FlexCard,
  useFlexContext,
  useFlex,
  useValue,
  useRecord,
  useForm,
  useNest,
  useFormContext,
  Layout,
  Row,
  Col,
  Span,
  getScreenWidth,
  getScreenSize,
  getSizeInt,
  getNextBreak,
  getResponsiveBreakWidth,
  isResponsiveBreakGE,
  isResponsiveBreakLE,
  Form,
  Input,
  Button,
  Heading,
  Lead,
  Info,
  Spacer,
  Post,
  Code,
  Frame,
  NotFound,
  B,
  H,
  P,
  getPropsTable,
  FlexTable,
  Pagination,
  PaginationBtn,
  Tester,
}
