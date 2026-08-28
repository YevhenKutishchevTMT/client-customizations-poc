import { useState } from 'react'

interface TodoFormProps {
  onAdd: (text: string) => void
}

export function TodoForm({ onAdd }: TodoFormProps) {
  const [text, setText] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const trimmed = text.trim()
    if (!trimmed) return
    onAdd(trimmed)
    setText('')
  }

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Що потрібно зробити?"
      />
      <button type="submit">Додати</button>
    </form>
  )
}
