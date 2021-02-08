import '@testing-library/jest-dom/extend-expect'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Modal from 'components/Modal'

test('Renders without crashing', () => {
  const props = {
    onModalClose: jest.fn(),
    title: 'Modal test',
    header: () => {return (<h2>Header block</h2>)},
    body: () => {return (<h3>Body block</h3>)}
  }

  render(<Modal title={props.title} header={props.header()} body={props.body()}></Modal>)
  expect(screen.getByText('Header block')).toBeInTheDocument()
  expect(screen.getByText('Body block')).toBeInTheDocument()
  expect(screen.getByText('Modal test')).toBeInTheDocument()
})

test('Handle close click', () => {
  const props = {
    onModalClose: jest.fn(),
    title: 'Modal test',
    header: () => {return (<h2>Header block</h2>)},
    body: () => {return (<h3>Body block</h3>)}
  }

  render(<Modal title={props.title} header={props.header()} body={props.body()} onModalClose={props.onModalClose}></Modal>)
  userEvent.click(screen.getByRole('button', {name: /close/i}))
  expect(props.onModalClose).toHaveBeenCalledTimes(1)
})
