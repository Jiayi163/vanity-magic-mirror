const PAIRING_STORAGE_KEY = 'vanity-mirror-pairing-code'

export function loadPairingCode() {
  try {
    return sessionStorage.getItem(PAIRING_STORAGE_KEY) ?? ''
  } catch {
    return ''
  }
}

export function savePairingCode(code) {
  try {
    sessionStorage.setItem(PAIRING_STORAGE_KEY, code)
  } catch {
    // ignore storage errors
  }
}

export function clearPairingCode() {
  try {
    sessionStorage.removeItem(PAIRING_STORAGE_KEY)
  } catch {
    // ignore storage errors
  }
}
