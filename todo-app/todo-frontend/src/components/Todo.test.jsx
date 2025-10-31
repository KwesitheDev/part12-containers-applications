import { render, screen } from '@testing-library/react'
import Todo from './Todos'
import { describe, it, expect } from 'vitest'

describe('Todo component', () => {
  it('renders todo text', () => {
    const todo = { text: 'Learn Docker', done: false }
    render(<Todo todo={todo} />)
    expect(screen.getByText('Learn Docker')).toBeDefined()
  })
})
