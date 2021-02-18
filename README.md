# bootflex

[![Build status](https://badge.buildkite.com/90ff98db996bb137c5be1bdce666c4b1ce68a25b17af0a6a04.svg?branch=master)](https://buildkite.com/harvey/react-component-library) [![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)

## **`What is it?`**

**bootflex** is a responsive user interface , forms and tables library for use with modern react applications.

## **`User Interface & Layout`**

The user interface provides what is sometimes referred to as the Holygrail layout, with a header (usually containg a Navigation bar), footer (that is fixed to bottom of your viewport), side panels with fluid and responsive content containers that scroll between the header and the footer. Bootflex provides for full height scrolling content and side panels that stretch to your content or contrained layouts that scroll between the header and footer. This web-site is an example using **bootflex**. You are not required to have a header and footer, indeed Bootflex may simply be used standalone for its context wrapper or form control functionality. You can elect to utilise Bootflex's other extensions as required.

## **`Form Control`**

With Bootflex you may define a schema for your form and then use Input components that require only a name prop. Each input component has responsive breaks that can be used without the need to wrap inside Col components. Your form layout code is greately reduced in size and complexity. CRUD Operations using nested row based data is made extremely simple. Great care has been taken to ensure that re-renders are kept to a bare minimum, making your application blazingly fast

## **`Application Wide Context`**

When developing in React a constant challenge is making components interact or share data with related siblings, parents, children or unrelated components. This may be acheived with prop drilling, redux or with the context API. While the context API is great, it is often difficult or time consuming to setup reducers, dispatchers and providers. Issues often arise altering context changes within react effects or with excessive component re-rendering, especially when using a single context for both state and dispatch. Using the most recent recommendations from React guru Kent C Dodds, Bootflex splits contexts between the Bootflex application state, the dispatch logic and user state (provided for you to use). Immer is used internally for immutable state management and reducer functions. Bootflex provides a context wrapper for your entire application that allows ad-hoc context to be created which is easily shared between unrelated or distant component. Access to context is provided through a single useFlexContext() hook which exposes the triplet values of state, dispatch functions and internal Bootflex state.

## **`Data Tables and CRUD`**

Bootflex extends the fabulous **react-data-table-component** library extending it to provide context pagination and form entry / modification for CRUD (create/read/update/delete) operations. Pagination is supported in thre context of the user interface allowing pagination controls to be placed in the header or footer of your application.

## **`Card Controls`**

Bootflex has cascading style cards that are designed to interractly perfectly within the user interface layout.

## **`Improved React-Select`**

Bootflex provides an extension to the popular react-select component, providing the missing required option, with bootsrap styled feedback

## **`Get Started`**

Explore the Bootflex Homepage at https://intelliflex.github.io/bootflex to see documentation and usage examples.

To download and start using in your own application

```
yarn add bootflex

or

npm install bootflex
```
# bootflex
# bootflex
