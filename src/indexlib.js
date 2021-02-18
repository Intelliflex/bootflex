import React from 'react'
//import styles from './library/flex.scss'
import Bootflex, { useFlexContext, useFlex } from './library/Context'
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
} from './library/Flex'

import { useValue, useRecord } from './library/Hooks'
import Layout, {
  getScreenWidth,
  getScreenSize,
  getSizeInt,
  getResponsiveBreakWidth,
  getNextBreak,
  isResponsiveBreakGE,
  isResponsiveBreakLE,
} from './library/Layout'
import FlexCard from './library/FlexCard'
import FlexTable, { Pagination, PaginationBtn } from './library/FlexTable'
import Form, { useForm, useNest, useFormContext, Input, Button } from './library/Form'

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
}
