
import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import BlogForm from './BlogForm'



test('renders content', () => {
  const blog = {
    title: 'title that should be visible',
    author: 'blogimies',
    url: 'www.imnotvisible.com',
    likes: 2,
    user: {
      name: 'antti'
    }
  }

  render(<Blog blog={blog} />)

  const element = screen.getByText('title that should be visible', { exact: false })
  expect(element).toBeDefined()
  expect(element).not.toHaveTextContent('www.imnotvisible.com')
})

test('details are shown after button click', async () => {
  const blog = {
    title: 'title that should be visible',
    author: 'blogimies',
    url: 'www.imnotvisible.com',
    likes: 2,
    user: {
      name: 'antti'
    }
  }
  const mockHandler = jest.fn()
  render(<Blog blog={blog} handleLikechange={mockHandler}/>)
  const user = userEvent.setup()

  const element = screen.getByText('title that should be visible', { exact: false })
  const button = screen.getByText('show')
  await user.click(button)
  expect(element).toBeDefined()
  expect(element).toHaveTextContent('www.imnotvisible.com')
})

test('eventHandler is called twice after two like-clicks', async () => {
  const blog = {
    title: 'title that should be visible',
    author: 'blogimies',
    url: 'www.imnotvisible.com',
    likes: 2,
    user: {
      name: 'antti'
    }
  }
  const mockHandler = jest.fn()
  render(<Blog blog={blog} handleLikechange={mockHandler}/>)

  const showButton = screen.getByText('show')

  fireEvent.click(showButton)
  const likeButton = screen.getByText('like')
  fireEvent.click(likeButton)
  fireEvent.click(likeButton)
  expect(mockHandler.mock.calls).toHaveLength(2)
})

test('<BlogForm /> call is made with right props', async () => {
  const user = userEvent.setup()
  const createBlog = jest.fn()

  render(<BlogForm createBlog={createBlog} />)

  const titleField = screen.getByPlaceholderText('write title', { exact : false })
  const authorField = screen.getByPlaceholderText('write author', { exact : false })
  const urlField = screen.getByPlaceholderText('write url', { exact : false })
  console.log(titleField)
  const sendButton = screen.getByText('create')

  await user.type(titleField, 'testiotsikko')
  await user.type(authorField, 'testiauthor')
  await user.type(urlField, 'testiurl')
  await user.click(sendButton)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('testiotsikko')
  expect(createBlog.mock.calls[0][0].author).toBe('testiauthor')
  expect(createBlog.mock.calls[0][0].url).toBe('testiurl')
})