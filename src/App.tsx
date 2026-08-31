import { useState } from 'react'
import type { Todo } from './types'
import { TodoForm } from './components/TodoForm'
import { TodoList } from './components/TodoList'
import { TodoCounter } from './components/TodoCounter'
import './App.css'

function App() {
  const [todos, setTodos] = useState<Todo[]>([])

  const addTodo = (text: string) => {
    setTodos([...todos, { id: Date.now(), text, done: false }])
  }

  const toggleTodo = (id: number) => {
    setTodos(todos.map((t) => (t.id === id ? { ...t, done: !t.done } : t)))
  }

  const removeTodo = (id: number) => {
    setTodos(todos.filter((t) => t.id !== id))
  }

  const remaining = todos.filter((t) => !t.done).length

  return (
    <div className="app">
      <h1>Todo List</h1>
      <TodoForm onAdd={addTodo} />
      <TodoList todos={todos} onToggle={toggleTodo} onRemove={removeTodo} />
      {todos.length > 0 && <TodoCounter remaining={remaining} total={todos.length} />}
    </div>
  )
}

export default App
