interface TodoCounterProps {
  remaining: number
  total: number
}

export function TodoCounter({ remaining, total }: TodoCounterProps) {
  if (total === 0) return null

  return (
    <p className="counter">
      Залишилось: {remaining} із {total}
    </p>
  )
}
