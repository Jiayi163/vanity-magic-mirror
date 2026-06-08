export default function CalendarWidget({ events = [] }) {
  return (
    <section className="calendar-widget">
      <h2 className="mirror-widget__title">Calendar</h2>
      <ul className="calendar-widget__events">
        {events.length === 0 ? (
          <li className="calendar-widget__event calendar-widget__event--empty">
            No events today
          </li>
        ) : (
          events.map((event) => (
            <li key={event.id} className="calendar-widget__event">
              <span className="calendar-widget__event-title">{event.title}</span>
              {event.time && (
                <span className="calendar-widget__event-time">{event.time}</span>
              )}
            </li>
          ))
        )}
      </ul>
    </section>
  )
}
