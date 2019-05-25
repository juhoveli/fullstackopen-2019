// Tee testi, joka varmistaa,
// että komponentti renderöi blogin titlen, authorin ja likejen määrän.

// Lisää komponenttiin tarvittaessa testausta helpottavia CSS-luokkia.

import React from 'react'
import 'jest-dom/extend-expect'
import { render, cleanup } from 'react-testing-library'
import SimpleBlog from './SimpleBlog'

afterEach(cleanup)

test('SimpleBlog renders content', () => {
  const blog = {
    title: 'Not a Blog',
    author: 'George R.R. Martin',
    likes: 99
  }

  const component = render(
    <SimpleBlog blog={blog} />
  )

  expect(component.container).toHaveTextContent(
    'Not a Blog'
  )

  expect(component.container).toHaveTextContent(
    'George R.R. Martin'
  )

  expect(component.container).toHaveTextContent(
    '99'
  )
})