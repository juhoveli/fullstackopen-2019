import React from 'react'
import { render, waitForElement } from 'react-testing-library'
import App from './App'
jest.mock('./services/blogs')


describe('<App />', () => {
  it('if no user logged, notes are not rendered', async () => {
    const component = render(
      <App />
    )
    component.rerender(<App />)

    await waitForElement(
      () => component.container.querySelectorAll('.loggedIn')
    )

    const blogs = component.container.querySelectorAll('.blog')
    expect(blogs.length).toBe(0)
  })
  it('if user is logged, notes are rendered', async () => {

    const user = {
      username: 'tester',
      token: '1231231214',
      name: 'Teuvo Testaaja'
    }

    localStorage.setItem('loggedUser', JSON.stringify(user))

    const component = render(
      <App />
    )
    component.rerender(<App />)

    await waitForElement(
      () => component.container.querySelectorAll('.loggedIn')
    )

    const blogs = component.container.querySelectorAll('.blog')
    expect(blogs.length).toBe(5)
  })
})