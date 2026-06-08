import { mkdirSync, readFileSync, writeFileSync, existsSync } from 'fs'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'
import { randomInt } from 'crypto'

const __dirname = dirname(fileURLToPath(import.meta.url))
const DATA_DIR = join(__dirname, 'data')
const STATE_FILE = join(DATA_DIR, 'state.json')

function generatePairingCode() {
  return String(randomInt(100000, 999999))
}

function defaultState() {
  return {
    makeupMode: false,
    calendarEvents: [],
    pairingCode: generatePairingCode(),
  }
}

function loadState() {
  if (!existsSync(STATE_FILE)) {
    return defaultState()
  }

  try {
    const parsed = JSON.parse(readFileSync(STATE_FILE, 'utf8'))
    return {
      makeupMode: Boolean(parsed.makeupMode),
      calendarEvents: Array.isArray(parsed.calendarEvents)
        ? parsed.calendarEvents
        : [],
      pairingCode:
        typeof parsed.pairingCode === 'string'
          ? parsed.pairingCode
          : generatePairingCode(),
    }
  } catch {
    return defaultState()
  }
}

let state = loadState()

function saveState() {
  mkdirSync(DATA_DIR, { recursive: true })
  writeFileSync(STATE_FILE, JSON.stringify(state, null, 2))
}

export function getPublicState() {
  return {
    makeupMode: state.makeupMode,
    calendarEvents: state.calendarEvents,
  }
}

export function getPairingCode() {
  return state.pairingCode
}

export function verifyPairingCode(code) {
  return code === state.pairingCode
}

export function updateState(partial) {
  if ('makeupMode' in partial) {
    state.makeupMode = Boolean(partial.makeupMode)
  }

  if ('calendarEvents' in partial && Array.isArray(partial.calendarEvents)) {
    state.calendarEvents = partial.calendarEvents.filter(
      (event) =>
        event &&
        typeof event.id === 'string' &&
        typeof event.title === 'string',
    )
  }

  saveState()
  return getPublicState()
}
