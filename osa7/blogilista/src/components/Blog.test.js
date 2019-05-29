import React from 'react'
import 'jest-dom/extend-expect'
import { render, cleanup, fireEvent } from 'react-testing-library'
import Blog from './Blog'

afterEach(cleanup)

describe('blog shows only name and author until clicked', () => {
  let component

  const user = {
    username: 'janne',
    name: 'Janne Jonkeli',
    id: '5ce7b112cc98b1612a04288b'
  }

  window.localStorage.setItem(
    'loggedUser', JSON.stringify(user)
  )

  const blogObject = {
    id: 100,
    user: user,
    likes: 2,
    author: 'GRRM',
    title: 'Not a Blog',
    url: 'localhost'
  }

  beforeEach(() => {
    component = render(
      <Blog blog={blogObject} />
    )
  })

  it('at start details are not displayed', () => {
    const div = component.container.querySelector('.allDetails')
    expect(div).toHaveStyle('display: none')
  })

  it('after click details are displayer', () => {
    const button = component.getByText(blogObject.title)
    fireEvent.click(button)

    const div = component.container.querySelector('.allDetails')
    expect(div).not.toHaveStyle('display: none')
  })

})