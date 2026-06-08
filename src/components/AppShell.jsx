import '../styles/app.css'
import '../styles/makeup-mode.css'

export default function AppShell({ children, makeupMode = false }) {
  return (
    <main
      className={`app-shell${makeupMode ? ' app-shell--makeup' : ''}`}
    >
      {makeupMode && (
        <div className="app-shell__frame-light" aria-hidden="true" />
      )}
      {children}
    </main>
  )
}
