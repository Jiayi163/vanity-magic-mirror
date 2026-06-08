import { useMirrorSync } from './hooks/useMirrorSync'
import AppShell from './components/AppShell'
import Dashboard from './components/Dashboard'

export default function MirrorApp() {
  const mirror = useMirrorSync()

  return (
    <AppShell makeupMode={mirror.isMakeupMode}>
      <Dashboard mirror={mirror} />
    </AppShell>
  )
}
