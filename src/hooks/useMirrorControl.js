import { useCallback, useEffect, useState } from 'react'
import {
  fetchMirrorState,
  updateMirrorState,
} from '../services/mirrorApi'
import {
  clearPairingCode,
  loadPairingCode,
  savePairingCode,
} from '../services/pairingStorage'

const POLL_INTERVAL_MS = 2000

function createCalendarEvent(title, time) {
  return {
    id: crypto.randomUUID(),
    title: title.trim(),
    time: time.trim(),
  }
}

export function useMirrorControl() {
  const [pairingCode, setPairingCode] = useState(loadPairingCode)
  const [makeupMode, setMakeupModeState] = useState(false)
  const [calendarEvents, setCalendarEvents] = useState([])
  const [connected, setConnected] = useState(false)
  const [error, setError] = useState('')

  const refreshState = useCallback(async (code = pairingCode) => {
    if (!code) return null

    const state = await fetchMirrorState()
    setMakeupModeState(state.makeupMode)
    setCalendarEvents(state.calendarEvents)
    setConnected(true)
    setError('')
    return state
  }, [pairingCode])

  useEffect(() => {
    if (!pairingCode) return undefined

    let active = true

    async function poll() {
      try {
        await refreshState()
      } catch {
        if (active) {
          setConnected(false)
          setError('Lost connection to mirror')
        }
      }
    }

    poll()
    const id = setInterval(poll, POLL_INTERVAL_MS)

    return () => {
      active = false
      clearInterval(id)
    }
  }, [pairingCode, refreshState])

  async function connect(code) {
    const trimmed = code.trim()
    if (!trimmed) return false

    try {
      await updateMirrorState({}, trimmed)
      savePairingCode(trimmed)
      setPairingCode(trimmed)
      await refreshState(trimmed)
      return true
    } catch {
      setError('Invalid pairing code')
      setConnected(false)
      return false
    }
  }

  function disconnect() {
    clearPairingCode()
    setPairingCode('')
    setConnected(false)
    setError('')
  }

  async function patchState(partial) {
    if (!pairingCode) return

    const state = await updateMirrorState(partial, pairingCode)
    setMakeupModeState(state.makeupMode)
    setCalendarEvents(state.calendarEvents)
    setConnected(true)
    setError('')
  }

  async function setMakeupMode(enabled) {
    await patchState({ makeupMode: enabled })
  }

  async function addCalendarEvent(title, time = '') {
    const trimmed = title.trim()
    if (!trimmed) return false

    const next = [...calendarEvents, createCalendarEvent(trimmed, time)]
    await patchState({ calendarEvents: next })
    return true
  }

  async function deleteCalendarEvent(id) {
    const next = calendarEvents.filter((event) => event.id !== id)
    await patchState({ calendarEvents: next })
  }

  return {
    pairingCode,
    makeupMode,
    calendarEvents,
    connected,
    error,
    connect,
    disconnect,
    setMakeupMode,
    addCalendarEvent,
    deleteCalendarEvent,
  }
}
