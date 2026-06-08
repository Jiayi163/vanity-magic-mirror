import '../styles/dev.css'

export default function DevPanel({ mirror }) {
  const {
    isMakeupMode,
    connected,
    pairingCode,
    toggleMakeupMode,
    exitMakeupMode,
  } = mirror

  return (
    <aside className="dev-panel" aria-label="Developer controls">
      <span className="dev-panel__status">
        Sync: {connected ? 'connected' : 'offline'}
      </span>
      {pairingCode && (
        <span className="dev-panel__code">Pairing code: {pairingCode}</span>
      )}
      <button
        className="dev-panel__mode-btn"
        type="button"
        onClick={toggleMakeupMode}
      >
        Makeup Mode: {isMakeupMode ? 'ON' : 'OFF'}
      </button>
      {isMakeupMode && (
        <button
          className="dev-panel__mode-btn dev-panel__mode-btn--secondary"
          type="button"
          onClick={exitMakeupMode}
        >
          Return to Dashboard
        </button>
      )}
    </aside>
  )
}
