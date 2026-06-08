import { useCallback, useEffect, useRef, useState } from 'react'
import {
  fetchMirrorState,
  fetchPairingCode,
  updateMirrorState,
} from '../services/mirrorApi'

const POLL_INTERVAL_MS = 2000

export function useMirrorSync() {
  const [makeupMode, setMakeupModeState] = useState(false)
  const [calendarEvents, setCalendarEvents] = useState([])
  const [connected, setConnected] = useState(false)
  const [pairingCode, setPairingCode] = useState(null)
  const pairingCodeRef = useRef(null)

  useEffect(() => {
    pairingCodeRef.current = pairingCode
  }, [pairingCode])

  const refreshState = useCallback(async () => {
    const state = await fetchMirrorState()
    setMakeupModeState(state.makeupMode)
    setCalendarEvents(state.calendarEvents)
    setConnected(true)
    return state
  }, [])

  useEffect(() => {
    let active = true

    async function poll() {
      try {
        await refreshState()
      } catch {
        if (active) setConnected(false)
      }
    }

    async function loadPairing() {
      try {
        const { code } = await fetchPairingCode()
        if (active) setPairingCode(code)
      } catch {
        if (active) setPairingCode(null)
      }
    }

    poll()
    loadPairing()
    const id = setInterval(poll, POLL_INTERVAL_MS)

    return () => {
      active = false
      clearInterval(id)
    }
  }, [refreshState])

  const setMakeupMode = useCallback(async (enabled) => {
    const code = pairingCodeRef.current
    if (!code) return

    const state = await updateMirrorState({ makeupMode: enabled }, code)
    setMakeupModeState(state.makeupMode)
    setCalendarEvents(state.calendarEvents)
    setConnected(true)
  }, [])

  const toggleMakeupMode = useCallback(async () => {
    const code = pairingCodeRef.current
    if (!code) return

    const current = await fetchMirrorState()
    const state = await updateMirrorState(
      { makeupMode: !current.makeupMode },
      code,
    )
    setMakeupModeState(state.makeupMode)
    setCalendarEvents(state.calendarEvents)
    setConnected(true)
  }, [])

  const exitMakeupMode = useCallback(async () => {
    await setMakeupMode(false)
  }, [setMakeupMode])

  return {
    isMakeupMode: makeupMode,
    calendarEvents,
    connected,
    pairingCode,
    setMakeupMode,
    toggleMakeupMode,
    exitMakeupMode,
  }
}
