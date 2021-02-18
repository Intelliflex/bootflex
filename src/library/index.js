import React from 'react'
import './flex.scss'
import Bootflex, { useFlexContext, useFlex } from './Context'
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
} from './Flex'

import { useValue, useRecord } from './Hooks'
import Layout, {
  getScreenWidth,
  getScreenSize,
  getSizeInt,
  getResponsiveBreakWidth,
  getNextBreak,
  isResponsiveBreakGE,
  isResponsiveBreakLE,
} from './Layout'
import FlexCard from './FlexCard'
import FlexTable, { Pagination, PaginationBtn } from './FlexTable'
import Form, { useForm, useNest, useFormContext, Input, Button } from './Form'

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
