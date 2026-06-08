import { useClock } from '../hooks/useClock'

export default function Clock({ hidden = false }) {
  const { time, date } = useClock()

  if (hidden) return null

  return (
    <div className="clock">
      <div className="clock__time">{time}</div>
      <div className="clock__date">{date}</div>
    </div>
  )
}
