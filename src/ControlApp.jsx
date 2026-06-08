import { useState } from 'react'
import { useMirrorControl } from './hooks/useMirrorControl'
import './styles/control.css'

export default function ControlApp() {
  const control = useMirrorControl()
  const [codeInput, setCodeInput] = useState('')
  const [eventTitle, setEventTitle] = useState('')
  const [eventTime, setEventTime] = useState('')

  async function handleConnect(event) {
    event.preventDefault()
    const ok = await control.connect(codeInput)
    if (ok) setCodeInput('')
  }

  async function handleAddEvent(event) {
    event.preventDefault()
    const ok = await control.addCalendarEvent(eventTitle, eventTime)
    if (ok) {
      setEventTitle('')
      setEventTime('')
    }
  }

  if (!control.pairingCode) {
    return (
      <main className="control-app">
        <section className="control-card">
          <h1 className="control-title">Connect to Mirror</h1>
          <p className="control-text">
            Enter the 6-digit pairing code shown on the mirror dev panel.
          </p>
          <form className="control-form" onSubmit={handleConnect}>
            <input
              className="control-input"
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={6}
              value={codeInput}
              onChange={(event) => setCodeInput(event.target.value)}
              placeholder="Pairing code"
              aria-label="Pairing code"
            />
            <button className="control-button" type="submit">
              Connect
            </button>
          </form>
          {control.error && <p className="control-error">{control.error}</p>}
        </section>
      </main>
    )
  }

  return (
    <main className="control-app">
      <header className="control-header">
        <div>
          <h1 className="control-title">Mirror Control</h1>
          <p className="control-status">
            {control.connected ? 'Connected' : 'Reconnecting...'}
          </p>
        </div>
        <button
          className="control-link"
          type="button"
          onClick={control.disconnect}
        >
          Disconnect
        </button>
      </header>

      {control.error && <p className="control-error">{control.error}</p>}

      <section className="control-card">
        <h2 className="control-section-title">Makeup Mode</h2>
        <button
          className="control-button control-button--wide"
          type="button"
          onClick={() => control.setMakeupMode(!control.makeupMode)}
        >
          {control.makeupMode ? 'Turn Off Makeup Mode' : 'Turn On Makeup Mode'}
        </button>
      </section>

      <section className="control-card">
        <h2 className="control-section-title">Calendar</h2>

        <form className="control-form control-form--stacked" onSubmit={handleAddEvent}>
          <input
            className="control-input"
            type="text"
            value={eventTitle}
            onChange={(event) => setEventTitle(event.target.value)}
            placeholder="Event title"
            aria-label="Event title"
          />
          <input
            className="control-input"
            type="text"
            value={eventTime}
            onChange={(event) => setEventTime(event.target.value)}
            placeholder="Time (optional)"
            aria-label="Event time"
          />
          <button className="control-button" type="submit">
            Add Event
          </button>
        </form>

        {control.calendarEvents.length === 0 ? (
          <p className="control-text">No events today</p>
        ) : (
          <ul className="control-list">
            {control.calendarEvents.map((event) => (
              <li key={event.id} className="control-list__item">
                <div>
                  <p className="control-list__title">{event.title}</p>
                  {event.time && (
                    <p className="control-list__meta">{event.time}</p>
                  )}
                </div>
                <button
                  className="control-link"
                  type="button"
                  onClick={() => control.deleteCalendarEvent(event.id)}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  )
}
